import { Outlet } from "react-router-dom";

export const AuthenticationLayout = () => {

  return (
    <div className="w-full min-h-screen	min-h-dvh flex flex-row items-stretch">
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-[url('/images/maria_small.png')] bg-no-repeat bg-left-bottom bg-[length:60%_auto] lg:bg-left-bottom bg-left-bottom lg:bg-[url('/images/maria_bg_transparent.png')] lg:bg-[length:auto_90%]">
        <Outlet />
      </div>
    </div>
  )
};
