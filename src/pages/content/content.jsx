import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function Content() {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // gọi api bằng axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumRes, userRes] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/albums"),
          axios.get("https://jsonplaceholder.typicode.com/users"),
        ]);
        setAlbums(albumRes.data);
        setUsers(userRes.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  const userMap = new Map(users.map((user) => [user.id, user.name]));

  return (
    <div className="mt-16 max-w-[1467]">
      <div className="p-6 bg-[#f5f5f5]">
        <div className="overflow-x-auto">
          {/* tạo bảng */}
          <table className="min-w-full table-auto overflow-hidden rounded-lg">
            <thead className="bg-[#fafafa]">
              <tr className="h-[55px] rounded-xl">
                <th className="p-4 text-sm text-left  min-w-[102px] font-semibold">
                  ID
                </th>
                <th className="p-4 text-sm text-left left-line min-w-[944px] font-semibold">
                  Title
                </th>
                <th className="p-4 text-sm text-left left-line  min-w-[415px] font-semibold">
                  User
                </th>
                <th className="p-4 text-sm text-left left-line  min-w-[195px] font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Load danh sách album */}
              {albums.map((album) => {
                const userName = userMap.get(album.userId) || "Không rõ";
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userName
                )}&background=random&rounded=true`;

                return (
                  <tr
                    key={album.id}
                    className="border-t bg-[#ffffff] h-[65px] hover:bg-[#fafafa] transition duration-300"
                  >
                    <td className="p-4 text-sm text-left">{album.id}</td>
                    <td className="p-4 text-sm text-left">{album.title}</td>
                    <td className="flex items-center gap-2 p-4 text-sm text-left">
                      <img
                        src={avatarUrl}
                        alt={userName}
                        className="w-[30px] h-[30px] rounded-full"
                      />
                      {userName}
                    </td>
                    <td className="p-4 text-sm text-left">
                      <div className="flex items-center justify-center gap-2 w-[72px] h-[24px] px-[7px] py-0 border rounded-md hover:cursor-pointer hover:text-[#4096ff] hover:border-[#4096ff]">
                        <FontAwesomeIcon icon={faEye} />
                        <button
                          className=""
                          onClick={() => navigate(`/showAlbum/${album.id}`)}
                        >
                          Show
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Content;
