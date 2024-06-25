import { useCallback,useState } from 'react';
import { instance } from '../../../api/axios.api';
import { useSelector } from 'react-redux';

interface RootState {
    user: {
        user: {
            userId: string;
        };
    };
}

export const useViewProgress = (videoDuration: number, videoId: string) => {
    const [hasCountedView, setHasCountedView] = useState(false);
    const userId = useSelector((state: RootState) => state.user.user?.userId);

    //#region countView function if videoProgress happened, add View
    const countView = async () => {
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        try {
            const response = await instance.get(`/video/${videoId}`);
            console.log('Initial video data for views:', response.data);
            const currentViews = Array.isArray(response.data.videoInfo.contentViewsByUsers) ? response.data.videoInfo.contentViewsByUsers : [];
            if (!currentViews.includes(userId)) {
                const updatedViews = [...currentViews, userId];
                console.log(updatedViews)
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
    //#endregion countView function if videoProgress happened, add View

    //#region using 20% of video watched or 5 minutes watched to count view
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
    //#endregion using 20% of video watched or 5 minutes watched to count view

    return {
        handleVideoProgress,
    };
};