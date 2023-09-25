import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import useDeviceCheck from '@/hooks/use-devicechek';
import { useUserAccountMutation } from '@/hooks/use-user';
import { ChangeEvent, FormEvent, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

type AccountInputType = {
  currentPassword: string;
  newPassword: string;
  reTypePassword: string;
};

const Account = () => {
  const mobile = useDeviceCheck();
  const navigate = useNavigate();
  const [input, setInput] = useReducer(
    (current: AccountInputType, update: Partial<AccountInputType>) => ({
      ...current,
      ...update,
    }),
    {
      currentPassword: '',
      newPassword: '',
      reTypePassword: '',
    }
  );
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(false);
  const updateAccount = useUserAccountMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateAccount.mutate(
      {
        current_password: input.currentPassword,
        new_password: input.reTypePassword,
      },
      {
        onSuccess: () => {
          toast({
            variant: 'default',
            description: 'Update passsword success',
          });

          setTimeout(() => {
            localStorage.removeItem('user');
            window.location.reload();
          }, 1000);
        },
      }
    );
  };

  useEffect(() => {
    if (mobile) {
      return navigate('/settings');
    }
    return navigate('/settings/account');
  }, [mobile, navigate]);

  useEffect(() => {
    if (
      input.currentPassword === '' ||
      input.newPassword === '' ||
      input.reTypePassword === ''
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }

    if (input.newPassword !== input.reTypePassword) {
      setError(true);
      setDisable(true);
    } else {
      setError(false);
      setDisable(false);
    }
  }, [input.newPassword, input.reTypePassword, input.currentPassword]);

  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>
      <main className="space-y-6">
        <div className="hidden sm:block">
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator className="hidden sm:block" />
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              name="current-password"
              placeholder="********"
              // placeholder={user.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  currentPassword: event.target.value,
                })
              }
            />
            <p className="text-sm text-muted-foreground">
              This is your current password.
            </p>
          </div>

          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              name="new-password"
              placeholder="********"
              // placeholder={user.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  newPassword: event.target.value,
                })
              }
            />
            <p className="text-sm text-muted-foreground">
              Type your new password.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Re-type Password</Label>
            <Input
              type="password"
              name="new-repassword"
              placeholder="********"
              className={error ? 'border-red-500' : ''}
              // placeholder={user.email}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  reTypePassword: event.target.value,
                })
              }
            />
            <p
              className={`text-sm ${
                error ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              {error
                ? '*Retype your password.'
                : 'You can manage your password.'}
            </p>
          </div>

          <Button variant="default" type="submit" disabled={disable}>
            Update account
          </Button>
        </form>
      </main>
    </>
  );
};

export default Account;
