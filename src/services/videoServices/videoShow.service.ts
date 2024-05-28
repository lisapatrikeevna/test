import {instance} from "../../api/axios.api.ts";
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