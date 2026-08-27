import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full w-full flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
