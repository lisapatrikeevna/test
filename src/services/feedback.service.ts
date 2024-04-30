import axios from 'axios';

export const FeedbackService = {
    async sendFeedback(userName: string, userEmail: string, userMsg: string, userPhone?: string) {
        const body = {
            userName,
            userEmail,
            userPhone,
            userMsg
        };

        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axios.post("https://neox.it-assistent.eu:8030/feedback/message", body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                return response.data.message;
            } else if (response.status === 400) {
                throw new Error('Ошибка: ' + response.data.errors.join(', '));
            } else {
                throw new Error('Неизвестная ошибка');
            }
        } catch (error) {
            throw error;
        }
    },
};