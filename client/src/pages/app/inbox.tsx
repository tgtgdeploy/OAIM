import { useState } from "react";
import { AppLayout } from "./layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Paperclip, Bot, Phone } from "lucide-react";

const conversations = [
  { id: "1", name: "Sarah Ahmad", phone: "+60 12-345-6789", lastMsg: "Hi, I want to order the blue dress", time: "2m ago", unread: 2, stage: "new_inquiry" },
  { id: "2", name: "Ahmad Razak", phone: "+60 13-456-7890", lastMsg: "What's the price for bulk order?", time: "15m ago", unread: 1, stage: "quoted" },
  { id: "3", name: "Lisa Tan", phone: "+60 11-234-5678", lastMsg: "OK I'll confirm the order", time: "1h ago", unread: 0, stage: "follow_up" },
  { id: "4", name: "Raj Kumar", phone: "+60 17-890-1234", lastMsg: "Thanks for the quick delivery!", time: "3h ago", unread: 0, stage: "closed_won" },
  { id: "5", name: "Mei Ling", phone: "+60 16-789-0123", lastMsg: "Do you have size L?", time: "5h ago", unread: 3, stage: "new_inquiry" },
  { id: "6", name: "David Ooi", phone: "+60 19-012-3456", lastMsg: "Can I see more colors?", time: "1d ago", unread: 0, stage: "quoted" },
];

const messages = [
  { id: "1", direction: "inbound" as const, content: "Hi, I want to order the blue dress. Is it available?", time: "10:30 AM" },
  { id: "2", direction: "outbound" as const, content: "Hi Sarah! Yes, the blue dress is available. We have sizes S, M, and L in stock. The price is RM89. Would you like to place an order?", time: "10:30 AM", isAi: true },
  { id: "3", direction: "inbound" as const, content: "How much for 2 pieces? Any discount?", time: "10:32 AM" },
  { id: "4", direction: "outbound" as const, content: "For 2 pieces, we can offer 10% off. That would be RM160.20 for both. Free shipping included! Shall I create the order?", time: "10:32 AM", isAi: true },
  { id: "5", direction: "inbound" as const, content: "OK deal! I want size M and L", time: "10:35 AM" },
];

const stageColors: Record<string, string> = {
  new_inquiry: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  quoted: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  follow_up: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  closed_won: "bg-green-500/10 text-green-700 dark:text-green-300",
};

export default function InboxPage() {
  const [selected, setSelected] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="flex h-full">
        <div className="w-80 border-r flex flex-col bg-background">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-conversations"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-0.5">
              {filtered.map((conv) => (
                <div
                  key={conv.id}
                  className={`flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors ${selected.id === conv.id ? "bg-accent" : "hover-elevate"}`}
                  onClick={() => setSelected(conv)}
                  data-testid={`conversation-${conv.id}`}
                >
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {conv.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium truncate">{conv.name}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMsg}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="text-xs px-1.5 min-w-5 h-5 justify-center">{conv.unread}</Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between gap-4 p-3 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {selected.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium" data-testid="text-chat-name">{selected.name}</div>
                <div className="text-xs text-muted-foreground">{selected.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={stageColors[selected.stage]}>
                {selected.stage.replace("_", " ")}
              </Badge>
              <Button size="icon" variant="ghost" data-testid="button-call">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3 max-w-2xl mx-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-md px-3 py-2 ${
                      msg.direction === "outbound"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                    data-testid={`message-${msg.id}`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <div className={`flex items-center gap-1 mt-1 ${msg.direction === "outbound" ? "justify-end" : ""}`}>
                      {"isAi" in msg && msg.isAi && (
                        <Bot className="h-3 w-3 opacity-60" />
                      )}
                      <span className="text-xs opacity-60">{msg.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="flex items-center gap-2 max-w-2xl mx-auto">
              <Button size="icon" variant="ghost" data-testid="button-attach">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1"
                data-testid="input-message"
              />
              <Button size="icon" data-testid="button-send">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden xl:block w-72 border-l bg-background p-4">
          <div className="text-center mb-4">
            <Avatar className="h-16 w-16 mx-auto mb-2">
              <AvatarFallback className="text-lg bg-primary/10 text-primary">
                {selected.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold" data-testid="text-contact-name">{selected.name}</h3>
            <p className="text-sm text-muted-foreground">{selected.phone}</p>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Stage</div>
              <Badge variant="secondary" className={stageColors[selected.stage]}>
                {selected.stage.replace("_", " ")}
              </Badge>
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Tags</div>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">VIP</Badge>
                <Badge variant="outline">Repeat Buyer</Badge>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Orders</div>
              <div className="text-sm">3 orders (RM 456.00)</div>
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Notes</div>
              <p className="text-sm text-muted-foreground">Prefers COD payment. Usually orders in bulk.</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
