import Image from "next/image";
import React, { useEffect, useState } from "react";

const DynamicImage = ({ imgUrl }: { imgUrl: string }) => {
    const [imageSize, setImageSize] = useState({ width: 300, height: 200 });

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const imgElement = event.currentTarget as HTMLImageElement;
        setImageSize({
            width: imgElement.naturalWidth,
            height: imgElement.naturalHeight,
        });
    };

    return (
        <Image
            src={imgUrl || ""}
            alt={"Dynamic Image"}
            width={imageSize.width}
            height={imageSize.height}
            onLoad={handleImageLoad}
            style={{ objectFit: "contain", borderRadius: "20px" }} // Optional styling
        />
    );
};

export default DynamicImage;
