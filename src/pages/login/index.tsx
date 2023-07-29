import LoginTabs from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToastAction } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import useAuthentication from '@/hooks/use-auth';
import useRegistration from '@/hooks/use-registration';
import { ChangeEvent, FormEvent, useEffect, useReducer, useState } from 'react';

type RegisterType = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

const registerInitialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirm_password: '',
};

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: '',
  });
  const [disableLogin, setDisableLogin] = useState<boolean>(false);
  const [disableRegisterButton, setDisableRegisterButton] =
    useState<boolean>(false);

  const [registerInput, setRegisterInput] = useReducer(
    (current: RegisterType, update: Partial<RegisterType>) => ({
      ...current,
      ...update,
    }),
    registerInitialState
  );

  const { toast } = useToast();
  const { authLogin } = useAuthentication();
  const { onRegistration, message, responseStatus } = useRegistration();

  const handleLoginInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  useEffect(() => {
    if (loginInput.username === '' || loginInput.password === '') {
      return setDisableLogin(true);
    }

    return setDisableLogin(false);
  }, [loginInput]);

  useEffect(() => {
    if (
      registerInput.name === '' ||
      registerInput.username === '' ||
      registerInput.email === '' ||
      registerInput.password === '' ||
      registerInput.confirm_password === ''
    ) {
      return setDisableRegisterButton(true);
    }
    if (registerInput.password !== registerInput.confirm_password) {
      return setDisableRegisterButton(true);
    }

    return setDisableRegisterButton(false);
  }, [registerInput, loginInput]);

  useEffect(() => {
    responseStatus >= 200 && responseStatus < 300
      ? toast({
          description: message,
        })
      : toast({
          variant: 'destructive',
          description: message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
  }, [message, responseStatus, toast]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <LoginTabs
          title="Sign in"
          description="Login with your caseer account."
          onSubmit={(event) =>
            authLogin(event, loginInput.username, loginInput.password)
          }
          usernameOnChange={(event) => handleLoginInput(event)}
          usernameValue={loginInput.username}
          passwordOnChange={(event) => handleLoginInput(event)}
          passwordValue={loginInput.password}
          buttonText="Sign in"
          disableButton={disableLogin}
        />

        <Register
          title="Register"
          desc="Register your account"
          nameValue={registerInput.name}
          nameOnChange={(event: ChangeEvent<HTMLInputElement>) =>
            setRegisterInput({
              name: event.target.value,
            })
          }
          usernameValue={registerInput.username}
          usernameOnChange={(event: ChangeEvent<HTMLInputElement>) =>
            setRegisterInput({
              username: event.target.value,
            })
          }
          emailValue={registerInput.email}
          emailOnChange={(event: ChangeEvent<HTMLInputElement>) =>
            setRegisterInput({
              email: event.target.value,
            })
          }
          passwordValue={registerInput.password}
          passwordOnChange={(event: ChangeEvent<HTMLInputElement>) =>
            setRegisterInput({
              password: event.target.value,
            })
          }
          confirmPasswordValue={registerInput.confirm_password}
          confirmPasswordOnChange={(event: ChangeEvent<HTMLInputElement>) =>
            setRegisterInput({
              confirm_password: event.target.value,
            })
          }
          disableButton={disableRegisterButton}
          onSubmit={(event: FormEvent<HTMLFormElement>) =>
            onRegistration(
              event,
              registerInput.name,
              registerInput.username,
              registerInput.email,
              registerInput.password
            )
          }
        />
      </Tabs>
      <Toaster />
    </div>
  );
};

export default Login;
