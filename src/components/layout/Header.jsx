import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header text-xl flex justify-center items-center py-10 text-white bg-slate-900 shadow-md gap-x-5 mb-10">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
