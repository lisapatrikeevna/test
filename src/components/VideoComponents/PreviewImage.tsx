import { FC, useEffect, useState } from 'react';
import { showImage } from '../../services/videoServices/video.previewImage.service.ts';
import styles from "../../styles/VideosStyles/Videos.module.css";

interface PreviewImageProps {
    videoId: string;
    style?: React.CSSProperties;
}

const PreviewImage: FC<PreviewImageProps> = ({ videoId }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

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