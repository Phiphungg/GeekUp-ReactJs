import React from "react";
import Sidebar from "./albums/Sidebar";
import User from "./Users/User";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ShowAlbum from "./pages/content/ShowAlbum";
import ShowUser from "./pages/content/ShowUser";
import Content from "./pages/content/Content";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <div className="w-[200px]">
          <Sidebar />
        </div>

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/content" replace />} />
            <Route path="/user" element={<User />} />
            <Route path="/content" element={<Content />} />
            <Route path="/showAlbum/:albumId" element={<ShowAlbum />} />
            <Route path="/showUser/:userId" element={<ShowUser />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
