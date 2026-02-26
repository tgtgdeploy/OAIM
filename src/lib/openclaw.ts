const OPENCLAW_API_URL = import.meta.env.VITE_OPENCLAW_API_URL ?? "http://localhost:3100";
const OPENCLAW_API_KEY = import.meta.env.VITE_OPENCLAW_API_KEY ?? "";

export interface OpenClawMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenClawAction {
  type: string;
  payload: Record<string, unknown>;
}

export interface OpenClawResponse {
  reply: string;
  actions?: OpenClawAction[];
  metadata?: Record<string, unknown>;
}

const INDUSTRY_SYSTEM_PROMPTS: Record<string, string> = {
  ecommerce:
    "You are an AI sales assistant for an e-commerce business. Help customers with products, pricing, orders, shipping inquiries and close sales. Always be helpful, recommend products, and guide toward purchase.",
  fnb:
    "You are an AI assistant for a food & beverage business. Help customers with menu items, reservations, delivery orders, and promotions. Be warm and suggest popular dishes.",
  beauty:
    "You are an AI assistant for a beauty & wellness business. Help customers book appointments, recommend services, answer treatment questions, and manage scheduling.",
  service:
    "You are an AI assistant for a service business. Help customers with booking, inquiries, pricing, and scheduling. Be professional and solution-oriented.",
  quant:
    "You are an AI assistant for quantitative trading. Help users analyze portfolios, interpret signals, manage risk, and understand market data.",
};

export function getSystemPrompt(industryType: string, customPrompt?: string | null): string {
  if (customPrompt) return customPrompt;
  return INDUSTRY_SYSTEM_PROMPTS[industryType] ?? INDUSTRY_SYSTEM_PROMPTS.ecommerce;
}

export async function sendMessage(config: {
  messages: OpenClawMessage[];
  agentId?: string;
}): Promise<OpenClawResponse> {
  const { messages, agentId } = config;

  const res = await fetch(`${OPENCLAW_API_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(OPENCLAW_API_KEY ? { Authorization: `Bearer ${OPENCLAW_API_KEY}` } : {}),
    },
    body: JSON.stringify({
      model: agentId ?? "default",
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`OpenClaw API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const choice = data.choices?.[0];

  return {
    reply: choice?.message?.content ?? "Sorry, I could not generate a response.",
    actions: choice?.message?.actions,
    metadata: data.metadata,
  };
}
