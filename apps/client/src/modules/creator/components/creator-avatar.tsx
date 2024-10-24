import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ContentCreator } from '../types';

export interface CreatorAvatarProps {
  creator: ContentCreator;
  size?: string;
}

const fallbackName = (name: string) => {
  if (!name) {
    return '-';
  }
  const splited = name.split(' ').map((item) => item.trim()).filter((item) => !!item);
  if (splited.length === 1) {
    if (splited[0].length <= 2) {
      return splited[0].toUpperCase();
    }
    return splited[0].slice(0, 2).toUpperCase();
  }
  const first = splited[0];
  const last = splited[splited.length - 1];
  return `${first[0].toUpperCase()}${last[0].toUpperCase()}`;
}

export const CreatorAvatar = ({ creator, size }: CreatorAvatarProps) => {
  const mediaToken = localStorage.getItem('@GALLERY:MEDIATOKEN');

  const falback = fallbackName(creator.name);

  return (
    <Avatar style={size ? { width: size, height: size } : {}}>
      <AvatarImage
        src={`http://localhost:3000/media/creators/${creator.id}/cover/?token=${mediaToken}`}
        className="object-cover"
      />
      <AvatarFallback>{falback}</AvatarFallback>
    </Avatar>
  );
};
