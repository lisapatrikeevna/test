import { instance } from "../../api/axios.api";

interface preRegisterData {
    email: string;
    name: string;
    sendEmail: boolean;
}

export async function preRegisterService(userData: preRegisterData): Promise<void> {
    try {
        const response = await instance.post('/request', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.data;
        console.log('User pre-register response:', data);
    } catch (error) {
        console.error(`Error pre-registering user: ${error}`);
    }
}