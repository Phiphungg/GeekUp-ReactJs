import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faImages,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ShowUser() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { userId } = useParams(); // Lấy userId từ URL

  // gọi api
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userRes, albumRes] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/users"),
          axios.get("https://jsonplaceholder.typicode.com/albums"),
        ]);

        setUsers(userRes.data);
        setAlbums(albumRes.data);
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // thông báo khi đang gọi api
  if (loading) return <p>Loading...</p>;

  // điều kiện để lọc user từ 2 link api
  const user = users.find((u) => u.id === parseInt(userId));
  if (!user) return <p>Không tìm thấy user</p>;

  // Lấy danh sách album của user
  const albumList = albums.filter((album) => album.userId === user.id);

  return (
    <div className="mt-16">
      <div className="p-6 bg-[#f5f5f5]">
        <div>
          <div className="flex items-center gap-1 h-[22px]">
            <FontAwesomeIcon icon={faImages} className="h-4 w-4" />
            <p className="text-sm text-[#00000073]">Users&nbsp; /&nbsp; Show</p>
          </div>
        </div>

        <div className="flex items-center gap-6 h-10">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="h-4 w-4 px-1 hover:cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <p className="text-[20px] font-medium">Show User</p>
        </div>

        <div className="bg-[#ffffff] p-6 mt-[12px] rounded-lg">
          <div className="border rounded-md">
            <div className="p-6">
              <div className="flex flex-row overflow-x-auto gap-4 mb-6 mt-[-3px] ml-[1px]">
                {/* tạo UI Avatars */}
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&background=random&rounded=true`}
                  alt={user.name}
                  className="w-[30px] h-[30px] rounded-full"
                />
                <div className="ml-[1px]">
                  <p className="font-semibold pb-2 text-[#1677ff]">
                    {user.name}
                  </p>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-sm mt-[1px] text-[#1677ff]"
                  >
                    {user.email}
                  </a>
                </div>
              </div>

              <hr className="border-t border-gray-300 mt-6" />

              <div className="mb-[9px] mt-4">
                <p className="text-[20px] font-semibold">Albums</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto overflow-hidden rounded-lg">
                  <thead className="bg-[#fafafa]">
                    <tr className="h-[55px] rounded-xl">
                      <th className="p-4 text-sm text-left min-w-[166px] font-semibold">
                        ID
                      </th>
                      <th className="p-4 text-sm text-left left-line min-w-[1026px] font-semibold">
                        Title
                      </th>
                      <th className="p-4 text-sm text-left left-line  min-w-[350px] font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {albumList.map((album) => (
                      <tr
                        key={album.id}
                        className="border-t bg-[#ffffff] h-[65px] hover:bg-[#fafafa] transition duration-300"
                      >
                        <td className="p-4 text-sm text-left">{album.id}</td>
                        <td className="p-4 text-sm text-left">{album.title}</td>
                        <td className="p-4 text-sm text-left">
                          <div
                            className="flex items-center justify-center gap-2 w-[72px] h-[24px] px-[7px] py-0 border rounded-md hover:cursor-pointer hover:text-[#4096ff] hover:border-[#4096ff]"
                            onClick={() => navigate(`/showAlbum/${album.id}`)}
                          >
                            <FontAwesomeIcon icon={faEye} />
                            <button>Show</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {albumList.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="p-4 text-center text-gray-500"
                        >
                          Không có album nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowUser;
