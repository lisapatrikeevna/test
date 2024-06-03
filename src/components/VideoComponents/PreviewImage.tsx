import { FC, useEffect, useState } from 'react';
import { showImage } from '../../services/videoServices/video.previewImage.service.ts';
import styles from "../../styles/VideosStyles/Videos.module.css";
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

    // Handler to set loading to false once the image is fully loaded
    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <>
            {loading && <Skeleton variant="rectangular" width={350} height={180} />}
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt="Preview"
                    className={styles.videoPreview}
                    style={{ ...style, display: loading ? 'none' : 'block', width: 350, height: 180 }}
                    onLoad={handleImageLoad}
                />
            )}
        </>
    );
};

export default PreviewImage;