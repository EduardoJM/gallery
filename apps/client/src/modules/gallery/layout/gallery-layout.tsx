import { Link, Outlet } from "react-router-dom";
import { Home } from 'lucide-react';
import { InfiniteCreatorsFilter } from '../components/infinite-creators-filter';
import { Suspense } from "react";

export const GalleryLayout = () => {

  return (
    <div className="flex flex-row gap-5">
      <div className="w-[300px] flex flex-col items-stretch pt-10">
        <div className="pt-[64px]">
          <Link
            to="/dashboard/gallery"
            onClick={() => window.scrollTo({ top: 0 })}
            className="flex flex-row items-center gap-2"
          >
            <Home size={24} />

            Início
          </Link>
        </div>

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
