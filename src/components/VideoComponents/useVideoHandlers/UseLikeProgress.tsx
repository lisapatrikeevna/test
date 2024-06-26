import {useEffect, useState} from 'react';
import { instance } from '../../../api/axios.api.ts';
import { useSelector } from 'react-redux';

interface RootState {
    user: {
        user: {
            userId: string;
        };
    };
}


export const useLikeHandler = (videoId: string) => {

    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);
    const [likeDataLoaded, setLikeDataLoaded] = useState(false);

    const userId = useSelector((state: RootState) => state.user.user?.userId);

    //#region useEffect fetchUserLikeStatus
    useEffect(() => {
        const fetchUserLikeStatus = async () => {
            try {
                const response = await instance.get(`/video/${videoId}`);
                console.log('Initial video data for likes:', response.data);
                const userLikes = Array.isArray(response.data.videoInfo.contentLikesByUsers) ? response.data.videoInfo.contentLikesByUsers : [];
                const userDislikes = Array.isArray(response.data.videoInfo.contentDislikesByUsers) ? response.data.videoInfo.contentDislikesByUsers : [];
                console.log("UserLikes", userLikes)
                setHasLiked(userLikes.includes(userId));
                setLikes(userLikes.length);
                setHasDisliked(userDislikes.includes(userId));
                setLikeDataLoaded(true);

            } catch (error) {
                console.error('Error fetching like status:', error);
            }
        };

        fetchUserLikeStatus();
    }, [videoId, userId]);
    //#endregion useEffect fetchUserLikeStatus

    //#region useEffect usage of Like and upload this info
    const handleLike = async () => {
        if (!likeDataLoaded) {
            console.error('Like data is not loaded yet');
            return;
        }
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        try {
            const response = await instance.get(`/video/${videoId}`);
            const currentLikes = Array.isArray(response.data.videoInfo.contentLikesByUsers) ? response.data.videoInfo.contentLikesByUsers : [];
            const currentDislikes = Array.isArray(response.data.videoInfo.contentDislikesByUsers) ? response.data.videoInfo.contentDislikesByUsers : [];
            console.log("CurrentLikes",  currentLikes)

            //using length of array as amount of likes, because we get array with id's
            let updatedLikes = [...currentLikes];
            let updatedDislikes = [...currentDislikes];

            console.log("UpdatedLikes", updatedLikes)
            if (hasLiked) {
                updatedLikes = updatedLikes.filter(id => id !== userId);
                console.log("UpdatedLikes HasLiked", updatedLikes)
            } else {
                if (updatedDislikes.includes(userId)) {
                    updatedDislikes = updatedDislikes.filter(id => id !== userId);
                }
                updatedLikes = [...currentLikes, userId];
                console.log("UpdatedLikes curent+userId", updatedLikes)
            }
            console.log("UpdatedLikes после всего", updatedLikes)


            await instance.put('/video/update', {
                videoId,
                contentLikesByUsers: updatedLikes,
                contentDislikesByUsers: updatedDislikes,
            });
            setLikes(updatedLikes.length);
            setHasLiked(prev => !prev);
            setHasDisliked(false);
            console.log('Like status updated successfully');
            console.log(updatedLikes, updatedDislikes)
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };
    //#endregion useEffect usage of Like and upload this info

    //#region useEffect usage of Dislike and upload this info
    const handleDislike = async () => {
        if (!likeDataLoaded) {
            console.error('Like data is not loaded yet');
            return;
        }
        if (!userId) {
            console.error('No user ID found');
            return;
        }


        try {
            const response = await instance.get(`/video/${videoId}`);
            const currentLikes = Array.isArray(response.data.videoInfo.contentLikesByUsers) ? response.data.videoInfo.contentLikesByUsers : [];
            const currentDislikes = Array.isArray(response.data.videoInfo.contentDislikesByUsers) ? response.data.videoInfo.contentDislikesByUsers : [];

            //using length of array as amount of Dislikes, because we get array with id's
            let updatedLikes = [...currentLikes];
            let updatedDislikes = [...currentDislikes];

            if (hasDisliked) {
                updatedDislikes = updatedDislikes.filter(id => id !== userId);
                await instance.put('/video/update', {
                    videoId,
                    contentLikesByUsers: updatedLikes,
                    contentDislikesByUsers: updatedDislikes,
                });
            } else {
                if (updatedLikes.includes(userId)) {
                    updatedLikes = updatedLikes.filter(id => id !== userId);
                    await instance.put('/video/update', {
                        videoId,
                        contentLikesByUsers: updatedLikes,
                        contentDislikesByUsers: updatedDislikes,
                    });
                }
                updatedDislikes.push(userId);
                await instance.put('/video/update', {
                    videoId,
                    contentLikesByUsers: updatedLikes,
                    contentDislikesByUsers: updatedDislikes,
                });
            }

            // After the request is successful, update the dislikes status
            setLikes(updatedLikes.length);
            setHasLiked(false);
            setHasDisliked(prev => !prev);
            console.log('Dislike status updated successfully');
            console.log(updatedLikes, updatedDislikes)
        } catch (error) {
            console.error('Error updating dislikes:', error);
        }
    };
    //#endregion useEffect usage of Dislike and upload this info
    return {
        likes,
        setLikes,
        hasLiked,
        handleLike,
        hasDisliked,
        handleDislike,
    };
};
