import { useLoaderData, Link } from "react-router-dom";
import { getCourse } from "../api";
import { isLoggedIn } from "../utils";
import FontAwesome from "react-fontawesome";


import defaultImage from "../images/course-1.jpg";

export function loader({ params }) {
  const id = Number(params.id);
  const course = getCourse(id);
  return course;
}

export default function BookDetail() {
  const course = useLoaderData();
  const parts = defaultImage.split("-");
  parts[parts.length - 1] = `${course.id}.jpg`;
  const imageUrl = parts.join("-");

  function handleCartClick() {
    const request = new Request(window.location.href);
    const pathname = new URL(request.url).pathname;
    const response = isLoggedIn();
    console.log(response);
    if (!response) {
      window.location.href = `/login?message=You must log in first.&redirectTo=${pathname}`;
    }
  }

  return (
    <div className="w-3/4 mx-auto mt-10 mb-10 flex-col flex items-center">
      <h3 className="font-bold text-left w-full text-4xl mb-10">{course.name}</h3>
      <video
        poster={imageUrl}
        className="w-full  h-auto mb-10 max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
        controls
      >
        <source src="../videos/flowbite.mp4" type="video/mp4"></source>
        Your browser does not support the video tag.
      </video>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 mb-5 gap-5">
        {course.parts.map((part) => (
          <div key={part.number} className="bg-white p-8 shadow-md rounded-md ">
            <h2 className="text-4xl font-extrabold mb-8 text-right">
              {part.number < 10 ? "0" + part.number : part.number}
            </h2>
            <h2 className="text-xl font-semibold mb-2">{part.title}</h2>
            <div className="flec flex-col ">
              {part.lessons.map((lesson) => (
                <div className="flex justify-between p-5 border rounded-lg border-[#F1F1F3] mb-5" key={lesson.id}>
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{lesson.name}</h3>
                    <h3 className="text-sm text-[#59595A]">Lesson {lesson.id < 10 ? "0" + lesson.id : lesson.id}</h3>
                  </div>
                  <div className="bg-[#F1F1F3] text-sm text-[#59595A] rounded-lg flex px-3 py-2 items-center h-fit gap-2">
                    <FontAwesome name="fa-solid fa-hourglass-half" className="text-sm text-[#59595A]"  />
                    {lesson.duration_minutes} {" "}
                     Minutes
                     </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>                

      <button
            onClick={() => handleCartClick()}
            className=" rounded-full w-fit px-4 py-2 bg-[#FF7426] text-white  transition duration-200 ease-in-out transform hover:scale-105"            type="button"
          >
            Join Course
          </button>
    </div>
  );
}
