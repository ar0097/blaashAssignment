import React from "react";
import "./VideoCard.css";
import { Link } from "react-router-dom";
const VideoCard = ({ videos, setPostId }) => {
  const firstFourVideos = videos.slice(0, 4);

  return (
    <div className="video-grid">
      {firstFourVideos.map((video) => (
        <div className="video-card" key={video.EngagementPostId}>
          <Link to="/cardslider">
            <video
              controls={false}
              width="100%"
              height="auto"
              playsInline
              autoPlay
              loop
              onClick={() => setPostId(video.EngagementPostId)}
            >
              <source src={video.Thumbnail_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Link>
          <p>Title: {video.Thumbnail_Title}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoCard;
