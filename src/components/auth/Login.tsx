import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
} from 'react';
import { TabsContent } from '../ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';

type LoginProps = {
  title: string;
  description: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  usernameOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  usernameValue: string;
  passwordOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordValue: string;
  buttonText: string;
  disableButton: boolean;
  message: string;
  responseStatus: number;
  setResponseStatus: Dispatch<SetStateAction<number>>;
};

const LoginTabs: FC<LoginProps> = ({
  title,
  description,
  onSubmit,
  usernameOnChange,
  usernameValue,
  passwordOnChange,
  passwordValue,
  buttonText,
  disableButton,
  message,
  responseStatus,
  setResponseStatus,
}) => {
  const { toast } = useToast();

  useEffect(() => {
    if (message !== '' && responseStatus !== 0) {
      if (responseStatus >= 200 && responseStatus < 300) {
        return;
      } else {
        toast({
          variant: 'destructive',
          description: message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      setResponseStatus(0);
    }
  }, [message, responseStatus, setResponseStatus, toast]);

  return (
    <TabsContent value="signin">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl">{title}</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            {description}
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="@username"
                name="username"
                value={usernameValue}
                onChange={usernameOnChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={passwordValue}
                placeholder="*********"
                onChange={passwordOnChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={disableButton}>
              {buttonText}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default LoginTabs;
