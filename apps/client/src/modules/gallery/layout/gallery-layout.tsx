import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export const GalleryLayout = () => {

  return (
    <div className="flex flex-row gap-5 w-full max-w-6xl">
      <div className="flex-1">
        <Suspense fallback={<>Carregando...</>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
};
