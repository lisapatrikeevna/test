import { FC, useEffect, useState } from 'react';
import { showImage } from '../../services/videoServices/video.previewImage.service.ts';
import { Skeleton } from "@mui/material";  // Imported Skeleton from MUI


interface PreviewImageProps {
    videoId: string;
    style?: React.CSSProperties;
    maxWidth?: number;
    maxHeight?: number;
    onClick?: () => void; // Add this line
}

const PreviewImage: FC<PreviewImageProps> = ({ videoId, style, maxWidth = 350, maxHeight = 180, onClick }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImage = async () => {
            const image = await showImage(videoId);
            setImageSrc(image);
        };

        fetchImage();
    }, [videoId]);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <>
            {loading && <Skeleton variant="rectangular" width={maxWidth} height={maxHeight} />}
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt="Preview"
                    style={{ ...style, display: loading ? 'none' : 'block', maxWidth: "100%", height: "auto" }} // Ensure image is responsive
                    onLoad={handleImageLoad}
                    onClick={onClick} // Add this line
                />
            )}
        </>
    );
};

export default PreviewImage;