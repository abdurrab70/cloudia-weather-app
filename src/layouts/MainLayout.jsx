import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div className="relative w-full min-h-dvh overflow-x-hidden bg-gradient-to-br from-[#2a2438] via-[#221d30] to-[#1a1626]">
      <div className="relative z-10 w-full min-h-dvh flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};
