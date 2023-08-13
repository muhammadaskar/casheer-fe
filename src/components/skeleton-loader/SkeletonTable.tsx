import { Skeleton } from '../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const SkeletonTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="w-[30px] h-[20px] rounded-sm" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-[100px] h-[20px] rounded-sm" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-[100px] h-[20px] rounded-sm" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-[100px] h-[20px] rounded-sm" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton className="w-[30px] h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-2/3 h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[120px] h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-[20px] rounded-sm" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="w-[30px] h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-1/2 h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[120px] h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-[20px] rounded-sm" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="w-[30px] h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-3/4 h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[120px] h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-[20px] rounded-sm" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="w-[30px] h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-2/3 h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[120px] h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-[20px] rounded-sm" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="w-[30px] h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-2/3 h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[120px] h-[20px] rounded-sm" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-[20px] rounded-sm" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SkeletonTable;
