import { useEffect, useMemo, useState } from "react";
import { useInView } from 'react-intersection-observer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from '@/components/ui/icon';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const perPage = 20;

const icons = Object.keys(dynamicIconImports);

export interface SelectIcon {
  value: string;
  onChangeValue: (value: string) => void;
}

export const SelectIcon = ({ value, onChangeValue }: SelectIcon) => {
  const { inView, ref } = useInView();

  const paginatedIcons = useMemo(() => {
    const pages = Math.ceil(icons.length / perPage);
    return Array
      .from({ length: pages })
      .map((_, page) => icons.slice(page * perPage, (page + 1) * perPage));
  }, []);
  
  const [visibleIcons, setVisibleIcons] = useState<Array<string>>(paginatedIcons[0]);

  useEffect(() => {
    if (!inView) {
      return;
    }

    setVisibleIcons((prev) => {
      const currentPage = Math.ceil(prev.length / perPage);
      const nextPage = currentPage + 1;
      if (nextPage >= paginatedIcons.length) {
        return prev;
      }
      const page = paginatedIcons[nextPage];
      return [...prev, ...page];
    });
  }, [inView, paginatedIcons]);

  return (
    <Select value={value} onValueChange={onChangeValue}>
      <SelectTrigger className="w-full">
        <SelectValue>
          {value ? (
            <span className="flex flex-row items-center justify-center gap-2 truncate">
              <Icon name={value as keyof typeof dynamicIconImports} />
              {value}
            </span>
          ) : (
            <>Selecionar ícone</>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {icons.map((item) => (
          <SelectItem
            value={item}
            key={item}
          >
            <span className="flex flex-row items-center justify-center gap-2">
              <Icon name={item as keyof typeof dynamicIconImports} />
              <SelectItemText>{item}</SelectItemText>
            </span>
          </SelectItem>
        ))}
        <span  ref={ref} />
      </SelectContent>
    </Select>
  );
}
