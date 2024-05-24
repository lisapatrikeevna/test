import {instance} from "../../api/axios.api.ts";

export async function getUser(formData: FormData, ): Promise<void> {
    try {
        const response = await instance.post('/users/{id}', formData, {
            headers: {


            }
        });

        console.log('User get response:', response.data);
    } catch (error) {
        // Handle the error
    }
}