import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC, ReactNode } from 'react';
import { Skeleton } from '../ui/skeleton';

type Props = {
  title: string;

  desc: string;
  icon?: ReactNode;
};

const SkeletonCard: FC<Props> = ({ title, desc, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs md:text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <Skeleton className="w-36 h-[20px] rounded-sm" />
        <p className="text-xs text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
