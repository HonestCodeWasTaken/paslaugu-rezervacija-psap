import { useEffect } from "react";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next/types";
import { CtxOrReq } from "next-auth/client/_utils";
import {
  getCsrfToken,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SignIn = ({
  csrfToken,
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(providers);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-5">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="/api/auth/signin/email"
            method="POST"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in with email token
              </button>
            </div>
          </form>

          {providers
            ? Object.values(providers)
                .filter((provider) => provider.name === "Google")
                .map((provider) => (
                  <button
                    type="submit"
                    className="group items-center relative flex w-full justify-center rounded-md border border-indigo-600 py-2 px-3 text-sm font-semibold text-black hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    key={provider.id}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: `${window.location.origin}`,
                      })
                    }
                  >
                    <FcGoogle className="w-6 h-6 absolute left-0 m-1" />
                    Sign in with Google
                  </button>
                ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default SignIn;

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
