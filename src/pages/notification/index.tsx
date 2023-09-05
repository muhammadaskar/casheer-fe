import UserActivation from '@/components/notification/UserActivation';
import { toast } from '@/components/ui/use-toast';
import {
  useAcceptRegistrationMutation,
  useRejectRegistrationMutation,
} from '@/hooks/use-registration';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

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

  const conditionalRender = (type: number) => {
    switch (type) {
      case 1:
        return (
          <UserActivation
            name={notif.name}
            onReject={() =>
              rejectMutation.mutate(notif.user_id, {
                onSuccess: () => {
                  navigate('/');
                },
              })
            }
            onAccept={() =>
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
          />
        );

      case 2:
        return <Navigate to="/stock" />;

      case 3:
        return <Navigate to="/stock" />;

      default:
        break;
    }
  };

  return (
    <main className="px-2 md:px-5 py-2 md:py-5 space-y-3 md:space-y-5">
      {conditionalRender(notif.type)}
    </main>
  );
};

export default NotificationPage;
