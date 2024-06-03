import { FC, useEffect, useState } from 'react';
import { showImage } from '../../services/videoServices/video.previewImage.service.ts';
import { Skeleton } from "@mui/material";

interface PreviewImageProps {
    videoId: string;
    style?: React.CSSProperties;
}

const PreviewImage: FC<PreviewImageProps> = ({ videoId, style }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImage = async () => {
            const image = await showImage(videoId);
            setImageSrc(image);
        };

        fetchImage();
    }, [videoId]);

    if (!imageSrc) {
        return null;
    }

    /* return <img src={imageSrc} alt="Preview" className={styles.videoPreview}  />; */
    return <img src={imageSrc} alt="Preview" className={styles.videoPreview} style={{ width: 350, height: 180 }} />;
};

export default PreviewImage;