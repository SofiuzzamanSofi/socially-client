import { useEffect, useState } from "react";

const useImgbb = data => {

    const [imageUrl, setImageUrl] = useState(null);
    const [imageUrlFinally, setImageUrlFinally] = useState(null);
    const [imageUrlLOading, setImageUrlLoading] = useState(true);



    useEffect(() => {
        if (data) {
            const image = data.image[0];
            // IMAGE BB HOT KEY --
            const imageHostingKey = process.env.REACT_APP_imgbb_key_ElonDahkaEmail;
            const formData = new FormData();
            formData.append("image", image);
            const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
            fetch(url, {
                method: "POST",
                body: formData,
            }).then(res => res.json())
                .then(imageInfo => {
                    if (imageInfo?.success) {
                        setImageUrl(imageInfo?.data?.url);
                        setImageUrlLoading(false);
                    }
                })
                .catch(error => { console.log("error from photo catch method imgbb", error) })
                .finally(() => {
                    setImageUrlFinally("noImg");
                    setImageUrlLoading(false);
                    console.log("finally");
                });
        };
    }, [data]);
    return [imageUrl ? imageUrl : imageUrlFinally, imageUrlLOading];
}
export default useImgbb;