import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { HiUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import TextInput from "../../components/Form/TextInput";
import * as Yup from "yup";
import { IUser } from "../../data/stores/userStore";
import { useStore } from "../../data/stores/store";
import { Logo } from "../Home/Home";
import { GiDart } from "react-icons/gi";
// import { Logo } from "../Home/Home";

interface IAuthProps {
  handleSetSignUp: (isSignUp: boolean) => void;
}

function Authentication({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  const { authStore } = useStore();
  const { cookie } = authStore;

  const [signUp, setSignUp] = useState(false);

  return (
    <>
      {cookie !== null ||
        (signUp ? (
          <SignUp handleSetSignUp={setSignUp} />
        ) : (
          <SignIn handleSetSignUp={setSignUp} />
        ))}
      {cookie === null || children}
    </>
  );
}

export default Authentication;

export const SignIn = observer(({ handleSetSignUp }: IAuthProps) => {
  const { authStore } = useStore();
  const { handleUserSignIn } = authStore;
  const navigation = useNavigate();

  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    handleUserSignIn(signIn).then((user) => {
      if (user) navigation("/dashboard");
    });

    setSignIn({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          {/* <Logo className="object-cover mx-auto" /> */}
          <div
            className={`flex items-center justify-center gap-2 font-bold stroke-2 text-gray-700 m-4 p-4 mb-5`}
          >
            <GiDart size={40} className="text-neutral" />{" "}
            <span className="text-3xl text-neutral">MoneySmart</span>
          </div>
          <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
            Welcome to <span className="font-bold">Money Smart Budget App</span>
          </p>
          {/* <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
            <span>username: blessco</span>
            <br />
            <span>password: password</span>
          </p> */}

          <form
            onSubmit={handleSignIn}
            className="p-4 mt-6 mb-0 space-y-4 bg-white rounded-lg shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-lg font-medium text-center">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>

              <div className="relative">
                <input
                  onChange={(e) =>
                    setSignIn({ ...signIn, username: e.target.value })
                  }
                  type="username"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter username"
                />

                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <HiUserCircle />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  onChange={(e) =>
                    setSignIn({ ...signIn, password: e.target.value })
                  }
                  type="password"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <MdPassword />
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-block btn-neutral">
              Sign in
            </button>

            <p className="text-sm text-center text-gray-500">
              No account?
              <a className="underline" onClick={() => handleSetSignUp(true)}>
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
});

export const SignUp = observer(
  ({ handleSetSignUp }: { handleSetSignUp: (isSignUp: boolean) => void }) => {
    const {
      userStore: { user, create_user },
    } = useStore();

    const navigation = useNavigate();

    const validationScheme = Yup.object({
      username: Yup.string().required("The first name is required"),
      password: Yup.string().required("The first name is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords must match"
      ),
      firstName: Yup.string().required("The first name is required"),
      lastName: Yup.string().required("The lastname is required"),
      email: Yup.string()
        .email("use a valid email")
        .required("The email is required"),
      phoneNumber: Yup.string().required("The phone number is required"),
    });

    return (
      <>
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <div
              className={`flex items-center justify-center gap-2 font-bold stroke-2 text-gray-700 m-4 p-4 mb-5`}
            >
              <GiDart size={40} className="text-neutral" />{" "}
              <span className="text-3xl text-neutral">MoneySmart</span>
            </div>

            <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
              Welcome to{" "}
              <span className="font-bold">Money Smart Budget App</span>
            </p>

            <Formik
              validationSchema={validationScheme}
              enableReinitialize
              initialValues={user}
              onSubmit={(
                values: IUser,
                { setSubmitting }: FormikHelpers<IUser>
              ) => {
                create_user(values).then(() => navigation(0));
                // console.log(values);
                setSubmitting(false);
              }}
            >
              <Form className="p-4 mt-6 mb-0 space-y-4 rounded-lg shadow-lg sm:p-6 lg:p-8">
                <p className="text-lg font-medium text-center">
                  Sign up to your account
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextInput
                    type="text"
                    label="First Name"
                    id="firstName"
                    name="firstName"
                  />
                  <TextInput
                    type="text"
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                  />
                </div>
                <TextInput label="Username" id="username" name="username" />
                <TextInput label="Email Addresss" id="email" name="email" />
                <TextInput
                  label="Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextInput
                    type="password"
                    label="Password"
                    id="password"
                    name="password"
                  />
                  <TextInput
                    type="password"
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                </div>

                <button type="submit" className="btn btn-block btn-neutral">
                  Sign up
                </button>

                <p className="text-sm text-center">
                  No account?
                  <a
                    className="underline"
                    onClick={() => handleSetSignUp(false)}
                  >
                    Sign in
                  </a>
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </>
    );
  }
);
