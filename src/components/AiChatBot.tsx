import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bot,
  X,
  Send,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useTranslation } from "react-i18next";
import {
  sendMessage as openclawSend,
  getSystemPrompt,
  type OpenClawMessage,
  type OpenClawAction,
} from "@/lib/openclaw";
import { dispatchAction, type ActionResult } from "@/lib/action-dispatcher";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: OpenClawAction[];
  actionResults?: ActionResult[];
  feedback?: "up" | "down" | null;
  createdAt: Date;
}

export function AiChatBot() {
  const { t } = useTranslation("app");
  const user = useAuthStore((s) => s.user);
  const tenant = useAuthStore((s) => s.tenant);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const industryType = (tenant as Record<string, unknown>)?.industry as string ?? "ecommerce";

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Build context from recent messages (last 10)
      const recentMessages = [...messages.slice(-9), userMsg];
      const openclawMessages: OpenClawMessage[] = [
        { role: "system", content: getSystemPrompt(industryType) },
        ...recentMessages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ];

      const response = await openclawSend({
        messages: openclawMessages,
        agentId: (tenant as Record<string, unknown>)?.id
          ? `oaim-${industryType}`
          : undefined,
      });

      // Execute any actions returned by the AI
      let actionResults: ActionResult[] | undefined;
      if (response.actions && response.actions.length > 0 && tenant) {
        const tenantId = (tenant as Record<string, unknown>).id as string;
        actionResults = await Promise.all(
          response.actions.map((a) =>
            dispatchAction(
              { type: a.type as ActionResult["type"], payload: a.payload },
              { tenantId }
            )
          )
        );
      }

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.reply,
        actions: response.actions,
        actionResults,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: t("aiChat.errorResponse"),
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, industryType, tenant, t]);

  const handleFeedback = (msgId: string, type: "up" | "down") => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedback: type } : m))
    );
  };

  const handleRestart = () => {
    setMessages([]);
    setInput("");
  };

  if (!user) return null;

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
        data-testid="button-ai-chat-toggle"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex w-[22rem] flex-col rounded-lg border bg-background shadow-2xl"
          style={{ height: "min(70vh, 600px)" }}
          data-testid="panel-ai-chat"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">{t("aiChat.title")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={handleRestart}
                data-testid="button-ai-restart"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-3 py-3" ref={scrollRef as never}>
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    {t("aiChat.welcome")}
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[85%] space-y-1">
                    <div
                      className={`rounded-md px-3 py-2 text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Action results */}
                    {msg.actionResults &&
                      msg.actionResults.filter((r) => r.type !== "NONE").length > 0 && (
                        <div className="space-y-1">
                          {msg.actionResults
                            .filter((r) => r.type !== "NONE")
                            .map((r, i) => (
                              <Card key={i} className="overflow-visible">
                                <CardContent className="p-2">
                                  <div className="flex items-center gap-2 text-xs">
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${r.success ? "bg-green-500" : "bg-red-500"}`}
                                    />
                                    <span className="font-medium">{r.type}</span>
                                    <span className="text-muted-foreground">{r.message}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      )}

                    {/* Feedback */}
                    {msg.role === "assistant" && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleFeedback(msg.id, "up")}
                          className={`p-0.5 rounded ${msg.feedback === "up" ? "text-green-500" : "text-muted-foreground hover:text-foreground"}`}
                          data-testid={`button-feedback-up-${msg.id}`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.id, "down")}
                          className={`p-0.5 rounded ${msg.feedback === "down" ? "text-red-500" : "text-muted-foreground hover:text-foreground"}`}
                          data-testid={`button-feedback-down-${msg.id}`}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {t("aiChat.thinking")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t px-3 py-2">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                placeholder={t("aiChat.inputPlaceholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                disabled={isLoading}
                className="text-sm"
                data-testid="input-ai-chat"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                data-testid="button-ai-send"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
