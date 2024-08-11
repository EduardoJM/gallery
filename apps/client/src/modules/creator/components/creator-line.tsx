import { ContentCreator } from "../types";
import { CreatorAvatar } from "./creator-avatar";

export interface CreatorLineProps {
  creator: ContentCreator;
}

export const CreatorLine = ({ creator }: CreatorLineProps) => {

  return (
    <div className="flex items-center gap-3">
      <CreatorAvatar creator={creator} />
      
      <div className="flex-1 space-y-1 text-sm">
        <h3 className="font-medium leading-none">{creator.name}</h3>
        <p className="text-xs text-muted-foreground">Lena Logic</p>
      </div>
    </div>
  )
};
