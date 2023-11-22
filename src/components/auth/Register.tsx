/* eslint-disable @typescript-eslint/await-thenable */
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
} from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { TabsContent } from '../ui/tabs';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';

type RegisterProps = {
  title: string;
  desc: string;
  nameValue: string;
  redBorder: boolean;
  passwordRedBorder: boolean;
  retypeRedBorder: boolean;
  nameOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  usernameValue: string;
  usernameOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  emailValue: string;
  emailOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordValue: string;
  passwordOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  confirmPasswordValue: string;
  confirmPasswordOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  disableButton: boolean;
  message: string;
  response: number;
  setResponse: Dispatch<SetStateAction<number>>;
};

const Register: FC<RegisterProps> = (props) => {
  const {
    title,
    desc,
    nameValue,
    redBorder,
    passwordRedBorder,
    retypeRedBorder,
    nameOnChange,
    usernameValue,
    usernameOnChange,
    emailValue,
    emailOnChange,
    passwordValue,
    passwordOnChange,
    confirmPasswordValue,
    confirmPasswordOnChange,
    onSubmit,
    disableButton,
    message,
    response,
    setResponse,
  } = props;

  const { toast } = useToast();

  useEffect(() => {
    if (message !== '' && response !== 0) {
      if (response >= 200 && response < 300) {
        toast({
          description: message,
        });
      } else {
        toast({
          variant: 'destructive',
          description: message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      setResponse(0);
    }
  }, [message, response, setResponse, toast]);

  return (
    <TabsContent value="register">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl">{title}</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            {desc}
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                name="name"
                value={nameValue}
                placeholder="John Doe"
                onChange={nameOnChange}
              />
              {/* <p className="text-sm text-muted-foreground">
                Type your fullname.
              </p> */}
            </div>

            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                className={`${redBorder ? 'border-red-500' : ''}`}
                value={usernameValue}
                placeholder="@username"
                onChange={usernameOnChange}
              />
              <p className="text-sm text-muted-foreground">Username min 6.</p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={emailValue}
                placeholder="johndoe@bingbing.com"
                onChange={emailOnChange}
              />
              {/* <p className="text-sm text-muted-foreground">
                Use your valid email.
              </p> */}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={passwordValue}
                className={`${passwordRedBorder ? 'border-red-500' : ''}`}
                placeholder="*********"
                onChange={passwordOnChange}
              />
              <p className="text-sm text-muted-foreground">Password min 8.</p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input
                id="confirm"
                name="confirm_password"
                type="password"
                value={confirmPasswordValue}
                className={`${retypeRedBorder ? 'border-red-500' : ''}`}
                placeholder="*********"
                onChange={confirmPasswordOnChange}
              />
              <p className="text-sm text-muted-foreground">
                Re-type your password.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={disableButton} type="submit">
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default Register;
