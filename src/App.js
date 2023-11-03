import React, { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import CardSlider from "./CardSlider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [videos, setVideos] = useState([]);
  const [postId, setPostId] = useState();
  const apiKey = "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr";
  const tenantKey = "BLAASH1122";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "x-tenant-key": tenantKey
            },
            body: JSON.stringify({
              Index: 1,
              ContentType: [2],
              ProductCategory: [],
              PlayListCode: "XL7OXUUX_638264173348576143",
              IsTagged: false
            })
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (Array.isArray(data.data.Feeds)) {
          setVideos(data.data.Feeds);
        } else {
          console.error('API response "Feeds" is not an array.');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<VideoCard videos={videos} setPostId={setPostId} />}
          />
          <Route
            path="/cardslider"
            element={
              <CardSlider
                videos={videos}
                postId={postId}
                setPostId={setPostId}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
