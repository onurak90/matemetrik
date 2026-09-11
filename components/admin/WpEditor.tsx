'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading2, Heading3, Heading4, List, ListOrdered,
  Quote, Minus, Link as LinkIcon, Image as ImageIcon,
  Undo, Redo, Table as TableIcon, Code, Upload,
  Eye, Check, X
} from 'lucide-react';

interface WpEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function WpEditor({ content, onChange }: WpEditorProps) {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlValue, setHtmlValue] = useState(content);
  const [isUploading, setIsUploading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-600 underline font-medium hover:text-indigo-800',
        },
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: 'rounded-xl shadow-md my-4 max-w-full h-auto mx-auto block',
        },
      }),
      Placeholder.configure({
        placeholder: 'Yazınızı burada oluşturun veya düzenleyin...',
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'min-w-full divide-y divide-gray-200 border border-gray-200 my-4 rounded-lg overflow-hidden',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 font-semibold text-left p-3 text-sm text-gray-700 border border-gray-200',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'p-3 text-sm text-gray-700 border border-gray-200',
        },
      }),
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-indigo max-w-none focus:outline-none min-h-[420px] p-6 text-gray-800',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtmlValue(html);
      onChange(html);
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Yükleme başarısız');
      const data = await res.json();
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
      }
    } catch (err) {
      alert('Görsel yüklenirken bir hata oluştu');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSetLink = () => {
    if (!editor) return;
    if (linkUrl.trim() === '') {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl.trim() }).run();
    }
    setShowLinkModal(false);
    setLinkUrl('');
  };

  const handleInsertImageUrl = () => {
    if (!editor || !imageUrl.trim()) return;
    editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
    setShowImageModal(false);
    setImageUrl('');
  };

  const toggleHtmlMode = () => {
    if (!editor) return;
    if (isHtmlMode) {
      editor.commands.setContent(htmlValue);
      onChange(htmlValue);
      setIsHtmlMode(false);
    } else {
      setHtmlValue(editor.getHTML());
      setIsHtmlMode(true);
    }
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlValue(e.target.value);
    onChange(e.target.value);
  };

  if (!editor) {
    return (
      <div className="border border-gray-200 rounded-xl bg-white p-8 text-center text-gray-400">
        Editör yükleniyor...
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-xl bg-white shadow-sm overflow-hidden focus-within:border-indigo-500 transition-colors">
      {/* WordPress-style Sticky Toolbar */}
      <div className="bg-gray-50/90 border-b border-gray-200 p-2 flex flex-wrap items-center gap-1 sticky top-0 z-20 backdrop-blur-sm">
        {/* History */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent"
          title="Geri Al (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent"
          title="Yinele (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </button>

        <div className="h-5 w-[1px] bg-gray-300 mx-1" />

        {/* Heading formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded flex items-center gap-1 font-semibold text-xs ${
            editor.isActive('heading', { level: 2 }) ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Başlık 2 (H2)"
        >
          <Heading2 className="w-4 h-4" /> H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded flex items-center gap-1 font-semibold text-xs ${
            editor.isActive('heading', { level: 3 }) ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Başlık 3 (H3)"
        >
          <Heading3 className="w-4 h-4" /> H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`p-1.5 rounded flex items-center gap-1 font-semibold text-xs ${
            editor.isActive('heading', { level: 4 }) ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Başlık 4 (H4)"
        >
          <Heading4 className="w-4 h-4" /> H4
        </button>

        <div className="h-5 w-[1px] bg-gray-300 mx-1" />

        {/* Text Styles */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded ${editor.isActive('bold') ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Kalın (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded ${editor.isActive('italic') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200'}`}
          title="İtalik (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded ${editor.isActive('underline') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Altı Çizili (Ctrl+U)"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded ${editor.isActive('strike') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Üstü Çizili"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="h-5 w-[1px] bg-gray-300 mx-1" />

        {/* Lists & Quotes */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded ${editor.isActive('bulletList') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Madde İşaretli Liste"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded ${editor.isActive('orderedList') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Numaralı Liste"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded ${editor.isActive('blockquote') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Alıntı Ekle"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded text-gray-700 hover:bg-gray-200"
          title="Yatay Çizgi Ayırıcı"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="h-5 w-[1px] bg-gray-300 mx-1" />

        {/* Links & Images */}
        <button
          type="button"
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href;
            setLinkUrl(previousUrl || '');
            setShowLinkModal(true);
          }}
          className={`p-1.5 rounded ${editor.isActive('link') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Bağlantı Ekle / Düzenle"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setShowImageModal(true)}
          className="p-1.5 rounded text-gray-700 hover:bg-gray-200"
          title="Görsel URL Ekle"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <label className="p-1.5 rounded text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center" title="Bilgisayardan Görsel Yükle">
          <Upload className={`w-4 h-4 ${isUploading ? 'animate-bounce text-indigo-600' : ''}`} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>

        {/* Table tools */}
        <button
          type="button"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="p-1.5 rounded text-gray-700 hover:bg-gray-200"
          title="Tablo Ekle (3x3)"
        >
          <TableIcon className="w-4 h-4" />
        </button>

        <div className="flex-1" />

        {/* HTML / Visual Toggle */}
        <button
          type="button"
          onClick={toggleHtmlMode}
          className={`px-2.5 py-1 text-xs font-semibold rounded flex items-center gap-1 transition-colors ${
            isHtmlMode ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={isHtmlMode ? 'Görsel Editöre Dön' : 'HTML Kaynak Kodunu Düzenle'}
        >
          <Code className="w-3.5 h-3.5" />
          {isHtmlMode ? 'Görsel Mod' : 'HTML Modu'}
        </button>
      </div>

      {/* Modals for Link / Image */}
      {showLinkModal && (
        <div className="bg-indigo-50 border-b border-indigo-100 p-3 flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-indigo-600" />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://örnek.com"
            className="flex-1 px-3 py-1 text-sm border border-indigo-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleSetLink()}
          />
          <button
            type="button"
            onClick={handleSetLink}
            className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded hover:bg-indigo-700"
          >
            Kaydet
          </button>
          <button
            type="button"
            onClick={() => setShowLinkModal(false)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {showImageModal && (
        <div className="bg-amber-50 border-b border-amber-100 p-3 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-amber-600" />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Görsel URL adresi (https://...)"
            className="flex-1 px-3 py-1 text-sm border border-amber-200 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleInsertImageUrl()}
          />
          <button
            type="button"
            onClick={handleInsertImageUrl}
            className="px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded hover:bg-amber-700"
          >
            Ekle
          </button>
          <button
            type="button"
            onClick={() => setShowImageModal(false)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Editor Content Area */}
      {isHtmlMode ? (
        <textarea
          value={htmlValue}
          onChange={handleHtmlChange}
          rows={18}
          className="w-full p-4 font-mono text-sm text-gray-800 bg-gray-900 text-gray-100 focus:outline-none resize-y"
          placeholder="<p>HTML içeriği buraya yazın...</p>"
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}
