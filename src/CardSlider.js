import React, { useEffect, useState } from "react";
import "./CardSlider.css";
const Slider = ({ videos, postId, setPostId }) => {
  const [src, setSrc] = useState(
    "https://d33zkbf3uttm0b.cloudfront.net/v/BLAASH/2dff524d-37e8-443d-a4f2-c69d864d4879.mp4"
  );

  const fetchContent = async () => {
    try {
      const res = await fetch(
        `https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getPostContent?eid=${postId}`,
        {
          headers: {
            "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
            "x-tenant-key": "BLAASH1122",
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await res.json();

      if (result.videos && result.videos.length > 0) {
        setSrc(result.videos[0].Url);
        const video = document.getElementById("my_video");
        video.src = result.videos[0].Url;
      } else {
        console.error("No videos found in the API response.");
      }
    } catch (error) {
      console.error("Error fetching content data:", error);
    }
  };
  useEffect(() => {
    fetchContent();
  }, [postId]);

  const handleLeft = () => {
    if (postId > 2327) {
      setPostId((prev) => prev - 1);
    } else {
      setPostId(2331);
    }
  };
  const handleRight = () => {
    if (postId < 2331) {
      setPostId((prev) => prev + 1);
    } else {
      setPostId(2327);
    }
  };

  return (
    <div className="slider_container">
      {videos.map((video, index) => (
        <video
          style={{
            position: "absolute",
            top: "10vh",
            left: `${index * 140}px`,
            height: "80vh"
          }}
          className="video"
          onClick={() => setPostId(video.EngagementPostId)}
        >
          <source src={video.Thumbnail_URL} type="video/mp4" />
        </video>
      ))}

      {src ? (
        <div className="main_slide">
          <video postId="my_video" autoPlay controls={false} loop>
            <source src={src} type="video/mp4" />
          </video>
          <button>Shop</button>
        </div>
      ) : (
        <p></p>
      )}
      <div className="icon">
        <i
          onClick={handleLeft}
          style={{
            cursor: "pointer",
            position: "absolute",
            left: "5px",
            top: "50vh",
            backgroundColor: "gray",
            padding: "10px",
            color: "#fff"
          }}
          className="fa-solid fa-chevron-left"
        >
          &lt;
        </i>
        <i
          onClick={handleRight}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "5px",
            top: "50vh",
            backgroundColor: "gray",
            padding: "10px",
            color: "#fff"
          }}
          className="fa-solid fa-chevron-right"
        >
          &gt;
        </i>
      </div>
    </div>
  );
};

export default Slider;
