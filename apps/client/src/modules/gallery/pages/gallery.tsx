import { Routes, Route } from 'react-router-dom';
import { InfiniteGallery } from '../components/infinite-gallery';
import { GalleryItemModal } from '../components/gallery-item-modal';

const Gallery = () => {


  return (
    <div>
      <InfiniteGallery />

      <Routes>
        <Route path="content/:id" element={<GalleryItemModal />} />
      </Routes>
    </div>
  )
};

export default Gallery;
