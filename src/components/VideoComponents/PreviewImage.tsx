import { FC, useEffect, useState } from 'react';
import { showImage } from '../../services/videoServices/video.previewImage.service.ts';
import { Skeleton } from "@mui/material";  // Imported Skeleton from MUI

interface PreviewImageProps {
    videoId: string;
    style?: React.CSSProperties;
}

const PreviewImage: FC<PreviewImageProps> = ({ videoId, style }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);  // Added loading state

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
                    style={{ ...style, display: loading ? 'none' : 'block', width: 350, height: 180 }}
                    onLoad={handleImageLoad}  // Added onLoad handler
                />
            )}
        </>
    );
};

export default PreviewImage;