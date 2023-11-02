import Meta from '../components/Meta';
import EmptyBox from '../components/EmptyBox';
import { useState } from 'react';

function Watermark(){
    
    const [imageurl, setImageurl] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const metaDatas = {
        title: "블록툴툴 워터마크",
        description: "블록툴툴 워터마크",
        canonical: "https://blogtooltool.github.io/watermark",
        meta: {
            charset: "utf-8",
            name: {
                keywords: "블록툴툴, 워터마크, 물방울, 물방울로고, 물방울로고생성기, 로고, 로고생성기, 로고만들기, 물방울로고만들기"
            },
            property: {
                "og:type": "website",
                "og:title": "블록툴툴 워터마크",
                "og:description": "블록툴툴 워터마크",
                "og:url": "https://blogtooltool.github.io/watermark",
                "og:image": "https://blogtooltool.github.io/watermark/logo.png"
            },
            itemProp: {
                name: "블록툴툴 워터마크",
                description: "블록툴툴 워터마크",
                image: "https://blogtooltool.github.io/watermark/logo.png"
            },
            "twitter:card": "summary_large_image",
            "twitter:title": "블록툴툴 워터마크",
            "twitter:description": "블록툴툴 워터마크",
            "twitter:image": "https://blogtooltool.github.io/watermark/logo.png"
        }
    };
    
    function ImageFileOpen() {
        const file = document.createElement("input");
        file.type = "file";
        file.accept = "image/*";
        file.onchange = function (event) {
            const file = event.target.files[0];
            setLoaded(false);
            setImageurl(URL.createObjectURL(file));
        }
        file.click();
    }
    
    function ImageDragOver(event) {
        event.preventDefault();
    }
    function ImageFileDrop(event) {
        event.preventDefault();

        if (event.dataTransfer.files.length === 0) {
            return;
        }
        if (event.dataTransfer.files[0].type.indexOf("image") === -1) {
            return;
        }

        const file = event.dataTransfer.files[0];
        setLoaded(false);
        setImageurl(URL.createObjectURL(file));
    }

    function Imageclick(event) {
        ImageFileOpen();
    }

    return (
        <>
            <Meta data={metaDatas} />
            <div>
                <h1>Watermark</h1>
                {imageurl == null?
                <div><EmptyBox onClick={ImageFileOpen} onDragOver={ImageDragOver} onDrop={ImageFileDrop} /> </div> : 
                <div>
                    <img src={imageurl} alt="이미지" onClick={Imageclick} onDragOver={ImageDragOver} onDrop={ImageFileDrop} />
                </div>
            }
            </div>
        </>
    )
}

export default Watermark;