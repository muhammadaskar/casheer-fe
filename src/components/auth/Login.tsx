import { ChangeEvent, FC, FormEvent } from 'react';
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

type LoginProps = {
  title: string;
  description: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  usernameOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
};

const LoginTabs: FC<LoginProps> = ({
  title,
  description,
  onSubmit,
  usernameOnChange,
  passwordOnChange,
  buttonText,
}) => {
  return (
    <TabsContent value="signin">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="@username"
                name="username"
                onChange={usernameOnChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="*********"
                onChange={passwordOnChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">{buttonText}</Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default LoginTabs;
