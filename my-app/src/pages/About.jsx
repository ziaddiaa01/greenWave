import React from "react";
import FontAwesome from "react-fontawesome";

function About() {
  return (
    <div className="flex flex-col gap-[10px] mx-auto w-[80%] items-center">
      <section className="bg-[#FFFFFF] w-full  rounded-lg mt-8 ">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className=" line-height: 1.625; max-w-lg">
              <h2 className="text-[50px] text-[#1A906B] font-extrabold ">
                About Us
              </h2>
              <h5 className=" text-[25px] font-extrabold ">
                <span className="text-[#FF9B26] text-[30px]">
                  At GreenWave
                </span>{" "}
                we are dedicated to promoting sustainable living and
                environmental conservation.
              </h5>
              <p className="mt-4 text-bold text-gray-600 text-lg">
                Our platform offers a wide range of services and resources to
                empower individuals to make eco-friendly choices and contribute
                to a greener future.
              </p>
              <div className="mt-8"></div>
            </div>
            <div className="mt-12 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
                alt="About Us Image"
                className="object-cover rounded-lg shadow-md"
              ></img>
            </div>
          </div>
        </div>
      </section>

      
      <div className="p-8 text-left w-full">
        <h1 className="text-5xl  leading-relaxed font-bold text-[#232A42] mt-6">
          Caring For Your{" "}
          <span className="text-customGreen">Private Plants </span>, Our
          Expertise
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 text-center w-full mx-auto gap-7 ">
      <div className="p-8 bg-[#ffffff] shadow-lg rounded-xl">
          <div className="bg-green-100  mx-auto rounded-full w-16 h-16 flex justify-center items-center text-green-500 shadow-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
          <h2 className=" mt-6 tracking-wider text-customGreen font-bold mb-3">
            <span className="text-[#232A42]">Our</span> Vision
          </h2>
          <p className="font-light text-sm  text-gray-500 mb-3">
            Our vision at GreenWave is to create a greener and more sustainable
            world by equipping individuals with the knowledge, tools, and
            support they need to make eco-friendly choices
          </p>
        </div>

        <div className="p-8 bg-[#ffffff] shadow-lg rounded-xl">
          <div className="bg-green-100  mx-auto rounded-full w-16 h-16 flex justify-center items-center text-green-500 shadow-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
                className="text-customGreen"
              />
            </svg>
          </div>
          <h2 className=" mt-6 tracking-wider text-customGreen font-bold mb-3">
            <span className="text-[#232A42]">Our</span> Mission
          </h2>
          <p className="font-light text-sm leading-relaxed text-gray-500 mb-3">
            our mission is to empower individuals to embrace sustainable living
            practices and actively contribute to environmental conservation. We
            strive to provide accessible resources and services that promote
            responsible waste management, sustainable agriculture, and urban
            greening.
          </p>
        </div>
      </div>
      <section className="bg-[#ffffff] w-full rounded-lg  mb-5">
        <div className="container w-full  py-16  sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="  line-height: 1.625; max-w-lg">
              <div className="flex">
                <h2 className="text-[30px]  mr-2 p-0 w-fit ">They </h2>
                <span className="text-[30px] w-fit  m-0 p-0 text-customGreen font-extrabold ">
                  Choose Us
                </span>
              </div>
              <p className="mt-4 text-normal leading-relaxed text-gray-600 text-sm">
                We envision a future where communities actively engage in waste
                reduction, sustainable agriculture, and urban greening, leading
                to improved environmental quality and enhanced well-being for
                all. Through our efforts, we aspire to inspire a global movement
                towards sustainable living and environmental conservation.
              </p>
              <ul>
                <li className="flex items-center gap-8">
                  <FontAwesome
                    name="fa-solid fa-check"
                    className="p-2 bg-customGreen text-sm text-white rounded-lg"
                  />
                  <h2 className="m-0 p-0 font-bold leading-relaxed">
                    Expertise
                  </h2>
                </li>
                <li className="flex items-center gap-8">
                  <FontAwesome
                    name="fa-solid fa-check"
                    className="p-2 bg-customGreen text-sm text-white rounded-lg"
                  />
                  <h2 className="m-0 p-0 font-bold leading-relaxed">
                    Timeliness
                  </h2>
                </li>
                <li className="flex items-center gap-8">
                  <FontAwesome
                    name="fa-solid fa-check"
                    className="p-2 bg-customGreen text-sm text-white rounded-lg"
                  />
                  <h2 className="m-0 p-0 leading-relaxed font-bold">
                    Customization
                  </h2>
                </li>
                <li className="flex items-center gap-8">
                  <FontAwesome
                    name="fa-solid fa-check"
                    className="p-2 bg-customGreen text-sm text-white rounded-lg"
                  />
                  <h2 className="m-0 p-0 font-bold leading-relaxed">
                    Quality Workmanship
                  </h2>
                </li>
              </ul>
              <div className="mt-8"></div>
            </div>
            <div className="mt-12 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
                alt="About Us Image"
                className="object-cover rounded-lg shadow-md"
              ></img>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
