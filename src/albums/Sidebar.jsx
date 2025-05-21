import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/logo-geekup.svg";
import { faImages, faIdCard } from "@fortawesome/free-solid-svg-icons";

function Album() {
  const navigate = useNavigate();
  const location = useLocation();

  const isUserPage = location.pathname === "/user";
  const isAlbumPage = location.pathname === "/content";

  return (
    <div>
      <div className="min-h-screen">
        {/* logo */}
        <div className="pl-4">
          <img className="w-[100px] h-[64px] " src={logo} alt="logo" />
        </div>
        {/* List menu */}
        <div className="pt-2">
          {/* Button Album*/}
          <div
            className={`flex gap-3 items-center h-[40px] w-[191] mx-1 py-[12px] px-6 text-sm transition duration-300 hover:bg-[#f0f0f0] rounded-md cursor-pointer ${
              isAlbumPage ? "bg-[#e6f4ff] text-[#1677ff]" : ""
            }`}
          >
            <FontAwesomeIcon icon={faImages} />
            <button className="" onClick={() => navigate("/content")}>
              Albums
            </button>
          </div>
          {/* Button User */}
          <div
            className={`flex gap-3 items-center h-[40px] mx-1 mt-1 py-[12px] px-6 text-sm hover:bg-[#f0f0f0] transition duration-300 rounded-md cursor-pointer ${
              isUserPage ? "bg-[#e6f4ff] text-[#1677ff]" : ""
            }`}
          >
            <FontAwesomeIcon icon={faIdCard} />
            <button className="" onClick={() => navigate("/user")}>
              Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Album;
