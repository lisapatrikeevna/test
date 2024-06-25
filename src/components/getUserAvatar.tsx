import { getUserAvatarService } from '../services/userServices/getUserAvatar.service.ts'; // Adjust the path as per your project structure

interface IAvatar {
    id: string;
}

//#region get user avatar
export async function getUserAvatar(id: string, size: 'small' | 'large' = 'small'): Promise<IAvatar | string> {
    try {
        const avatar = await getUserAvatarService(id, size);
        return avatar || generateAvatarColor(id);
    } catch (error) {
        console.error('Error fetching user avatar:', error);
        return generateAvatarColor(id);
    }
}
//#endregion get user avatar

//#region generate avatar color if user doesn't have an avatar
export function generateAvatarColor(id: string): string {
    const hash = id.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const color = '#' + ((hash & 0x00ffffff) | 0xa000000).toString(16).substr(1);
    return color;
}
//#endregion generate avatar color