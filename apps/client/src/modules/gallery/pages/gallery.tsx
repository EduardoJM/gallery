import { Suspense } from 'react';
import { InfiniteGallery } from '../components/infinite-gallery';
import { InfiniteGallerySuspense } from '../components/infinite-gallery-suspense';

const Gallery = () => {


  return (
    <div>
      <Suspense fallback={<InfiniteGallerySuspense />}>
        <InfiniteGallery />
      </Suspense>
    </div>
  )
};

export default Gallery;
