import { useState } from "react";
import { useNavigation } from "react-router-dom";

function ReportSite() {
  const navigation = useNavigation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Assuming the form submission logic here
    setIsSubmitted(true);
  };

  return (
    <>
      <div className="bg-white relative flex items-center justify-center overflow-hidden z-50">
        <div className="relative mx-auto h-full px-4 pb-20 md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
          <div className="flex flex-col items-center justify-between lg:flex-row py-16">
            <div className="relative">
              <div className="absolute top-0 -left-48 z-0 opacity-50">
                <img
                  src="https://placehold.co/200x100"
                  className="w-36 z-0 h-full object-fill fill-y text-y"
                  alt="decoration"
                />
              </div>
              <div className="lg:max-w-xl lg:pr-5 relative z-40">
                <p className="flex text-sm uppercase text-g1">
                  Report Waste Site
                </p>
                <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug tracking-tight text-g1 sm:text-7xl sm:leading-snug">
                  Help us keep the streets clean
                  <span className="my-1 inline-block border-b-8 border-g4 bg-white  text-customOrange  animate__animated animate__flash">
                    & earn points
                  </span>
                </h2>
                <p className="text-base text-gray-700">
                  Upload photos of street waste and contribute to a cleaner
                  environment. Your efforts will be rewarded with points.
                </p>
                <div className="mt-10 flex flex-col items-center md:flex-row">
                  <a
                    href="/"
                    className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-green-600 px-6 font-medium tracking-wide text-white shadow-md transition hover:bg-blue-800 focus:outline-none md:mr-4 md:mb-0 md:w-auto"
                  >
                    Learn More
                  </a>
                  <a
                    href="/"
                    aria-label=""
                    className="group inline-flex items-center font-semibold text-g1"
                  >
                    How it works
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="my-6 mx-auto h-10 w-10 animate-bounce rounded-full bg-white p-2 lg:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                ></path>
              </svg>
              <div className="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none">
                <img src="https://placehold.co/400x400" alt="report waste" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden text-9xl varien absolute top-6 left-1/4 text-g/10 z-40">
          Report Waste
        </div>
        <div className="absolute -bottom-24 left-10 z-0 opacity-10">
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            className="w-96 z-0 h-full object-fill fill-gray-300 text-gray-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6C12 5.44772 11.5523 5 11 5C10.4477 5 10 5.44772 10 6V16C10 16.5523 10.4477 17 11 17C11.5523 17 12 16.5523 12 16V6ZM9 9C9 8.44772 8.55228 8 8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17C8.55228 17 9 16.5523 9 16V9ZM15 9C15 8.44772 14.5523 8 14 8C13.4477 8 13 8.44772 13 9V16C13 16.5523 13.4477 17 14 17C14.5523 17 15 16.5523 15 16V9ZM18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13V16C16 16.5523 16.4477 17 17 17C17.5523 17 18 16.5523 18 16V13ZM6 15C6 14.4477 5.55228 14 5 14C4.44772 14 4 14.4477 4 15V16C4 16.5523 4.44772 17 5 17C5.55228 17 6 16.5523 6 16V15ZM21 15C21 14.4477 20.5523 14 20 14C19.4477 14 19 14.4477 19 15V16C19 16.5523 19.4477 17 20 17C20.5523 17 21 16.5523 21 16V15ZM4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H21C21.5523 20 22 19.5523 22 19C22 18.4477 21.5523 18 21 18H4Z"
            ></path>
          </svg>
        </div>
        <div className="absolute -bottom-0 left-3/4 z-0 opacity-10">
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 z-0 h-full -rotate-90 object-fill fill-red-300 text-red-300"
          >
            <path d="M32 225h12.993A4.004 4.004 0 0 0 49 220.997V138.01c0-4.976.724-5.04 1.614-.16l12.167 66.708c.397 2.177 2.516 3.942 4.713 3.942h8.512a3.937 3.937 0 0 0 3.947-4S79 127.5 80 129s14.488 52.67 14.488 52.67c.559 2.115 2.8 3.83 5.008 3.83h8.008a3.993 3.993 0 0 0 3.996-3.995v-43.506c0-4.97 1.82-5.412 4.079-.965l10.608 20.895c1.001 1.972 3.604 3.571 5.806 3.571h9.514a3.999 3.999 0 0 0 3.993-4.001v-19.49c0-2.033 1.6-2.75 3.096-1.578a437.102 437.102 0 0 0 14.17 10.806c4.295 2.92 12.065 5.384 17.308 5.384H224c8 0 8-11 8-11V112c0-8-8-8-8-8h-63.56c-6.3 0-15.573 2.532-20.58 5.433a432.576 432.576 0 0 0-14.286 9.157c-1.459 1.057-2.578.24-2.578-1.632V60.003A4.004 4.004 0 0 0 138.997 56h-13.99A4.004 4.004 0 0 0 121 60.003v75.957c0 4.97-1.82 5.412-4.079.965l-10.608-20.895c-1.001-1.972-3.604-3.571-5.806-3.571h-9.514a3.999 3.999 0 0 0-3.993 4.001v43.506c0 4.973-.723 5.04-1.613.16L73.22 92.418c-.396-2.177-2.515-3.942-4.713-3.942h-8.512a3.937 3.937 0 0 0-3.947 4v95.532c0 4.975-.723 5.04-1.613.16L41.22 125.418c-.396-2.177-2.515-3.942-4.713-3.942h-8.512a3.937 3.937 0 0 0-3.947 4V220.997A4.004 4.004 0 0 0 19.007 225H32Z"></path>
          </svg>
        </div>
      </div>
      <div className="relative bg-white px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        {isSubmitted ? (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-green-600">Thank you!</h2>
            <p className="mt-2 text-gray-700">
              Your photo has been submitted successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label className="mb-4 text-lg font-medium text-gray-700">
              Upload Photo
              <input type="file" className="block w-full mt-2" />
            </label>
            <button
              type="submit"
              className="text-white   bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting"
                ? "Uploading ..."
                : "Report site"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default ReportSite;
