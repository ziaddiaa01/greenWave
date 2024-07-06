import { useState } from "react";
import FontAwesome from "react-fontawesome";
import { useNavigation, Form, useActionData , Link} from "react-router-dom";
import { isLoggedIn } from "../utils";

import {
  getAvailableGardeningAppointments,
  setGardeningAppointment,
} from "../api";

export function loader() {
  return "dd";
}
export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const greeningType = formData.get("serviceType");
  const appointment = formData.get("appointment");

  const reqObj = new Request(window.location.href);
  const pathname = new URL(reqObj.url).pathname;
  const response = isLoggedIn();

  if (response == false) {
    window.location.href = `/login?message=You must log in first.&redirectTo=${pathname}`;
  } else {
    try {
      if (!appointment) {
        throw new Error("Selected appointment not found");
      }

      // Parse the appointment JSON string
      const appointmentObj = JSON.parse(appointment);
      const userID = localStorage.getItem("userID");
      const response = await setGardeningAppointment({
        userId: userID,
        name,
        phone,
        address,
        greeningType,
        date: appointmentObj.day,
        time: appointmentObj.time,
      });

      return JSON.stringify(response.message);
    } catch (err) {
      return err.message;
    }
  }
}

function Gardening() {
  const [selectedService, setSelectedService] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const errorMessage = useActionData();
  const navigation = useNavigation();
  const handleServiceSelection = (serviceType) => {
    setSelectedService(serviceType);

    // Fetch available appointments based on selected service type
    const appointments = getAvailableGardeningAppointments(serviceType);
    setFilteredAppointments(appointments);
    setSelectedAppointment(""); // Reset selected appointment
  };

  const handleAppointmentSelection = (event) => {
    setSelectedAppointment(event.target.value);
  };
  let errorMessageColor = "";
  if (errorMessage && errorMessage.toLowerCase().includes("error")) {
    errorMessageColor = "text-red-500"; 
  } else if (errorMessage) {
    errorMessageColor = "text-green-500"; 
  }
  return (
    <main className="">
      <div className="w-full text-center lg:text-left md:text-left py-4 px-[40px] bg-banner1 bg-cover bg-no-repeat">
        <h2 className="text-white text-[35px]  lg:text-[50px] md:text-[50px]">
          Our Gardening <span className="text-customOrange">Services</span>
        </h2>
        <div className="flex gap-5 flex-wrap w-[70%] mx-auto md:mx-0 lg:mx-0 ">
          <div className="bg-[#2DA884] flex flex-col text-left p-5 rounded-md lg:w-[40%] md:w-[40%] sm:w-full ">
            <FontAwesome
              name="fa-solid fa-home"
              className="text-2xl text-[#FFFFFF]"
            />
            <h3 className=" text-[#FFFFFF] font-bold w-fit my-1">
              Roof Gardening
            </h3>
            <p className=" text-[#ffffff] text-[9px] font-normal  w-fit">
              Transform your unused rooftop into a lush and vibrant oasis. Our
              expert team specializes in creating sustainable and aesthetically
              pleasing rooftop gardens tailored to your needs.
            </p>
          </div>

          <div className="bg-[#FFFFFF] flex flex-col text-left p-5 rounded-md lg:w-[40%] md:w-[40%] sm:w-full">
            <FontAwesome
              name="fa-solid fa-leaf"
              className="text-2xl text-[#2DA884]"
            />
            <h3 className="font-bold w-fit my-1">Home Gardening</h3>
            <p className=" text-[#525252] text-[9px] font-normal  w-fit">
              Create your own slice of paradise . Whether you have a sprawling
              backyard, a cozy balcony, or just a sunny windowsill, our expert
              team is here to turn your living space into a vibrant oasis.
            </p>
          </div>

          <div className="bg-[#FFFFFF] flex flex-col text-left p-5 rounded-md lg:w-[40%] md:w-[40%] sm:w-full">
            <FontAwesome
              name="fa-solid fa-pencil"
              className="text-2xl text-[#2DA884]"
            />

            <h3 className="  font-bold w-fit my-1">
              Garden <span className="text-[#2DA884]">Design</span>
            </h3>
            <p className=" text-[#525252] text-[9px] font-normal  w-fit">
              Unlock the full potential of your outdoor space . Our passionate
              and creative team of landscape designers is dedicated to
              transforming your vision into a breathtaking reality, creating
              gardens that are not just landscapes but personalized works of
              art.
            </p>
          </div>

          <div className="bg-[#FFFFFF] flex flex-col text-left p-5 rounded-md lg:w-[40%] md:w-[40%] sm:w-full ">
            <FontAwesome
              name="fa-solid fa-phone"
              className="text-2xl text-[#2DA884]"
            />
            <h3 className="  font-bold w-fit my-1">
              Free <span className="text-[#2DA884]">Consultations</span>
            </h3>
            <p className=" text-[#525252] text-[9px] font-normal  w-fit">
              Embark on your garden design journey with ease through our
              innovative Free Consultations with Chat Bot service at GreenWave .
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-[#2DA884] sm:w-12 sm:h-12">
              <svg
                className="h-8 w-8"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="12" cy="12" r="9" />{" "}
                <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1 -1.8 -1" />{" "}
                <path d="M12 6v2m0 8v2" />
              </svg>
            </div>
            <h6 className="text-4xl font-bold text-deep-purple-accent-400">
              63%
            </h6>
            <p className="mb-2 font-bold text-md">Online sales</p>
            <p className="text-gray-700 text-xs">
              Online sales of gardening products increased by 63% in 2020,
              reflecting a growing interest in home gardening (Statista)
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-[#2DA884] sm:w-12 sm:h-12">
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h6 className="text-4xl font-bold text-deep-purple-accent-400">
              30%
            </h6>
            <p className="mb-2 font-bold text-md">Lower heart stroke risk</p>
            <p className="text-gray-700 text-xs">
              Gardening can reduce the risk of heart attack and stroke by 30% in
              people over 60 (Harvard Health Publishing)
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-[#2DA884] sm:w-12 sm:h-12">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h6 className="text-4xl font-bold ">87%</h6>
            <p className="mb-2 font-bold text-md">Better mental health</p>
            <p className="text-gray-700 text-xs">
              Spending time in a garden can lower stress and improve mood, with
              87% of people experiencing mental health benefits from gardening
              (Mental Health Foundation)
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-[#2DA884] sm:w-12 sm:h-12">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="text-4xl font-bold text-deep-purple-accent-400">
              300{" "}
            </h6>
            <p className="mb-2 font-bold text-md">Calories burnt</p>
            <p className="text-gray-700 text-xs">
              Gardening can burn up to 300 calories per hour, making it an
              effective form of moderate exercise (Centers for Disease Control
              and Prevention)
            </p>
          </div>
        </div>
      </div>
      <div className="bg-banner2 bg-cover bg-no-repeat">
        <section className="w-fit mx-auto">
          <div className="py-8 px-4  mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
            <div className="space-y-8 rounded-md lg:grid lg:grid-cols-4 sm:grid-cols-1 sm:gap-3 xl:gap-5 lg:space-y-0  ">
              {/* Pricing Card */}
              <div className="flex flex-col h-fit  mx-auto max-w-lg text-center bg-white rounded-md">
                <div className="flex justify-between items-center p-3 bg-[#2DA884] rounded-t-md mb-2">
                  <h5 className="mb-4 text-white font-semibold">Free plan</h5>
                  <h5 className="mb-4  font-semibold bg-white text-[#2DA884] p-3 rounded-3xl">
                    chat Bot
                  </h5>
                </div>
                <div className="flex flex-col gap-1 justify-center items-center my-2 pb-5 border-b-2 border-b-[#2DA884]">
                  <span className="mr-2 text-4xl text-[#2DA884] font-extrabold">
                    0 EGP
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /Per month
                  </span>
                </div>

                {/* List */}
                <ul role="list" className="mb-3 text-center px-7">
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">For free</span>
                  </li>

                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Immediate answers
                    </span>
                  </li>

                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">Efficiency</span>
                  </li>
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Accessibility
                    </span>
                  </li>
                  <Link to={"/chatbot"} className="text-white bg-[#2DA884] border border-white hover:bg-white hover:text-[#2DA884] hover:border hover:border-[#2DA884]  font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">
                    Chat With AI
                  </Link>
                </ul>
              </div>

              <div className="flex flex-col h-fit mx-auto max-w-lg text-center bg-white rounded-md">
                <div className="flex justify-between items-center p-3 bg-[#2DA884] rounded-t-md mb-2">
                  <h5 className="mb-4 text-white font-semibold">
                    Home Gardening
                  </h5>
                  <h5 className="mb-4  font-semibold bg-white text-[#2DA884] p-3 rounded-3xl">
                    Package
                  </h5>
                </div>
                <div className="flex flex-col gap-1 justify-center items-center my-2 pb-5 border-b-2 border-b-[#2DA884]">
                  <span className="mr-2 text-4xl text-[#2DA884] font-extrabold">
                    100 EGP
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /Per month
                  </span>
                </div>

                {/* List */}
                <ul role="list" className="mb-3  text-center px-7">
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Efficient Installation
                    </span>
                  </li>

                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">Labor Costs</span>
                  </li>

                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Materials and Plants
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Stress-Free Maintenance
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">Time Saving</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col h-fit mx-auto max-w-lg text-center bg-white rounded-md">
                <div className="flex justify-between items-center p-3 bg-[#2DA884] rounded-t-md mb-2">
                  <h5 className="mb-4 text-white font-semibold">
                    Roof Gardening
                  </h5>
                  <h5 className="mb-4  font-semibold bg-white text-[#2DA884] p-3 rounded-3xl">
                    Package
                  </h5>
                </div>
                <div className="flex flex-col gap-1 justify-center items-center my-2 pb-5 border-b-2 border-b-[#2DA884]">
                  <span className="mr-2 text-4xl text-[#2DA884] font-extrabold">
                    120 EGP
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /Per month
                  </span>
                </div>

                {/* List */}
                <ul role="list" className="mb-3  text-center px-7">
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Efficient Installation
                    </span>
                  </li>

                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">Labor Costs</span>
                  </li>

                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Materials and Plants
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Stress-Free Maintenance
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">Time Saving</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col mx-auto max-w-lg text-center bg-white rounded-md">
                <div className="flex justify-between items-center p-3 bg-[#2DA884] rounded-t-md mb-2">
                  <h5 className="mb-4 text-white font-semibold">
                    Garden Design
                  </h5>
                  <h5 className="mb-4  font-semibold bg-white text-[#2DA884] p-3 rounded-3xl">
                    Package
                  </h5>
                </div>
                <div className="flex flex-col gap-1 justify-center items-center my-2 pb-5 border-b-2 border-b-[#2DA884]">
                  <span className="mr-2 text-4xl text-[#2DA884] font-extrabold">
                    300 EGP
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /Per month
                  </span>
                </div>

                {/* List */}
                <ul role="list" className="mb-3  text-center px-7">
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Aesthetic Harmony
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">Labor Costs</span>
                  </li>

                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Materials and Plants
                    </span>
                  </li>

                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Project Management
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Guidance for Maintenance
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 border-b p-3 border-b-[#2DA884]">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-4 h-4 rounded-full border border-[#2DA884] text-[#2DA884] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[#2DA884] text-xs">
                      Expertise in Plant Selection
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <Form
          method="post"
          className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8"
        >
          <div className="rounded-lg bg-white p-8 shadow-lg lg:p-12">
            <h3 className="text-center font-bold text-2xl">
              Choose your plan and get appointment
            </h3>
            {errorMessage && <h3 className={`${errorMessageColor} font-bold text-center mt-1`}>{errorMessage.replace(/"/g, '')}</h3>}

            <div className="m-4">
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                className="w-full  outline-none border-b  border-b-black p-3 text-sm"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="m-4">
              <label className="sr-only" htmlFor="phone">
                Phone
              </label>
              <input
                className="w-full  outline-none border-b  border-b-black p-3 text-sm"
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone Number"
              />
            </div>
            <div className="m-4">
              <label className="sr-only" htmlFor="address">
                Address
              </label>
              <input
                className="w-full  outline-none border-b  border-b-black p-3 text-sm"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
              />
            </div>
            <h3 className="mt-8">Choose Your plan :</h3>
            <div className="flex flex-col lg:flex-row md:flex-row  justify-around my-4">
              <input
                type="button"
                className={`rounded-lg border-gray-200 p-3 text-sm cursor-pointer ${
                  selectedService === "Home"
                    ? "bg-[#2DA884] text-white"
                    : "bg-white border"
                }`}
                value="Home Gardening"
                onClick={() => handleServiceSelection("Home")}
              />
              <input
                type="button"
                className={`rounded-lg border-gray-200 p-3 text-sm cursor-pointer ${
                  selectedService === "Roof"
                    ? "bg-[#2DA884] text-white"
                    : "bg-white border"
                }`}
                value="Roof Gardening"
                onClick={() => handleServiceSelection("Roof")}
              />
              <input
                type="button"
                className={`rounded-lg border-gray-200 p-3 text-sm cursor-pointer ${
                  selectedService === "Garden"
                    ? "bg-[#2DA884] text-white"
                    : "bg-white border"
                }`}
                value="Garden Design"
                onClick={() => handleServiceSelection("Garden")}
              />
            </div>

            <input
              type="hidden"
              id="serviceType"
              name="serviceType"
              value={selectedService}
            />

            {selectedService && (
              <div className="my-4">
                <h2>Available Appointments for {selectedService}:</h2>
                {filteredAppointments.length > 0 ? (
                  <div className="m-4">
                    <select
                      name="appointment"
                      value={selectedAppointment}
                      onChange={handleAppointmentSelection}
                      className="   p-3 text-sm outline-none"
                    >
                      <option value="" disabled>
                        Select Appointment
                      </option>
                      {filteredAppointments.map((appointment) => (
                        <option
                          required
                          key={appointment.id}
                          value={JSON.stringify({
                            day: appointment.day,
                            time: appointment.time,
                          })}
                        >
                          {appointment.day} at {appointment.time}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="m-4">
                    No available appointments for {selectedService} services.
                  </p>
                )}
              </div>
            )}

            <div className="mt-4">
              <button
                type="submit"
                disabled={navigation.state === "submitting"}
                className="bg-[#2DA884] block text-white w-fit mx-auto my-8  text-sm font-bold p-4 rounded-md transition-colors duration-300 hover:bg-white hover:text-[#2DA884] border border-[#2DA884]"
              >
                {navigation.state === "submitting"
                  ? "processing..."
                  : "Complete the process"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </main>
  );
}

export default Gardening;
