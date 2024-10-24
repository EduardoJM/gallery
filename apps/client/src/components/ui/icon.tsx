import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { useInView } from 'react-intersection-observer';
const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }}/>

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const { ref, inView } = useInView();
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <span ref={ref}>
      {inView && (
        <Suspense fallback={fallback}>
          <LucideIcon {...props} />
        </Suspense>
      )}
    </span>
  );
}
