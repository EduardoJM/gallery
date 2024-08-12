import { Suspense } from 'react';
import { InfiniteGallery } from '../components/infinite-gallery';
import { InfiniteGallerySuspense } from '../components/infinite-gallery-suspense';
import { GalleryCreatorHeader } from '../components/gallery-creator-header';

const Gallery = () => {


  return (
    <div>
      <Suspense fallback={<>Carregando...</>}>
        <GalleryCreatorHeader />
      </Suspense>

      <Suspense fallback={<InfiniteGallerySuspense />}>
        <InfiniteGallery />
      </Suspense>
    </div>
  )
};

export default Gallery;
