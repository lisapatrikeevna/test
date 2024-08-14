import { instance } from "../../api/axios.api";

interface UserUpdateData {
    id: string;
    login: string;
    email: string;
    atime: string;
    authProvider: string;
    blockTime: string;
    userAgreementTime: string;
    firstName: string;
    lastName: string;
    phone: string;
    aboutMe: string;
}

export async function updateUser(userData: UserUpdateData): Promise<void> {
    try {
        const response = await instance.put('/api/v1/users/auth/update', userData, {
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