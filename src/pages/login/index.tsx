import LoginTabs from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAuthentication from '@/hooks/use-auth';
import { useRegistration } from '@/hooks/use-registration';
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

  const { authLogin, setResponseStatusAuth, responseStatusAuth, messageAuth } =
    useAuthentication();
  const { onRegistration, message, responseStatus, setResponseStatus } =
    useRegistration();

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
      registerInput.confirm_password === '' ||
      registerInput.username.length <= 6 ||
      registerInput.password.length <= 8
    ) {
      return setDisableRegisterButton(true);
    }
    if (registerInput.password !== registerInput.confirm_password) {
      return setDisableRegisterButton(true);
    }

    return setDisableRegisterButton(false);
  }, [registerInput, loginInput]);

  return (
    <div className="flex justify-center items-center h-screen px-5 md:px-0">
      <Tabs defaultValue="signin" className="w-full lg:w-[400px]">
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
          message={messageAuth}
          responseStatus={responseStatusAuth}
          setResponseStatus={setResponseStatusAuth}
        />

        <Register
          title="Register"
          desc="Register your account"
          message={message}
          response={responseStatus}
          setResponse={setResponseStatus}
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
    </div>
  );
};

export default Login;
