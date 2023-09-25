import React, { FC } from 'react';
import { Button } from '../ui/button';
import {
  useAcceptRegistrationMutation,
  useRejectRegistrationMutation,
} from '@/hooks/use-registration';
import { toast } from '../ui/use-toast';

type Props = {
  id: number;
};

const UnusersAction: FC<Props> = ({ id }) => {
  const acceptMutation = useAcceptRegistrationMutation();
  const rejectMutation = useRejectRegistrationMutation();

  return (
    <div className="flex flex-row space-x-4">
      <Button
        variant={'destructive'}
        onClick={() =>
          rejectMutation.mutate(id, {
            onSuccess: () => {
              toast({
                variant: 'destructive',
                description: 'User rejected',
              });
            },
          })
        }
      >
        Reject
      </Button>
      <Button
        variant={'default'}
        onClick={() =>
          acceptMutation.mutate(id, {
            onSuccess: () => {
              toast({
                variant: 'default',
                description: 'User activate success',
              });
            },
          })
        }
      >
        Accept
      </Button>
    </div>
  );
};

export default UnusersAction;
