import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function User() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API khi component được render lần đầu
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data); // Lưu dữ liệu vào state
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);

  return (
    <div className="mt-16 max-w-[1467]">
      <div className="p-6 bg-[#f5f5f5]">
        <div className="w-9 my-1">
          <p className="text-[20px] font-semibold">Users</p>
        </div>

        <div className="overflow-x-auto mt-3">
          {/* table */}
          <table className="min-w-full table-auto overflow-hidden rounded-lg">
            <thead className="bg-[#fafafa]">
              <tr className="h-[55px] rounded-xl">
                <th className="p-4 text-sm text-left w-[86px] font-semibold">
                  ID
                </th>
                <th className="p-4 text-sm text-left left-line w-[132px] font-semibold">
                  Avatar
                </th>
                <th className="p-4 text-sm text-left left-line w-[332px] font-semibold">
                  Name
                </th>
                <th className="p-4 text-sm text-left left-line w-[376px] font-semibold">
                  Email
                </th>
                <th className="p-4 text-sm text-left left-line w-[328px] font-semibold">
                  Phone
                </th>
                <th className="p-4 text-sm text-left left-line w-[210px] font-semibold">
                  Website
                </th>
                <th className="p-4 text-sm text-left left-line w-[188px] font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* load danh sách user */}
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t bg-[#ffffff] h-[65px] hover:bg-[#fafafa] transition duration-300"
                >
                  <td className="p-4 text-sm text-left">{user.id}</td>
                  <td className="p-4 text-sm text-left">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name
                      )}&background=random&rounded=true`}
                      alt={user.name}
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  </td>
                  <td className="p-4 text-sm text-left">{user.name}</td>
                  <td
                    className="p-4 text-sm text-left text-[#1677ff] "
                    onClick={() =>
                      window.open(`mailto:${user.email}`, "_blank")
                    }
                  >
                    <p className="hover:cursor-pointer inline">{user.email}</p>
                  </td>
                  <td
                    className="p-4 text-sm text-left text-[#1677ff] hover:cursor-pointer"
                    onClick={() => window.open(`tel:${user.phone}`, "_blank")}
                  >
                    <p className="hover:cursor-pointer inline">{user.phone}</p>
                  </td>
                  <td
                    className="p-4 text-sm text-left text-[#1677ff] hover:cursor-pointers "
                    onClick={() => {
                      let url = user.website;
                      if (!url.startsWith("http")) {
                        url = "http://" + url; // thêm http nếu thiếu
                      }
                      window.open(url, "_blank");
                    }}
                  >
                    <p className="hover:cursor-pointer inline">
                      {" "}
                      {user.website}
                    </p>
                  </td>
                  <td className="p-4 text-sm text-left">
                    <div className="flex items-center justify-center gap-2 w-[72px] h-[24px] px-[7px] py-0 border rounded-md hover:cursor-pointer hover:text-[#4096ff] hover:border-[#4096ff]">
                      <FontAwesomeIcon icon={faEye} />
                      <button
                        className=""
                        onClick={() => navigate(`/showUser/${user.id}`)}
                      >
                        Show
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
