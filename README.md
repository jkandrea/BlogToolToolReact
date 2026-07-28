# BlogToolTool

블로거와 콘텐츠 제작자를 위한 브라우저 기반 무료 미디어 도구입니다.

- 동영상의 원하는 구간을 GIF로 변환
- 이미지 크기·품질·포맷(WebP/JPG/PNG) 변경
- 사진에 텍스트 워터마크 추가
- 선택한 파일은 서버에 업로드하지 않고 브라우저에서 처리

## 로컬 실행

Node.js LTS 환경을 권장합니다.

```bash
npm install
npm start
```

프로덕션 빌드:

```bash
npm run build
```

GitHub Pages 미리보기 배포:

```bash
npm run deploy
```

현재 `homepage`는 `https://jkandrea.github.io/BlogToolToolReact`로 설정되어 있습니다. `blogtooltool.com`을 이 저장소의 GitHub Pages에 연결할 때는 `package.json`의 `homepage`를 `https://blogtooltool.com`으로 변경하고 `public/CNAME`에 `blogtooltool.com`을 추가한 뒤 다시 배포하세요.

`build/` 폴더를 정적 호스팅에 배포합니다. React Router를 사용하므로 호스팅 서버는 존재하지 않는 경로를 `index.html`로 돌려주는 SPA fallback 설정이 필요합니다.

## 페이지 구조

| 경로 | 내용 |
| --- | --- |
| `/` | 서비스 소개와 주요 도구 |
| `/tools` | 전체 도구 |
| `/tools/video-to-gif` | 동영상 GIF 변환 |
| `/tools/image-resizer` | 이미지 리사이즈·포맷 변환 |
| `/tools/watermark` | 텍스트 워터마크 |
| `/guides` | 블로그 작업 가이드 |
| `/about` | 서비스 소개 |
| `/privacy` | 개인정보처리방침 |
| `/terms` | 이용약관 |

## SEO 체크리스트

- 페이지별 title, description, canonical, Open Graph 메타 적용
- JSON-LD 구조화 데이터 적용
- `robots.txt`, `sitemap.xml` 포함
- 페이지별 의미 있는 제목 구조와 충분한 한국어 설명 콘텐츠
- 의미 있는 제목 구조와 한국어 본문 콘텐츠 제공

배포 후에는 Google Search Console에 `https://blogtooltool.com/sitemap.xml`을 제출하고, 실제 운영 환경의 HTTPS·모바일 사용성·Core Web Vitals를 확인하세요.

## 광고 적용 전 확인

광고 승인은 코드만으로 보장할 수 없습니다. 충분한 독창적 콘텐츠, 정상 동작하는 탐색, 실제 연락 가능한 문의 주소, 개인정보처리방침, 도메인 소유권과 정책 준수가 함께 필요합니다. 광고 코드는 승인 후 콘텐츠와 도구 사용을 방해하지 않는 위치에 추가하는 것을 권장합니다.

## 라이선스

Copyright © 2026 BlogToolTool. All rights reserved.
