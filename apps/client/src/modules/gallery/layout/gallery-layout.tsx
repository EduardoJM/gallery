import { Outlet } from "react-router-dom";
import { InfiniteCreatorsFilter } from '../components/infinite-creators-filter';
import { Suspense } from "react";

export const GalleryLayout = () => {

  return (
    <div className="flex flex-row gap-5">
      <div className="w-[300px] h-screen sticky top-0 flex flex-col items-stretch">
        <InfiniteCreatorsFilter />
      </div>

      <div className="flex-1">
        <Suspense fallback={<>Carregando...</>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
};
