/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import SkeletonTable from '@/components/skeleton-loader/SkeletonTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactionThisYearQuery } from '@/hooks/use-transaction';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

const ChartComponent = () => {
  const { data: thisYear, status } = useTransactionThisYearQuery();

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {status !== 'loading' ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={thisYear?.data} className="overflow-x-scroll">
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                // tickFormatter={(value): any => `${rupiahFormat(value)}.000`}
              />
              <Bar dataKey="count" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <SkeletonTable />
        )}
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
