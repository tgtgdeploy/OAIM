import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SuperAdminSidebar } from "@/components/superadmin/superadmin-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const style = {
  "--sidebar-width": "15rem",
  "--sidebar-width-icon": "3rem",
};

export function SuperAdminLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  const { t } = useTranslation("superadmin");

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <SuperAdminSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between gap-4 p-3 border-b bg-background sticky top-0 z-50">
            <div className="flex items-center gap-2">
              <SidebarTrigger data-testid="button-superadmin-sidebar-toggle" />
              {title && <h1 className="text-lg font-semibold">{title}</h1>}
              <Badge variant="destructive" className="text-xs">{t("layout.superAdmin")}</Badge>
            </div>
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
              <Avatar className="h-8 w-8" data-testid="avatar-superadmin">
                <AvatarFallback className="text-xs bg-destructive/10 text-destructive">SA</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
