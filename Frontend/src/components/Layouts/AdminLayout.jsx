import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/app-sidebar.jsx";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <SidebarInset className="flex-1 flex flex-col">
          <header className="flex h-16 items-center gap-2 border-b px-4">
            <SidebarTrigger className="mr-2" />
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </header>

          <main className="flex-1 p-4">
            <Outlet /> {/* Renders child routes */}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
