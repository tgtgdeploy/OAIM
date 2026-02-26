import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { TrialBanner } from "@/components/TrialBanner";
import { AiChatBot } from "@/components/AiChatBot";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

const style = {
  "--sidebar-width": "16rem",
  "--sidebar-width-icon": "3rem",
};

export function AppLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between gap-2 px-2 py-2 sm:px-3 sm:py-3 border-b bg-background sticky top-0 z-50">
            <div className="flex items-center gap-2 min-w-0">
              <SidebarTrigger data-testid="button-app-sidebar-toggle" />
              {title && <h1 className="text-base sm:text-lg font-semibold truncate" data-testid="text-page-title">{title}</h1>}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button size="icon" variant="ghost" data-testid="button-notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <LanguageSwitcher />
              <ThemeToggle />
              <Avatar className="h-8 w-8" data-testid="avatar-user">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <TrialBanner />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
      <AiChatBot />
    </SidebarProvider>
  );
}
