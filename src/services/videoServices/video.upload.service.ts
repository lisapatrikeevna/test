import {instance} from "../../api/axios.api.ts";

export async function uploadVideo(formData: FormData, ): Promise<void> {
    try {
        const response = await instance.post('/video/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log('Video upload response:', response.data);
    } catch (error) {
        // Handle the error
    }
}

export async function updateVideo(videoDetails: {
    videoId: string;
    videoName: string;
    description: string;
    isAccessibleToAll: boolean;
}): Promise<void> {
    try {
        const response = await instance.put('/video/update', videoDetails, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.data;
        console.log('Video update response:', data);
    } catch (error) {
        console.error(`Error updating video details: ${error}`);
    }
}

export async function updateVideoAccessibility(videoId: string, isAccessibleToAll: boolean): Promise<void> {
    try {
        const response = await instance.put(`/video/update-accessibility/${videoId}`, {
            isAccessibleToAll,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.data;
        console.log('Video accessibility update response:', data);
    } catch (error) {
        console.error(`Error updating video accessibility: ${error}`);
    }
}