import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import LoggedInHeader from "./LoggedInHeader";
import Footer from "./Footer";
import { isLoggedIn } from "../utils";

export default function Layout() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const handleLoginStatusChange = () => {
      setLoggedIn(isLoggedIn());
    };

    window.addEventListener("loginStatusChange", handleLoginStatusChange);

    return () => {
      window.removeEventListener("loginStatusChange", handleLoginStatusChange);
    };
  }, []);

  return (
    <div>
      {loggedIn ? <LoggedInHeader /> : <Header />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
