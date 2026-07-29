const fs = require("fs");
const path = require("path");

const buildDirectory = path.resolve(__dirname, "..", "build");
const template = fs.readFileSync(path.join(buildDirectory, "index.html"), "utf8");

const routes = [
  ["tools", "무료 블로그 도구 | BlogToolTool", "콘텐츠 제작에 자주 쓰는 무료 이미지·GIF 도구를 만나보세요."],
  ["tools/video-to-gif", "동영상 GIF 변환 — 무료·워터마크 없음 | BlogToolTool", "영상의 원하는 구간을 선택해 브라우저에서 안전하게 GIF로 변환하세요."],
  ["tools/image-resizer", "무료 이미지 리사이즈·WebP 변환 | BlogToolTool", "이미지 크기와 품질을 조절하고 JPG, PNG, WebP로 변환하세요."],
  ["tools/watermark", "사진 워터마크 넣기 — 무료·업로드 없음 | BlogToolTool", "사진에 텍스트 워터마크를 간편하게 추가하고 다운로드하세요."],
  ["guides", "블로그 작업 가이드 | BlogToolTool", "검색 노출과 콘텐츠 품질에 도움이 되는 실전 블로그 작업 가이드입니다."],
  ["guides/blog-image-size", "블로그 이미지, 몇 px로 올려야 선명할까? | BlogToolTool", "블로그 플랫폼에서 선명하게 보이는 이미지 크기와 용량을 알아보세요."],
  ["guides/gif-optimization", "화질은 지키고 GIF 용량은 줄이는 5가지 방법 | BlogToolTool", "GIF의 길이, FPS, 해상도를 조절해 용량을 줄이는 방법을 안내합니다."],
  ["guides/watermark-guide", "사진을 해치지 않는 워터마크 위치와 투명도 | BlogToolTool", "도용은 막고 사진은 살리는 워터마크 설정 방법을 알아보세요."],
  ["about", "서비스 소개 | BlogToolTool", "블로거의 반복적인 이미지와 영상 작업을 줄이는 무료 웹 도구입니다."],
  ["privacy", "개인정보처리방침 | BlogToolTool", "BlogToolTool의 개인정보 및 브라우저 파일 처리 방식을 안내합니다."],
  ["terms", "이용약관 | BlogToolTool", "BlogToolTool 서비스 이용 조건과 사용자 책임을 안내합니다."],
];

function pageFor(route, title, description) {
  const canonical = `https://blogtooltool.com/${route}`;
  return template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content=".*?"\/>/,
      `<meta name="description" content="${description}"/>`
    )
    .replace("</head>", `<link rel="canonical" href="${canonical}"/></head>`);
}

for (const [route, title, description] of routes) {
  const routeDirectory = path.join(buildDirectory, ...route.split("/"));
  fs.mkdirSync(routeDirectory, { recursive: true });
  fs.writeFileSync(path.join(routeDirectory, "index.html"), pageFor(route, title, description));
}

fs.writeFileSync(path.join(buildDirectory, "404.html"), template);
console.log(`Generated ${routes.length} static route entry files.`);
