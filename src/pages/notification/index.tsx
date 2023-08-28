import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import {
  useAcceptRegistrationMutation,
  useRejectRegistrationMutation,
} from '@/hooks/use-registration';
import { useLocation, useNavigate } from 'react-router-dom';

type NotificationType = {
  id: number;
  name: string;
  type: number;
  user_id: number;
  product_id: number;
};

const NotificationPage = () => {
  const navigate = useNavigate();
  const { notification } = useLocation().state;
  const notif: NotificationType = notification;
  const acceptMutation = useAcceptRegistrationMutation();
  const rejectMutation = useRejectRegistrationMutation();

  return (
    <main className="px-2 md:px-5 py-2 md:py-5 space-y-3 md:space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Registration User</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h2 className="font-medium text-xl">{notif.name}</h2>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-end space-x-3">
            <Button
              variant={'destructive'}
              onClick={() =>
                rejectMutation.mutate(notif.user_id, {
                  onSuccess: () => {
                    navigate('/');
                  },
                })
              }
            >
              Decline
            </Button>
            <Button
              variant={'default'}
              onClick={() =>
                acceptMutation.mutate(notif.user_id, {
                  onSuccess: () => {
                    toast({
                      variant: 'default',
                      description: 'User activation success',
                    });
                    navigate('/');
                  },
                })
              }
            >
              Accept
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default NotificationPage;
