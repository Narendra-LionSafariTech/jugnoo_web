import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { getRequest } from "../services/common.services";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import Advertisement from "../components/Advertisement";
import BottomNav from "../components/BottomNav";

const VideoPlayer = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [watchTime, setWatchTime] = useState(0);

    const getVideo = async () => {
        try {
            const response = await getRequest(`/video/watch/${id}`);
            if (response.status === 200) {
                const data = response?.data?.video || null;
                setVideo(data);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getVideo();
    }, [id]);

    useEffect(() => {
        const interval = setInterval(() => {
            setWatchTime((prev) => {
                const newTime = prev + 1;
                localStorage.setItem(`watchTime_${id}`, newTime);
                if (newTime % 600 === 0) {
                    alert("💡 Please blink your eyes to avoid strain!");
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [id]);

    if (!video) return <Typography>Loading...</Typography>;

    // ✅ fix: YouTube embed without related videos
    const embedUrl = video.youtubeUrl
        .replace("watch?v=", "embed/")
        .split("&")[0] + "?rel=0&modestbranding=1&controls=1";

    return (
        <Box p={2} textAlign="center">
            <Box>
                <Navbar />
                <Advertisement />
            </Box>
            <Box mt={3}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        color: "#1976d2",
                        animation: "pulse 1.5s infinite",
                        "@keyframes pulse": {
                            "0%": { transform: "scale(1)", color: "#1976d2" },
                            "50%": { transform: "scale(1.2)", color: "#ff4081" },
                            "100%": { transform: "scale(1)", color: "#1976d2" }
                        }
                    }}
                >
                    ⏱ Watched Time: {watchTime} sec
                </Typography>
            </Box>
            <Typography variant="h5" gutterBottom>{video.title}</Typography>

            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "800px",
                    margin: "0 auto",
                    aspectRatio: "16/9",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                }}
            >
                <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                ></iframe>
            </Box>

            <BottomNav />
        </Box>
    );
};

export default VideoPlayer;
