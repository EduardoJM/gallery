import { Fragment, useEffect } from 'react';
import { Images } from 'lucide-react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'
import { GalleryGrid } from '@/components/ui/gallery-grid';
import { GalleryItem } from './gallery-item';
import { useContentsInfinite } from '../queries';
import { buttonVariants } from '@/components/ui/button';

export const InfiniteGallery = () => {
  const { ref, inView } = useInView();
  const location = useLocation();
  const { pathname } = location;
  const [params] = useSearchParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useContentsInfinite(
    params.get('media') || null,
    params.get('tags') || null,
  );
  const { creator } = useParams();

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const isEmpty = data.pages.length === 1 && data.pages[0].meta.pages === 0;

  return (
    <div>
      <div>
        <Link to={{ pathname }}>Todos</Link>
        <Link to={{ pathname, search: '?media=Photo' }}>Fotos</Link>
        <Link to={{ pathname, search: '?media=Video' }}>Vídeos</Link>
      </div>

      {isEmpty && (
        <div className='min-h-[300px] bg-[#ccc] rounded-lg p-5 flex flex-col items-center justify-center gap-2'>
          <Images size={48} className='mb-6' />
          <h3 className='text-xl uppercase font-bold'>Nenhum item!</h3>
          {!!creator && (
            <>
              <p className='text-center'>
                Nenhum item foi adicionado, ainda, a galeria desse criador.
              </p>

              <Link
                className={buttonVariants({ variant: 'default' })}
                to={`?dialog=upload&id=${creator}`}
                state={{ prevLocation: location }}
              >
                Adicionar Novo
              </Link>
            </>
          )}
        </div>
      )}
      
      {!isEmpty && (
        <>
          <GalleryGrid>
            {data.pages.map((group, i) => (
              <Fragment key={i}>
                {group.results.map((content) => (
                  <GalleryItem key={content.id} content={content} />
                ))}
              </Fragment>
            ))}
          </GalleryGrid>

          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {/* TODO: better fetching status? */}
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
      )}
    </div>
  );
}
