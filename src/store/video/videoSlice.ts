import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Video {
    id: string;
    title: string;
    file: string;
}

interface VideoState {
    videos: {
        [id: string]: Video;
    };
    videoUrl: string | null;
    buffering: boolean;
    error: string | null;
    loading: boolean;
}

const initialState: VideoState = {
    videos: {},
    videoUrl: null,
    buffering: false,
    error: null,
    loading: false,
};

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        addVideo: (state, action: PayloadAction<Video>) => {
            const { id, title, file } = action.payload;
            state.videos[id] = { id, title, file };
        },
        updateVideo: (state, action: PayloadAction<Video>) => {
            const { id, title, file } = action.payload;
            if (state.videos[id]) {
                state.videos[id].title = title;
                state.videos[id].file = file;
            }
        },
        setVideoUrl: (state, action: PayloadAction<string | null>) => {
            state.videoUrl = action.payload;
        },
        setBuffering: (state, action: PayloadAction<boolean>) => {
            state.buffering = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { addVideo, updateVideo, setVideoUrl, setBuffering, setError, setLoading } = videoSlice.actions;

export default videoSlice.reducer;