import { PropsWithChildren } from "react";

export const GalleryGrid = ({ children }: PropsWithChildren) => {

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
      {children}
    </div>
  )
};
