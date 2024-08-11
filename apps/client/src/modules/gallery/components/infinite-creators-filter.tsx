import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MoreVertical } from 'lucide-react';
import { useContentCreatorsInfinite } from '@/modules/creator/queries';
import { CreatorLine } from "@/modules/creator/components/creator-line";
import { Button, buttonVariants } from "@/components/ui/button"
import { CreatorFormModal } from '@/modules/creator/modals/creator-form-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const InfiniteCreatorsFilterInner = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useContentCreatorsInfinite();

  return (
    <div>
      <div className='flex flex-col gap-4'>
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((creator) => (
              <div className='flex flex-row items-stretch'>
                <Link className='flex-1' to={`/dashboard/gallery/${creator.id}/`} key={creator.id}>
                  <CreatorLine creator={creator} />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{creator.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={`?dialog=creator&id=${creator.id}`}>Editar</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Deletar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  );
}

export const InfiniteCreatorsFilter = () => {

  return (
    <div className='flex-1 flex flex-col items-stretch pt-6'>
      <div className='mb-6 flex flex-row items-center'>
        <h2 className='flex-1'>Criadores de Conteúdo</h2>
        <Link to="?dialog=creator" className={buttonVariants({ variant: 'default', size: 'icon' })}>
          <Plus />
        </Link>
      </div>
      <div className='flex-1'>
        <InfiniteCreatorsFilterInner />
      </div>

      <CreatorFormModal />
    </div>
  )
};
