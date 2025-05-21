import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ShowAlbum() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { albumId } = useParams(); // LẤY albumId TỪ URL
  const navigate = useNavigate();

  // gọi api
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userRes, albumRes, photoRes] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/users"),
          axios.get("https://jsonplaceholder.typicode.com/albums"),
          axios.get("https://jsonplaceholder.typicode.com/photos"),
        ]);

        setUsers(userRes.data);
        setAlbums(albumRes.data);
        setPhotos(photoRes.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // thông báo khi đang load api
  if (loading) return <p>Đang tải dữ liệu...</p>;

  // điều kiện để lọc danh sách
  const album = albums.find((a) => a.id === parseInt(albumId));
  if (!album) return <p>Không tìm thấy album</p>;

  const user = users.find((u) => u.id === album.userId);
  const userName = user?.name || "Không rõ";
  const userEmail = user?.email || "Không rõ email";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userName
  )}&background=random&rounded=true`;

  const albumPhotos = photos
    .filter((photo) => photo.albumId === album.id)
    .slice(0, 10); // chỉ lấy 10 ảnh

  return (
    <div className="mt-16">
      <div className="p-6 bg-[#f5f5f5]">
        <div className="flex items-center gap-1 h-[22px]">
          <FontAwesomeIcon icon={faImages} className="h-4 w-4" />
          <p className="text-sm text-[#00000073]">Albums / Show</p>
        </div>

        {/* Tiêu đề */}
        <div className="flex items-center gap-6 h-10 mt-2">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="h-4 w-4 px-1 cursor-pointer"
            onClick={() => navigate("/content")}
          />
          <p className="text-[20px] font-medium">Show Album</p>
        </div>

        <div className="bg-white p-6 mt-4 border rounded-md">
          {/* Thông tin người dùng */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={avatarUrl}
              alt={userName}
              className="w-[30px] h-[30px] rounded-full"
            />

            <div>
              <p
                className="font-semibold text-[#1677ff] cursor-pointer"
                onClick={() => navigate(`/showUser/${album.id}`)}
              >
                {userName}
              </p>
              <p className="text-sm text-[#1677ff]">{userEmail}</p>
            </div>
          </div>

          <hr className="border-gray-300 my-6" />

          {/* Tiêu đề album */}
          <div className="mb-4">
            <p className="text-[20px] font-semibold">{album.title}</p>
          </div>

          {/* Ảnh trong album */}
          <div className="flex flex-row items-center overflow-x-auto gap-2">
            {albumPhotos.map((photo) => (
              <img
                key={photo.id}
                src={photo.thumbnailUrl}
                alt={photo.title}
                title={photo.title}
                className="rounded cursor-pointer object-cover w-[150px] h-[150px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAlbum;
