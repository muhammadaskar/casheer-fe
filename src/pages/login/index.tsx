import LoginTabs from '@/components/auth/Login';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAuthentication from '@/hooks/use-auth';
import { ChangeEvent, useState } from 'react';

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: '',
  });
  const { authLogin } = useAuthentication();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        {/* <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Login with your caseer account.</CardDescription>
            </CardHeader>
            <form
              onSubmit={(event: FormEvent<HTMLFormElement>) =>
                authLogin(event, loginInput.username, loginInput.password)
              }
            >
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="@indraganteng"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleInput(event)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*********"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleInput(event)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Sign in</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent> */}
        <LoginTabs
          title="Sign in"
          description="Login with your caseer account."
          onSubmit={(event) =>
            authLogin(event, loginInput.username, loginInput.password)
          }
          usernameOnChange={(event) => handleInput(event)}
          passwordOnChange={(event) => handleInput(event)}
          buttonText="Sign in"
        />
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Register your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="@indraganteng" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="*********" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input id="confirm" type="password" placeholder="*********" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
