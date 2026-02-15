import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MemberSidebar } from "@/components/member/member-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import "@/styles/member.css";

const style = {
  "--sidebar-width": "15rem",
  "--sidebar-width-icon": "3rem",
};

export function MemberLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="member-layout">
        <MemberSidebar />
        <div className="member-main">
          <header className="member-header border-b bg-background">
            <div className="flex items-center gap-2">
              <SidebarTrigger data-testid="button-member-sidebar-toggle" />
              {title && <h1 className="text-lg font-semibold">{title}</h1>}
            </div>
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
              <Avatar className="h-8 w-8" data-testid="avatar-member">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">SA</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="member-content">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
