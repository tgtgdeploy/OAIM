import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const style = {
  "--sidebar-width": "15rem",
  "--sidebar-width-icon": "3rem",
};

export function AdminLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between gap-4 p-3 border-b bg-background sticky top-0 z-50">
            <div className="flex items-center gap-2">
              <SidebarTrigger data-testid="button-admin-sidebar-toggle" />
              {title && <h1 className="text-lg font-semibold">{title}</h1>}
              <Badge variant="destructive" className="text-xs">Admin</Badge>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <Avatar className="h-8 w-8" data-testid="avatar-admin">
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
