import { instance } from "../../api/axios.api.ts";

interface IAvatar {
    id: string;
    size: 'small' | 'large';
}

export async function getUserAvatar(id: string, size: 'small' | 'large' = 'small'): Promise<IAvatar> {
    const response = await instance.get<IAvatar>(`/users/user/${id}/avatar?size=${size}`);
    return response.data;
}