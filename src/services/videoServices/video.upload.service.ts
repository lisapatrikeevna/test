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