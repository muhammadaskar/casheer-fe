/* eslint-disable @typescript-eslint/await-thenable */
import { ChangeEvent, FC, FormEvent } from 'react';
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

type RegisterProps = {
  title: string;
  desc: string;
  nameValue: string;
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
};

const Register: FC<RegisterProps> = (props) => {
  const {
    title,
    desc,
    nameValue,
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
  } = props;

  return (
    <TabsContent value="register">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
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
            </div>

            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={usernameValue}
                placeholder="@indraganteng"
                onChange={usernameOnChange}
              />
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
            <div className="space-y-1">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input
                id="confirm"
                name="confirm_password"
                type="password"
                value={confirmPasswordValue}
                placeholder="*********"
                onChange={confirmPasswordOnChange}
              />
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
