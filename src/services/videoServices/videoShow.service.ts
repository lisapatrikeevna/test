import {instance} from "../../api/axios.api.ts";
interface VideoMetadata {
    id: string;
    videoName: string;
    description: string;
    contentType: string;
    previewUrl: string;
    streamUrl: string;
    ownerId: string;
    videoInfo: {
        usersAccessList: string[];
        isAccessibleToAll: boolean;
        contentViewsByUsers: string[];
        contentLikesByUsers: string[];
        contentDislikesByUsers: string[];
    };
}
//TODO сейчас стоит костыль так как chunk качается только 1-ый, нужно оптимизировать на закачку. (возможно это правильно работает). Проверить.
export async function getVideo(id: string): Promise<Blob | null> {
    try {
        const response = await instance.get(`/video/stream/${id}`, {
            headers: {
                "Content-Type": "video/mp4",
                Range   : "bytes=0-"
            },
            responseType: 'blob' // Important: specify the response type as 'blob'
        });

        if (!response.data) {
            return null;
        }

        return new Blob([response.data], { type: "video/mp4" });
    } catch (error) {
        // Handle error
        return null
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getVideoMetadata(id: string): Promise<any> {
    try {
        const response = await instance.get(`/video/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching video metadata with id ${id}:`, error);
        return null;
    }
}

export async function getVideosOfUser(id: string): Promise<VideoMetadata[]> {
    try {
        const response = await instance.get(`/video/all`);
        if (!response.data) {
            return [];
        }
        const userVideos = response.data.filter((video: VideoMetadata) => video.ownerId === id);

        return userVideos;
    } catch (error) {
        console.error(`Error fetching videos of user with this id ${id}:`, error);
        return [];
    }
}