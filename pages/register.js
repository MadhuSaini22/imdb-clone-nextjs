import React, { useRef, useState } from "react";
import { useAuth } from "../src/contexts/AuthUserProvider";
import { useRouter } from "next/router";

function Register() {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();
const currentUser="simran"
  const onSubmit = (event) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          console.log("Success. The user is created in Firebase");
          router.push("/signIn");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message);
        });
    else setError("Password do not match");
    event.preventDefault();
  };

  return (
    <div>
      <div className="downContainerMain bg-white">
        <div className="max-w-container m-auto bg-white">
          <div className=" w-full justify-items-center  font-sans p-2">
            <div className=" mb-5  mt-2 grid  justify-center ">
              <img
                className=" h-14"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                alt="img"
              />
            </div>
            {/* <p className="text-black"> hello {error}</p> */}
            {console.log(JSON.stringify(error))}
            {error && alert(JSON.stringify(error))}
            {/* {error && <alert>{error}} */}
            <div className="max-w-sm border rounded px-7 m-5 py-6 border-slate-200 !text-slate-800 mx-auto">
              <form onSubmit={onSubmit}>
                <div className="rounded  mb-2">
                  <h2 className="text-3xl font-normal">Create account</h2>
                  {currentUser && currentUser.email}
                </div>

                <div className="rounded  mb-3  mt-1">
                  <label className=" font-bold text-sm">Email</label>
                  <input
                    className="w-full text-slate-600 text-sm py-1 focus:border-orange-600 focus:shadow-input-focus px-2 border border-gray-400 rounded outline-none "
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="signUpEmail"
                    type="email"
                    required
                  />
                </div>

                <div className="rounded  mb-3  mt-1">
                  <label className=" font-bold text-sm">Password</label>
                  <input
                    className="w-full text-slate-600 text-sm py-1 focus:border-orange-600 focus:shadow-input-focus px-2 border border-gray-400 rounded outline-none "
                    placeholder="at least 8 characters"
                    
                    type="password"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={(event) => setPasswordOne(event.target.value)}
                    id="signUpPassword"
                    required
                  />
                  <p className="text-sm ">
                    Passwords must be at least 8 characters.
                  </p>
                </div>
                <div className="rounded  mb-3  mt-1">
                  <label className=" font-bold text-sm">
                    Re-enter password
                  </label>
                  <input
                    className="w-full text-slate-600 text-sm py-1 focus:border-orange-600 focus:shadow-input-focus px-2 border border-gray-400 rounded outline-none "
                    name="password"
                    value={passwordTwo}
                    onChange={(event) => setPasswordTwo(event.target.value)}
                    id="signUpPassword2"
                    type="password"
                    
                    required
                  />
                </div>

                <div className=" mt-1 ">
                  <button
                    className={`bg-yellowLight  border-gray-400 text-sm w-full rounded border outline-none cursor-pointer h-8 text-slate-900`}
                    type="submit"
                    
                  >
                    Create your IMDb account
                  </button>
                </div>
              </form>

              <div className="rounded grid mb-1  mt-10 ">
                <label className="text-sm ">
                  Already have an account?
                  <p className="cursor-pointer hover:underline hover:decoration-amber-700 text-dark-forgot hover:text-amber-700">
                    Sign-In
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="h-screen w-full bg-transparent content-none bg-gradient-to-b from-neutral-50  border-t-2 shadow-md">
          <div className="max-w-sm rounded px-7 m-5 py-6 mx-auto">
            <div className="flex justify-center">
              <a
                className="text-dark-forgot text-xs mr-3"
                target="_blank"
                rel="noopener noreferrer"
                href="https://help.imdb.com/article/imdb/general-information/why-should-i-register-on-imdb/GHB62T7USTMYMCDC?ref_=cons_ap_ftr_help"
              >
                Help
              </a>
              <span className="auth-footer-seperator"></span>

              <a
                className=" text-xs text-dark-forgot mr-3"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.imdb.com/help/show_article?conditions"
              >
                Conditions of Use
              </a>
              <span className="auth-footer-seperator"></span>

              <a
                className=" text-dark-forgot text-xs mr-3"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.imdb.com/privacy"
              >
                Privacy Notice
              </a>
              <span className="auth-footer-seperator"></span>
            </div>
            <div className="flex justify-center mt-3 ">
              <p className="text-slate-500 text-xs mr-3">
                © 1996-2022, Amazon.com, Inc. or its affiliates
              </p>
              <span className="auth-footer-seperator"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;



// public class ENACTON{
//     public static void main(String[] args){
//         ENACTON coder= new ENACTON();
//         coder.reliability=100;
//         System.out.println("Where reliability matters");
//         return reliability;
//     }
// }