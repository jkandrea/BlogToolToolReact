import { BrowserRouter, HashRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import GIFConverter from "./routes/GifConverter";
import Watermark from "./routes/Watermark";
import ImageController from "./routes/ImageController";
import Meta from "./components/Meta";

const tools = [
  {
    path: "/tools/video-to-gif",
    eyebrow: "VIDEO",
    icon: "▶",
    title: "동영상 GIF 변환",
    description: "영상의 원하는 구간만 잘라 가볍고 선명한 GIF로 만드세요.",
    accent: "coral",
  },
  {
    path: "/tools/image-resizer",
    eyebrow: "IMAGE",
    icon: "↗",
    title: "이미지 리사이즈",
    description: "블로그와 SNS에 맞게 크기·포맷·품질을 한 번에 조절하세요.",
    accent: "blue",
  },
  {
    path: "/tools/watermark",
    eyebrow: "BRAND",
    icon: "◈",
    title: "워터마크 넣기",
    description: "사진에 내 이름이나 채널명을 넣고 콘텐츠를 보호하세요.",
    accent: "yellow",
  },
];

const guides = [
  {
    slug: "blog-image-size",
    tag: "블로그 이미지",
    title: "블로그 이미지, 몇 px로 올려야 선명할까?",
    summary: "네이버·티스토리·워드프레스에서 깨지지 않는 이미지 크기와 용량을 정리했습니다.",
    read: "5분",
  },
  {
    slug: "gif-optimization",
    tag: "GIF 만들기",
    title: "화질은 지키고 GIF 용량은 줄이는 5가지 방법",
    summary: "길이, FPS, 해상도 중 무엇부터 줄여야 하는지 실제 작업 순서로 알려드립니다.",
    read: "6분",
  },
  {
    slug: "watermark-guide",
    tag: "콘텐츠 보호",
    title: "사진을 해치지 않는 워터마크 위치와 투명도",
    summary: "도용은 막고 사진은 살리는 워터마크 디자인의 기본 원칙을 알아보세요.",
    read: "4분",
  },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="BlogToolTool 홈">
      <span className="brand-mark"><i /><i /><i /></span>
      <span>BlogToolTool</span>
    </Link>
  );
}

function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-wrap">
          <Brand />
          <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="메뉴 열기">
            <span /><span />
          </button>
          <nav className={open ? "main-nav open" : "main-nav"} aria-label="주 메뉴">
            <NavLink to="/tools">도구</NavLink>
            <NavLink to="/guides">활용 가이드</NavLink>
            <NavLink to="/about">소개</NavLink>
            <Link className="nav-cta" to="/tools">무료로 시작하기 <span>↗</span></Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-main">
          <div>
            <Brand />
            <p>블로거의 반복 작업을 가볍게.<br />설치 없이, 브라우저에서 바로.</p>
          </div>
          <div className="footer-links">
            <div><strong>도구</strong><Link to="/tools/video-to-gif">동영상 GIF 변환</Link><Link to="/tools/image-resizer">이미지 리사이즈</Link><Link to="/tools/watermark">워터마크 넣기</Link></div>
            <div><strong>BlogToolTool</strong><Link to="/about">서비스 소개</Link><Link to="/guides">활용 가이드</Link><a href="mailto:hello@blogtooltool.com">문의하기</a></div>
            <div><strong>정책</strong><Link to="/privacy">개인정보처리방침</Link><Link to="/terms">이용약관</Link></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 BlogToolTool. All rights reserved.</span><span className="local-note"><b>●</b> 파일은 기기 안에서만 처리됩니다</span></div>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <>
      <Meta title="BlogToolTool — 블로거를 위한 무료 이미지·GIF 도구" description="동영상을 GIF로 변환하고, 이미지를 리사이즈하고, 워터마크를 넣으세요. 업로드 없이 브라우저에서 안전하게 처리하는 무료 블로그 도구입니다." path="/" />
      <section className="hero">
        <div className="hero-copy">
          <span className="pill"><b>NEW</b> 더 빠르고 안전하게 새로워졌어요 <span>→</span></span>
          <h1>콘텐츠는 멋지게.<br /><em>반복 작업은 가볍게.</em></h1>
          <p>블로그 이미지 편집부터 GIF 변환까지.<br />설치도, 회원가입도 없이 브라우저에서 바로 끝내세요.</p>
          <div className="hero-actions"><Link className="button primary" to="/tools">무료 도구 둘러보기 <span>↗</span></Link><a className="text-link" href="#how">어떻게 작동하나요? <span>↓</span></a></div>
          <div className="trust-row"><span><b>✓</b> 100% 무료</span><span><b>✓</b> 회원가입 없음</span><span><b>✓</b> 서버 업로드 없음</span></div>
        </div>
        <div className="hero-art" aria-label="BlogToolTool 도구 미리보기">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="float-chip chip-video"><span>▶</span><b>MP4</b><i>00:08</i></div>
          <div className="float-chip chip-gif"><span>GIF</span><div><b>완료!</b><i>2.4 MB</i></div><em>✓</em></div>
          <div className="float-chip chip-image"><div className="mini-landscape">●</div><b>1200 × 630</b></div>
          <div className="wand"><span>✦</span></div>
          <i className="spark s1">✦</i><i className="spark s2">✦</i><i className="spark s3">✦</i>
        </div>
      </section>

      <section className="tool-section">
        <div className="section-heading"><span className="kicker">FREE TOOLS</span><h2>필요한 작업만 골라,<br />빠르게 끝내세요</h2><p>파일은 서버로 전송되지 않습니다.<br />모든 작업은 내 브라우저에서 안전하게 처리돼요.</p></div>
        <div className="tool-grid">{tools.map((tool, index) => <ToolCard tool={tool} index={index} key={tool.path} />)}</div>
        <div className="center"><Link className="button outline" to="/tools">모든 도구 보기 <span>→</span></Link></div>
      </section>

      <section className="privacy-banner" id="how">
        <div className="shield">⌾<span>✓</span></div>
        <div><span className="kicker">PRIVACY FIRST</span><h2>내 파일은, 내 기기 안에서만.</h2><p>BlogToolTool은 파일을 서버에 업로드하지 않습니다.<br />변환과 편집은 브라우저 안에서만 진행되고, 창을 닫으면 작업 데이터도 사라져요.</p><Link to="/privacy">개인정보 보호 방식 알아보기 <span>→</span></Link></div>
        <div className="privacy-facts"><span><i>✓</i><b>서버 전송</b><em>없음</em></span><span><i>✓</i><b>파일 보관</b><em>없음</em></span><span><i>✓</i><b>가입·로그인</b><em>없음</em></span></div>
      </section>

      <section className="guide-section">
        <div className="section-heading row"><div><span className="kicker">QUICK GUIDES</span><h2>작업이 쉬워지는<br />짧고 정확한 가이드</h2></div><Link to="/guides">가이드 전체 보기 <span>→</span></Link></div>
        <div className="guide-grid">{guides.map((guide, index) => <GuideCard guide={guide} index={index} key={guide.slug} />)}</div>
      </section>

      <section className="bottom-cta"><span className="scribble">✦</span><h2>지금 필요한 작업,<br />바로 끝내볼까요?</h2><p>회원가입 없이 무료로 시작하세요.</p><Link className="button dark" to="/tools">무료 도구 시작하기 <span>↗</span></Link></section>
    </>
  );
}

function ToolCard({ tool, index }) {
  return (
    <Link className={`tool-card ${tool.accent}`} to={tool.path}>
      <div className={`tool-visual visual-${index}`}><span className="tool-icon">{tool.icon}</span><i className="deco">✦</i></div>
      <span className="eyebrow">{tool.eyebrow}</span><h3>{tool.title}</h3><p>{tool.description}</p><b className="card-link">바로 사용하기 <span>→</span></b>
    </Link>
  );
}

function GuideCard({ guide, index }) {
  return (
    <Link className="guide-card" to={`/guides/${guide.slug}`}>
      <div className={`guide-cover cover-${index}`}><span>{index === 0 ? "↔" : index === 1 ? "GIF" : "©"}</span><i>✦</i></div>
      <small>{guide.tag} · {guide.read}</small><h3>{guide.title}</h3><p>{guide.summary}</p><b>읽어보기 <span>→</span></b>
    </Link>
  );
}

function ToolsIndex() {
  return (
    <Page title="무료 블로그 도구" intro="콘텐츠 제작에 자주 쓰는 기능만 모았습니다. 파일은 서버에 올리지 않고 브라우저에서 처리합니다." path="/tools">
      <div className="tool-grid listing">{tools.map((tool, index) => <ToolCard tool={tool} index={index} key={tool.path} />)}</div>
    </Page>
  );
}

function GuidesIndex() {
  return (
    <Page title="블로그 작업 가이드" intro="검색 노출과 콘텐츠 품질에 도움이 되는 실전 팁을 쉽고 정확하게 정리합니다." path="/guides">
      <div className="guide-grid listing">{guides.map((guide, index) => <GuideCard guide={guide} index={index} key={guide.slug} />)}</div>
    </Page>
  );
}

const articleBodies = {
  "blog-image-size": {
    title: "블로그 이미지, 몇 px로 올려야 선명할까?",
    lead: "이미지가 흐릿해지는 가장 흔한 이유는 원본이 너무 작거나, 플랫폼이 큰 파일을 다시 압축하기 때문입니다.",
    sections: [
      ["가장 무난한 기준", "본문 가로 이미지는 1200px을 권장합니다. 모바일에서도 충분히 선명하고, 대부분의 블로그 레이아웃에서 과도하게 크지 않습니다. 대표 이미지는 공유 카드까지 고려해 1200×630px 비율을 사용하면 편리합니다."],
      ["포맷은 어떻게 고를까?", "사진은 JPG 또는 WebP, 투명 배경이 필요한 로고와 그래픽은 PNG가 적합합니다. WebP는 같은 체감 화질에서 용량을 줄이기 좋지만, 원본 보관용 파일은 별도로 남겨 두세요."],
      ["업로드 전 체크리스트", "긴 변은 1200~1600px 사이로 맞추고, 사진 품질은 80~88%에서 시작하세요. 파일명은 IMG_001보다 cafe-interior-seoul처럼 내용을 설명하는 단어가 낫고, 대체 텍스트에는 실제 이미지 내용을 자연스럽게 적는 것이 좋습니다."],
    ],
  },
  "gif-optimization": {
    title: "화질은 지키고 GIF 용량은 줄이는 5가지 방법",
    lead: "GIF는 짧고 눈에 잘 띄지만 색상과 프레임이 쌓일수록 용량이 빠르게 커집니다. 아래 순서로 줄이면 품질 손실을 최소화할 수 있습니다.",
    sections: [
      ["1. 가장 먼저 길이를 줄이세요", "필요한 장면 앞뒤의 정지 구간부터 덜어내세요. 8초 영상을 5초로 줄이면 다른 설정을 건드리지 않아도 용량이 크게 감소합니다."],
      ["2. FPS는 10~15부터", "일반적인 사용법 안내나 화면 녹화는 12 FPS 전후로도 충분히 자연스럽습니다. 빠른 움직임이 있을 때만 15~20 FPS를 사용하세요."],
      ["3. 본문 너비에 맞추세요", "블로그 본문에서 700px로 보이는 GIF를 1920px로 만들 필요는 없습니다. 실제 표시 크기의 1~1.5배 정도면 충분합니다."],
      ["4. 한 GIF에는 한 동작만", "여러 설명을 하나의 긴 GIF에 담기보다 작업 단위로 나누면 읽는 사람도 이해하기 쉽고 페이지 로딩도 빨라집니다."],
    ],
  },
  "watermark-guide": {
    title: "사진을 해치지 않는 워터마크 위치와 투명도",
    lead: "좋은 워터마크는 눈에 거슬리지 않으면서도 이미지만 잘라 재사용하기 어렵게 만듭니다.",
    sections: [
      ["투명도는 25~45%", "흰색 또는 검은색 문자를 사용하고 사진 밝기에 맞춰 투명도를 조정하세요. 너무 옅으면 보호 효과가 없고, 너무 진하면 콘텐츠 감상을 방해합니다."],
      ["모서리에서 조금 띄우기", "가장자리에서 이미지 너비의 2~4% 정도 안쪽에 배치하면 안정적입니다. 다만 쉽게 잘라낼 수 없는 위치가 필요하다면 피사체를 피한 중앙 주변에 작은 워터마크를 두는 방법도 있습니다."],
      ["채널명을 일관되게", "블로그 주소, 활동명, 저작권 표기 중 하나를 정해 모든 이미지에 같은 글꼴과 크기로 사용하면 브랜드 인지도에도 도움이 됩니다."],
    ],
  },
};

function GuideArticle() {
  const slug = useLocation().pathname.split("/").pop();
  const article = articleBodies[slug];
  if (!article) return <NotFound />;
  return (
    <article className="article">
      <Meta title={`${article.title} | BlogToolTool`} description={article.lead} path={`/guides/${slug}`} type="article" />
      <Link className="back-link" to="/guides">← 가이드 목록</Link><span className="kicker">BLOGTOOLTOOL GUIDE</span><h1>{article.title}</h1><p className="article-lead">{article.lead}</p>
      <div className="article-body">{article.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</div>
      <div className="article-tool"><div><b>바로 작업해 보세요</b><p>설치 없이 브라우저에서 안전하게 처리할 수 있습니다.</p></div><Link className="button primary" to="/tools">무료 도구 보기 →</Link></div>
    </article>
  );
}

function Page({ title, intro, path, children }) {
  return <section className="subpage"><Meta title={`${title} | BlogToolTool`} description={intro} path={path} /><span className="kicker">BLOGTOOLTOOL</span><h1>{title}</h1><p className="subpage-intro">{intro}</p>{children}</section>;
}

function About() {
  return <Page title="블로거의 귀찮은 작업을 줄입니다" intro="BlogToolTool은 콘텐츠에 더 집중할 수 있도록 반복적인 이미지·영상 작업을 간단하게 만드는 무료 웹 도구입니다." path="/about"><div className="prose"><h2>작지만 제대로 작동하는 도구</h2><p>거대한 편집 프로그램을 켜지 않고도, 블로그에 사진 한 장을 올리기 위해 필요한 일을 빠르게 끝낼 수 있어야 한다고 생각합니다. 기능은 이해하기 쉽게, 결과물은 바로 쓸 수 있게 만듭니다.</p><h2>개인정보 보호가 기본입니다</h2><p>현재 제공하는 편집 도구는 가능한 모든 처리를 사용자의 브라우저 안에서 수행합니다. 선택한 파일을 BlogToolTool 서버에 보관하지 않습니다.</p><h2>계속 개선하겠습니다</h2><p>도구 오류나 필요한 기능이 있다면 hello@blogtooltool.com으로 알려주세요. 실제 블로그 작업에서 자주 반복되는 문제부터 개선하겠습니다.</p></div></Page>;
}

function Privacy() {
  return <Page title="개인정보처리방침" intro="시행일: 2026년 7월 28일" path="/privacy"><div className="prose policy"><h2>1. 처리하는 정보</h2><p>BlogToolTool은 도구 사용을 위한 회원가입을 요구하지 않습니다. 사용자가 선택한 이미지와 영상은 브라우저에서 처리되며 서비스 서버로 업로드하거나 저장하지 않습니다.</p><h2>2. 자동으로 수집될 수 있는 정보</h2><p>서비스 안정화와 이용 현황 파악을 위해 방문 페이지, 브라우저 유형, 접속 시간 등 비식별 이용 정보가 분석 도구를 통해 수집될 수 있습니다. 광고가 게재되는 경우 광고 제공자가 쿠키를 사용할 수 있습니다.</p><h2>3. 쿠키</h2><p>사용자는 브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있습니다. 쿠키 제한 시 일부 분석 또는 광고 기능이 정상 동작하지 않을 수 있습니다.</p><h2>4. 문의</h2><p>개인정보 관련 문의: hello@blogtooltool.com</p></div></Page>;
}

function Terms() {
  return <Page title="이용약관" intro="시행일: 2026년 7월 28일" path="/terms"><div className="prose policy"><h2>1. 서비스 이용</h2><p>BlogToolTool은 별도 고지 없이 기능을 개선·변경할 수 있습니다. 사용자는 관계 법령과 타인의 저작권을 준수하는 범위에서 도구를 이용해야 합니다.</p><h2>2. 결과물과 책임</h2><p>변환 전 원본 파일은 사용자가 직접 안전하게 보관해야 합니다. 브라우저, 기기 성능, 파일 형식에 따라 결과가 달라질 수 있으므로 중요한 작업은 결과물을 확인한 후 사용해 주세요.</p><h2>3. 금지 행위</h2><p>서비스 운영을 방해하거나, 악성 코드를 유포하거나, 타인의 권리를 침해하는 목적으로 서비스를 이용할 수 없습니다.</p><h2>4. 문의</h2><p>서비스 관련 문의: hello@blogtooltool.com</p></div></Page>;
}

function NotFound() {
  return <section className="not-found"><Meta title="페이지를 찾을 수 없습니다 | BlogToolTool" description="요청한 페이지를 찾을 수 없습니다." path="/404" noindex /><b>404</b><h1>길을 잃으셨나요?</h1><p>요청한 페이지가 없거나 주소가 변경되었습니다.</p><Link className="button primary" to="/">홈으로 돌아가기</Link></section>;
}

function ToolLayout({ children }) {
  return <div className="tool-page">{children}</div>;
}

function App() {
  const Router = window.location.hostname.endsWith("github.io") ? HashRouter : BrowserRouter;
  return (
    <Router basename={Router === BrowserRouter ? process.env.PUBLIC_URL : undefined}>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<ToolsIndex />} />
          <Route path="/tools/video-to-gif" element={<ToolLayout><GIFConverter /></ToolLayout>} />
          <Route path="/gifconverter" element={<ToolLayout><GIFConverter /></ToolLayout>} />
          <Route path="/tools/image-resizer" element={<ToolLayout><ImageController /></ToolLayout>} />
          <Route path="/tools/watermark" element={<ToolLayout><Watermark /></ToolLayout>} />
          <Route path="/watermark" element={<ToolLayout><Watermark /></ToolLayout>} />
          <Route path="/guides" element={<GuidesIndex />} />
          <Route path="/guides/:slug" element={<GuideArticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
