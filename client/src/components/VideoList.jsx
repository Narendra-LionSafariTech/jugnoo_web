import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid,Box } from "@mui/material";
import { Link } from "react-router-dom";
import { getRequest } from "../services/common.services";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

const VideoList = ({ userAge = 3 }) => {
    const [videos, setVideos] = useState([]);

    const getVideo = async () => {
        try {
            const response = await getRequest(`/video/list?age=${userAge}`);
            if (response.status === 200) {
                const data = response?.data?.videos || [];
                setVideos(data)
            }
        } catch (error) {
            setVideos.log("error", error)
        }
    }
    useEffect(() => {
        getVideo()
    }, [userAge]);

    return (
        <Box>
            <Navbar />
            <Grid container spacing={2} padding={2}>
                {videos.map((video) => (
                    <Grid item xs={12} md={3} key={video._id}>
                        <Card className="hover:shadow-xl transition-transform hover:scale-105 rounded-2xl">
                            <CardMedia component="img" height="160" image={video.thumbnail} alt={video.title} />
                            <CardContent>
                                <Typography variant="h6">{video.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {video.description?.slice(0, 50)}...
                                </Typography>
                                <Button
                                    component={Link}
                                    to={`/education-video/watch/${video._id}`}
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                >
                                    Play
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <BottomNav />
        </Box>
    );
};

export default VideoList;
