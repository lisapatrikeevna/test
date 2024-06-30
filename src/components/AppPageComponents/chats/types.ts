export type UserType = {
    id: number;
    img: string;
    name: string;
};

export type RenderValues =
    | 'comments'
    | 'chats'
    | 'calendar'
    | 'videos'
    | 'audio'
    | 'radio';

export type RenderValuesCentralComponent =
    | 'home'
    | 'mevipa'
    | 'VR'
    | 'videopage'
    | 'videoeditpage'
    | 'videochannel';