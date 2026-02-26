import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Send, Paperclip, Phone, ArrowLeft, Bot } from "lucide-react";
import { useConversations } from "@/hooks/use-conversations";
import { useMessages } from "@/hooks/use-messages";

const stageColors: Record<string, string> = {
  new_inquiry: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  quoted: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  follow_up: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  closed_won: "bg-green-500/10 text-green-700 dark:text-green-300",
};

function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function formatMessageTime(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, "0");
  return `${displayHours}:${displayMinutes} ${ampm}`;
}

export default function InboxPage() {
  const { t } = useTranslation("app");
  const { data: conversations = [], isLoading: convLoading } = useConversations();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [aiMode, setAiMode] = useState(false);

  const selected = conversations.find(c => c.id === selectedId) ?? conversations[0] ?? null;
  const { data: messages = [], isLoading: msgLoading } = useMessages(selected?.id);

  const stageLabels: Record<string, string> = {
    new_inquiry: t("inbox.stageNewInquiry"),
    quoted: t("inbox.stageQuoted"),
    follow_up: t("inbox.stageFollowUp"),
    closed_won: t("inbox.stageClosedWon"),
    closed_lost: t("inbox.stageClosedLost"),
  };

  const filtered = conversations.filter(c =>
    c.contact_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSelectConversation(convId: string) {
    setSelectedId(convId);
    setShowChat(true);
  }

  return (
    <AppLayout>
      <div className="flex h-full">
        <div className={`w-full md:w-80 border-r flex flex-col bg-background ${showChat ? "hidden md:flex" : "flex"}`}>
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("inbox.searchConversations")}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-conversations"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-0.5">
              {convLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-3">
                    <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))
              ) : filtered.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  {searchQuery ? t("inbox.noSearchResults") : t("inbox.noConversations")}
                </div>
              ) : (
                filtered.map((conv) => {
                  const contactName = conv.contact_id.slice(0, 8);
                  const initials = contactName.slice(0, 2).toUpperCase();
                  return (
                    <div
                      key={conv.id}
                      className={`flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors ${selected?.id === conv.id ? "bg-accent" : "hover-elevate"}`}
                      onClick={() => handleSelectConversation(conv.id)}
                      data-testid={`conversation-${conv.id}`}
                    >
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium truncate">{contactName}</span>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{formatRelativeTime(conv.last_message_at)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.last_message ?? ""}</p>
                      </div>
                      {conv.unread_count > 0 && (
                        <Badge className="text-xs px-1.5 min-w-5 h-5 justify-center">{conv.unread_count}</Badge>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>

        <div className={`flex-1 flex flex-col min-w-0 ${showChat ? "flex" : "hidden md:flex"}`}>
          {selected ? (
            <>
              <div className="flex items-center justify-between gap-4 p-3 border-b">
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="md:hidden"
                    onClick={() => setShowChat(false)}
                    data-testid="button-back-to-list"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {selected.contact_id.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium" data-testid="text-chat-name">{selected.contact_id.slice(0, 8)}</div>
                    <div className="text-xs text-muted-foreground">—</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" data-testid="button-call">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3 max-w-2xl mx-auto">
                  {msgLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                          <Skeleton className="h-16 w-[75%] rounded-md" />
                        </div>
                      ))}
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      {t("inbox.noMessages")}
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[75%] rounded-md px-3 py-2 ${
                            msg.direction === "outbound"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                          data-testid={`message-${msg.id}`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <div className={`flex items-center gap-1 mt-1 ${msg.direction === "outbound" ? "justify-end" : ""}`}>
                            <span className="text-xs opacity-60">{formatMessageTime(msg.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              <div className="border-t p-3">
                {aiMode && (
                  <div className="flex items-center gap-2 max-w-2xl mx-auto mb-2 text-xs text-primary">
                    <Bot className="h-3.5 w-3.5" />
                    <span>{t("inbox.aiModeActive")}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 max-w-2xl mx-auto">
                  <Button size="icon" variant="ghost" data-testid="button-attach">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant={aiMode ? "default" : "ghost"}
                    onClick={() => setAiMode(!aiMode)}
                    data-testid="button-ai-toggle"
                  >
                    <Bot className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder={aiMode ? t("inbox.typeAiMessage") : t("inbox.typeMessage")}
                    className="flex-1"
                    data-testid="input-message"
                  />
                  <Button size="icon" data-testid="button-send">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div className="text-sm text-muted-foreground">
                {convLoading ? t("inbox.loading") : t("inbox.selectConversation")}
              </div>
            </div>
          )}
        </div>

        {selected && (
          <div className="hidden xl:block w-72 border-l bg-background p-4">
            <div className="text-center mb-4">
              <Avatar className="h-16 w-16 mx-auto mb-2">
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {selected.contact_id.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold" data-testid="text-contact-name">{selected.contact_id.slice(0, 8)}</h3>
              <p className="text-sm text-muted-foreground">—</p>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">{t("inbox.stage")}</div>
                <div className="text-sm">—</div>
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">{t("inbox.tags")}</div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">VIP</Badge>
                  <Badge variant="outline">Repeat Buyer</Badge>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">{t("inbox.orders")}</div>
                <div className="text-sm">3 orders (RM 456.00)</div>
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">{t("inbox.notes")}</div>
                <p className="text-sm text-muted-foreground">Prefers COD payment. Usually orders in bulk.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
