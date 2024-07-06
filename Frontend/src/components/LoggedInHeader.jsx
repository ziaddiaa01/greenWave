import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import myImage from "../images/logo2.png";
import "flowbite";
import { getUserData , logout } from "../api"; // Adjust the path according to your file structure

function LoggedInHeader() {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const userId = localStorage.getItem("accessToken"); // Assuming you store the user ID in local storage
    if (userId) {
      const data = await getUserData(userId);
      setUserData(data);
    }
  };

  if (!userData) {
    fetchUserData();
  }

  const activeStyles = {
    fontWeight: "bold",
    color: "#00B207",
  };

  async function handleLogOut() {
    try {
      const response = await logout();
  
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userID");
        window.dispatchEvent(new Event("loginStatusChange"));
        console.log("Logged out successfully");
      } else {
        console.error('Logout failed:', response.statusText);
        // Handle error scenarios (e.g., displaying error message to user)
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
      // Handle network errors or other exceptions
    }
  }
  
    

  return (
    <nav className="bg-white border-gray-200 dark:bg-[#333333] dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={myImage} className="h-8" alt="Green Wave Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Green Wave
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#333333] md:dark:bg-[#333333] dark:border-gray-700">
            <li>
              <NavLink
                end
                style={({ isActive }) => (isActive ? activeStyles : null)}
                to="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 dark:text-white md:dark:hover:text-customGreen dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyles : null)}
                to="/products"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 dark:text-white md:dark:hover:text-customGreen dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Shop
              </NavLink>
            </li>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 md:w-auto dark:text-white md:dark:hover:text-customGreen dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Services
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 text-center dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <NavLink
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                      to="/waste"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 dark:text-white md:dark:hover:text-customGreen dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Waste Collection
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                      to="/gardening"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 dark:text-white md:dark:hover:text-customGreen dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Greening Service
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <button
                id="educationDropdownLink"
                data-dropdown-toggle="educationDropdown"
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 md:w-auto dark:text-white md:dark:hover:text-customGreen dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Education
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="educationDropdown"
                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 text-center dark:text-gray-400"
                  aria-labelledby="educationDropdownLink"
                >
                  <li>
                    <NavLink
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                      to="/courses"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 dark:text-white md:dark:hover:text-customGreen dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Courses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                      to="/books"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 dark:text-white md:dark:hover:text-customGreen dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Books
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                      to="/articles"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 dark:text-white md:dark:hover:text-customGreen dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Articles
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyles : null)}
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 dark:text-white md:dark:hover:text-customGreen dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyles : null)}
                to="/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customGreen md:p-0 dark:text-white md:dark:hover:text-customGreen dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </NavLink>
            </li>
            {userData && (
              <li className="flex items-center gap-2">
                <div className="text-gray-900 font-bold flex dark:text-white">
                  <h3>
                  {userData.points}
                  </h3>
                   
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="yellow"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>
                </div>
                <Link
                  to="/settings"
                  className="text-white bg-green-700 hover:bg-white hover:text-green-700 font-medium rounded-full text-sm px-5 py-2.5 m-0 text-center dark:bg-green-700 dark:hover:bg-white dark:focus:ring-green-700"
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogOut}
                  type="button"
                  className="text-white hover:text-grey font-medium text-sm"
                >
                  <svg className="h-8 w-8 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LoggedInHeader;
