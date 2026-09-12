export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function generateOpenAICompletion(options: {
  apiKey: string;
  messages: OpenAIMessage[];
  model?: string;
  response_format?: { type: 'json_object' };
  temperature?: number;
}): Promise<string> {
  const { apiKey, messages, model = 'gpt-4o-mini', response_format, temperature = 0.7 } = options;

  if (!apiKey) {
    throw new Error('OpenAI API anahtarı girilmemiştir.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey.trim()}`,
    },
    body: JSON.stringify({
      model,
      messages,
      response_format,
      temperature,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || `OpenAI Hatası: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI boş yanıt döndürdü.');
  }

  return content;
}
