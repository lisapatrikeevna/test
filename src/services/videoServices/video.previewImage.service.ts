import {instance} from "../../api/axios.api.ts";


export async function showImage(idVideo: string): Promise<string | null> {
    try {
        const response = await instance.get(`/video/preview/${idVideo}`, {
            responseType: 'arraybuffer'
        });

        const base64 = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
            ),
        );

        return "data:;base64," + base64;
    } catch (error) {
        console.error(`Error fetching preview image for video with id ${idVideo}:`, error);
        return null;
    }
}