import { useCallback, useState } from 'react';
import { instance } from '../../api/axios.api';
import { useSelector } from 'react-redux';

interface RootState {
    user: {
        user: {
            userId: string;
        };
    };
}

export const useVideoProgress = (videoDuration: number, videoId: string, videoName: string, description: string) => {
    const [hasCountedView, setHasCountedView] = useState(false);
    const userId = useSelector((state: RootState) => state.user.user?.userId);

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
    }, [videoDuration, hasCountedView]);

    const countView = async () => {
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        try {
            await instance.put('/video/update', {
                videoId,
                videoName,
                description,
                contentViewsByUsers: [userId],
            });
            console.log('View counted successfully');
        } catch (error) {
            console.error('Error updating views:', error);
        }
    };

    return {
        handleVideoProgress,
    };
};

export const useLikeHandler = (videoId: string, videoName: string, description: string) => {
    const [likes, setLikes] = useState(0);
    const userId = useSelector((state: RootState) => state.user.user?.userId);

    const handleLike = async () => {
        console.log('Like button clicked');
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        try {
            await instance.put('/video/update', {
                videoId,
                videoName,
                description,
                contentLikesByUsers: [userId],
            });
            setLikes(prev => prev + 1);
            console.log('Like added successfully');
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };

    return {
        likes,
        setLikes,
        handleLike
    };
};
