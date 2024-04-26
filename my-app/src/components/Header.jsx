import  { useState , useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import myImage from "../images/logo.png";

const activeStyles = {
  fontWeight: "bold",
  color: "#00B207",
};

export default function Header() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [educationDropdownOpen, setEducationDropdownOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownOpen && !document.getElementById('services').contains(event.target)) {
        setServicesDropdownOpen(false);
      }
      if (educationDropdownOpen && !document.getElementById('education').contains(event.target)) {
        setEducationDropdownOpen(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesDropdownOpen, educationDropdownOpen]); // Re-run the effect when these state variables change
  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
    setEducationDropdownOpen(false); // Close education dropdown when services dropdown opens
  };
  const toggleEducationDropdown = () => {
    setEducationDropdownOpen(!educationDropdownOpen);
    setServicesDropdownOpen(false); 
  };
  const handleDropdownItemClick = (e) => {
    e.stopPropagation();
  };
  return (
    <header>
      <div className="mainHeader">
        <div className="site-logo">
          <img src={myImage} alt="Logo" />
          <h3>GreenWave</h3>
        </div>
        <div className="login-register-link">
          <Link to="/login" className="login-link">
            Sign In
          </Link>
          <span>/</span>
          <Link to="/signup" className="register-link">
            Sign Up
          </Link>
        </div>
      </div>
      <nav>
        <NavLink
          to="/"
          end
          style={({ isActive }) => (isActive ? activeStyles : null)}
          className="nav-item"
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          style={({ isActive }) => (isActive ? activeStyles : null)}
          className="nav-item"
        >
          Shop
        </NavLink>
        <h2 className={`${servicesDropdownOpen ? 'nav-item expanded' : 'nav-item'}`} id="services" onClick={toggleServicesDropdown}>
          Services
          {servicesDropdownOpen && (
            <ul className="drop-menu">
              <li onClick={handleDropdownItemClick}>
                <NavLink
                  to="/Waste"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                  className="drop-item"
                >
                  Waste collection service
                </NavLink>
              </li>
              <li onClick={handleDropdownItemClick}>
                <NavLink
                  to="/Greening"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                  className="drop-item"
                >
                  Greening services
                </NavLink>
              </li>
            </ul>
          )}
        </h2>
        <h2 className={`${educationDropdownOpen ? 'nav-item expanded' : 'nav-item'}`} id="education" onClick={toggleEducationDropdown}>
          Education
          {educationDropdownOpen && (
            <ul className="drop-menu">
              <li onClick={handleDropdownItemClick}>
                <NavLink
                  to="/courses"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                  className="drop-item"
                >
                  Courses
                </NavLink>
              </li>
              <li onClick={handleDropdownItemClick}>
                <NavLink
                  to="/books"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                  className="drop-item"
                >
                  Books
                </NavLink>
              </li>
              <li onClick={handleDropdownItemClick}>
                <NavLink
                  to="/articles"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                  className="drop-item"
                >
                  Articles
                </NavLink>
              </li>
            </ul>
          )}
        </h2>
        <NavLink
          to="/contact"
          activeClassName="active"
          style={({ isActive }) => (isActive ? activeStyles : null)}
          className="nav-item"
        >
          Contact
        </NavLink>
        <NavLink
          to="/about"
          activeClassName="active"
          style={({ isActive }) => (isActive ? activeStyles : null)}
          className="nav-item"
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
