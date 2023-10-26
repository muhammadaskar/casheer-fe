import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC, ReactNode } from 'react';

type Props = {
  title: string;
  total: string;
  desc: string;
  icon?: ReactNode;
};

const OverviewComponent: FC<Props> = ({ title, total, desc, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs md:text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-sm md:text-2xl font-bold">{total}</div>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
};

export default OverviewComponent;
