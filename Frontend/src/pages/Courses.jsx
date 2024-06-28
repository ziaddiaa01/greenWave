import React from "react";
import { useLoaderData, Await, defer, Link } from "react-router-dom";
import { getCourses } from "../api";
import imageUrl from "../images/courses.png";
import FontAwesome from "react-fontawesome";
import defaultImage from "../images/course-1.jpg";

export function loader() {
  return defer({ courses: getCourses() });
}

function Courses() {
  const dataPromise = useLoaderData();

  function renderCourses(courses) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 my-8 lg:grid-cols-3 md:grid-cols-3 gap-4">
        {courses.map((course) => {
          const parts = defaultImage.split("-");
          parts[parts.length - 1] = `${course.id}.jpg`;
          const imageUrl = parts.join("-");
          return (
            <Link
              to={`${course.id}`}
              key={course.id}
              className=" cursor-pointer h-fit transition duration-200 ease-in-out transform hover:scale-105   relative bg-white shadow-md rounded-lg pb-5 mb-4"
            >
              <img
                className="h-[50%] w-full rounded-tl-lg rounded-tr-lg"
                src={imageUrl}
                alt="Course Cover"
              />
              <div className=" px-2 flex items-center justify-between mb-1 mt-2">
                <span className="text-sm  text-gray-600">{course.level}</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 ">&#9733;</span>
                  <span className="text-gray-600 ">{course.rating}</span>
                </div>
              </div>
              <h3 className="text-md font-semibold px-2 text-gray-800 mb-1 truncate ">
                {course.name}
              </h3>
              <div className="text-md font-semibold px-2 w-full border-b border-dashed border-customGrey text-[#FF7426] pb-2">
                {course.price} EGP
              </div>
              <div className="flex items-center px-2 gap-1 justify-evenly mt-2 ">
                <span className="text-xs  text-gray-600 ">
                {course.hours}
                  <FontAwesome
                    className="text-[#999999] ml-2"
                    name="fa-solid fa-hourglass-start "
                  />
                  
                </span>
                <span className="text-xs  text-gray-600 ">
                {course.lectures}
                <FontAwesome
                    className="text-[#999999] ml-2 "
                    name="fa-solid fa-play "
                  />
                </span>
                <span className="text-xs text-gray-600">
                {course.sales}
                <FontAwesome
                    className="text-[#999999] ml-2"
                    name="fa-solid fa-download "
                  />
                </span>
              </div>
              <div className="flex justify-center mt-4">
                <button className=" rounded-full  px-4 py-2 bg-[#FF7426] text-white  transition duration-200 ease-in-out transform hover:scale-105">
                  Enroll Now
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <main className="w-3/4 m-auto flex flex-col items-center justify-center">
      <img src={imageUrl} alt="Courses"></img>
      <div className="w-full flex justify-center flex-wrap items-center  gap-11 px-5 py-8 rounded-lg mt-5 mb-5 bg-black">
        <div className="flex gap-3  items-center">
          <FontAwesome
            className="text-[#f24255] bg-[#cbe0ff]  p-3 rounded-md"
            name="fa-solid fa-book"
          />
          <div>
            <h3 className="text-white text-xs font-semibold">Latest Skills</h3>
            <p className="text-[#FFFFFF] opacity-[60%] font-light text-xs leading-relaxed">
              Unlock a lot of new possibilities .
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <FontAwesome
            className="text-[#f24255] bg-[#cbe0ff] p-3 rounded-md"
            name="fa-solid fa-briefcase"
          />
          <div>
            <h3 className="text-white text-xs font-semibold">
              Ready For a Career
            </h3>
            <p className="text-[#FFFFFF] opacity-[60%] font-light text-xs leading-relaxed">
              Propel your professional journey.
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <FontAwesome
            className="text-[#f24255] bg-[#cbe0ff] p-3 rounded-md"
            name="fa-solid fa-graduation-cap"
          />
          <div>
            <h3 className="text-white text-xs font-semibold">
              Earn a Certificate
            </h3>
            <p className="text-[#FFFFFF] opacity-[60%] font-light text-xs leading-relaxed">
              Validate your accomplishments.
            </p>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold">Our courses</h3>
      <React.Suspense fallback={<h2>Loading Courses...</h2>}>
        <Await resolve={dataPromise.courses}>{renderCourses}</Await>
      </React.Suspense>
    </main>
  );
}

export default Courses;
