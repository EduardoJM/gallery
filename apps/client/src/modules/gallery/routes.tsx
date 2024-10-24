import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { GalleryLayout } from './layout/gallery-layout';

const Gallery = lazy(() => import('./pages/gallery'));
const GalleryItemModal = lazy(() => import('./pages/gallery-item-modal'));

const GalleryRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<GalleryLayout />}>
        <Route path=":creator" element={<Outlet />}>
          <Route path="" element={<Gallery />} />
          <Route
            path="content/:id"
            element={
              <>
                <Gallery />
                <Suspense
                  fallback={
                    <>
                      TODO: abrindo modal...
                    </>
                  }
                >
                  <GalleryItemModal />
                </Suspense>
              </>
            }
          />
        </Route>
        <Route path="" element={<Outlet />}>
          <Route path="" element={<Gallery />} />
          <Route
            path="content/:id"
            element={
              <>
                <Gallery />
                <Suspense
                  fallback={
                    <>
                      TODO: abrindo modal...
                    </>
                  }
                >
                  <GalleryItemModal />
                </Suspense>
              </>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default GalleryRoutes;
