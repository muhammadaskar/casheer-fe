import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';

type Props = {
  name: string;
  onReject: () => void;
  onAccept: () => void;
};

const UserActivation: FC<Props> = ({ name, onReject, onAccept }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration User</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h2 className="font-medium text-xl">{name}</h2>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end space-x-3">
          <Button variant={'destructive'} onClick={onReject}>
            Decline
          </Button>
          <Button variant={'default'} onClick={onAccept}>
            Accept
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserActivation;
