import Meta from '../components/Meta';

function Watermark(){
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

    return (
        <>
            <Meta data={metaDatas} />
            <div>
                <h1>Watermark</h1>
            </div>
        </>
    )
}

export default Watermark;