import { useCallback, useEffect, useState } from 'react';
import { instance } from '../../api/axios.api';
import { useSelector } from 'react-redux';

interface RootState {
    user: {
        user: {
            userId: string;
        };
    };
}

export const useVideoProgress = (videoDuration: number, videoId: string) => {
    const [hasCountedView, setHasCountedView] = useState(false);
    const userId = useSelector((state: RootState) => state.user.user?.userId);

    const countView = async () => {
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        try {
            // Fetch the current views data
            const response = await instance.get(`/video/${videoId}`);
            console.log('Initial video data for views:', response.data);
            const currentViews = Array.isArray(response.data.contentViewsByUsers) ? response.data.contentViewsByUsers : [];

            // Update views if the user has not already viewed the video
            if (!currentViews.includes(userId)) {
                const updatedViews = [...currentViews, userId];
                await instance.put('/video/update', {
                    videoId,
                    contentViewsByUsers: updatedViews,
                });
                console.log('View counted successfully');
            } else {
                console.log('User has already viewed the video');
            }
        } catch (error) {
            console.error('Error updating views:', error);
        }
    };

    const handleVideoProgress = useCallback((state: { playedSeconds: number }) => {
        console.log('Video progress:', state.playedSeconds);
        if (!hasCountedView) {
            const watchedDuration = state.playedSeconds;

            if (videoDuration > 0) {
                const percentageWatched = (watchedDuration / videoDuration) * 100;

                if (watchedDuration >= 300 || percentageWatched >= 20) {
                    console.log('Counting view...');
                    countView();
                    setHasCountedView(true);
                }
            }
        }
    }, [videoDuration, hasCountedView, countView]);

    return {
        handleVideoProgress,
    };
};



export const useLikeHandler = (videoId: string) => {
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);
    const userId = useSelector((state: RootState) => state.user.user?.userId);

    useEffect(() => {
        // Fetch the initial state to check if the user has already liked or disliked the video
        const fetchUserLikeStatus = async () => {
            try {
                const response = await instance.get(`/video/${videoId}`);
                console.log('Initial video data:', response.data);
                const userLikes = Array.isArray(response.data.contentLikesByUsers) ? response.data.contentLikesByUsers : [];
                setHasLiked(userLikes.includes(userId));
                setLikes(userLikes.length);
                // Add logic to check if the user has disliked the video
                const userDislikes = Array.isArray(response.data.contentDislikesByUsers) ? response.data.contentDislikesByUsers : [];
                setHasDisliked(userDislikes.includes(userId));
            } catch (error) {
                console.error('Error fetching like status:', error);
            }
        };

        fetchUserLikeStatus();
    }, [videoId, userId]);

    const handleLike = async () => {
        console.log('Like button clicked');
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        try {
            // Fetch the current likes data
            const response = await instance.get(`/video/${videoId}`);
            const currentLikes = Array.isArray(response.data.contentLikesByUsers) ? response.data.contentLikesByUsers : [];
            const currentDislikes = Array.isArray(response.data.contentDislikesByUsers) ? response.data.contentDislikesByUsers : [];

            let updatedLikes = currentLikes;
            let updatedDislikes = currentDislikes;

            if (hasLiked) {
                // Unlike the video: Remove userId from contentLikesByUsers
                updatedLikes = currentLikes.filter((id: string) => id !== userId);
            } else {
                // Like the video: Add userId to contentLikesByUsers
                updatedLikes = [...currentLikes, userId];
                // Remove userId from contentDislikesByUsers if it exists
                updatedDislikes = currentDislikes.filter((id: string) => id !== userId);
            }

            // Update likes and dislikes on the server
            await instance.put('/video/update', {
                videoId,
                contentLikesByUsers: updatedLikes,
                contentDislikesByUsers: updatedDislikes,
            });

            // Update local state
            setLikes(updatedLikes.length);
            setHasLiked(!hasLiked);
            setHasDisliked(false); // Ensure dislike is reset when liking
            console.log('Like status updated successfully');
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };

    const handleDislike = async () => {
        console.log('Dislike button clicked');
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        try {
            // Fetch the current dislikes data
            const response = await instance.get(`/video/${videoId}`);
            const currentLikes = Array.isArray(response.data.contentLikesByUsers) ? response.data.contentLikesByUsers : [];
            const currentDislikes = Array.isArray(response.data.contentDislikesByUsers) ? response.data.contentDislikesByUsers : [];

            let updatedLikes = currentLikes;
            let updatedDislikes = currentDislikes;

            if (hasLiked) {
                // Remove like if it exists
                updatedLikes = currentLikes.filter((id: string) => id !== userId);
            }

            if (hasDisliked) {
                // Remove dislike if it exists
                updatedDislikes = currentDislikes.filter((id: string) => id !== userId);
            } else {
                // Add dislike if it doesn't exist
                updatedDislikes = [...currentDislikes, userId];
            }

            // Update likes and dislikes on the server
            await instance.put('/video/update', {
                videoId,
                contentLikesByUsers: updatedLikes,
                contentDislikesByUsers: updatedDislikes,
            });

            // Update local state
            setLikes(updatedLikes.length);
            setHasLiked(false); // Ensure like is reset when disliking
            setHasDisliked(!hasDisliked);
            console.log('Dislike status updated successfully');
        } catch (error) {
            console.error('Error updating dislikes:', error);
        }
    };

    return {
        likes,
        setLikes,
        hasLiked,
        handleLike,
        hasDisliked,
        handleDislike,
    };
};
