import { instance } from "../../api/axios.api";

interface AvatarUpdateData {
    id: string;
    avatarFile: string;
}

export async function updateAvatarService(userData: AvatarUpdateData): Promise<void> {
    try {
        const response = await instance.put('/users', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.data;
        console.log('User update response:', data);
    } catch (error) {
        console.error(`Error updating user details: ${error}`);
    }
}