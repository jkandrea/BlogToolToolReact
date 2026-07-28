import { useEffect, useRef, useState } from "react";
import Meta from "../components/Meta";

function ImageController() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState("");
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(630);
  const [ratio, setRatio] = useState(1200 / 630);
  const [locked, setLocked] = useState(true);
  const [quality, setQuality] = useState(85);
  const [format, setFormat] = useState("image/webp");
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => () => {
    if (src) URL.revokeObjectURL(src);
    if (result?.url) URL.revokeObjectURL(result.url);
  }, [src, result]);

  function loadFile(nextFile) {
    if (!nextFile || !nextFile.type.startsWith("image/")) return;
    const url = URL.createObjectURL(nextFile);
    const image = new Image();
    image.onload = () => {
      const nextWidth = Math.min(image.naturalWidth, 1600);
      const nextRatio = image.naturalWidth / image.naturalHeight;
      setWidth(nextWidth);
      setHeight(Math.round(nextWidth / nextRatio));
      setRatio(nextRatio);
      setFile(nextFile);
      setSrc(url);
      setResult(null);
    };
    image.src = url;
  }

  function changeWidth(value) {
    const next = Math.max(1, Number(value));
    setWidth(next);
    if (locked) setHeight(Math.max(1, Math.round(next / ratio)));
  }

  function changeHeight(value) {
    const next = Math.max(1, Number(value));
    setHeight(next);
    if (locked) setWidth(Math.max(1, Math.round(next * ratio)));
  }

  function convert() {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        if (result?.url) URL.revokeObjectURL(result.url);
        setResult({ url: URL.createObjectURL(blob), size: blob.size, blob });
      }, format, quality / 100);
    };
    image.src = src;
  }

  function download() {
    if (!result) return;
    const ext = format.split("/")[1].replace("jpeg", "jpg");
    const anchor = document.createElement("a");
    anchor.href = result.url;
    anchor.download = `${file.name.replace(/\.[^.]+$/, "")}-${width}x${height}.${ext}`;
    anchor.click();
  }

  return (
    <>
      <Meta title="무료 이미지 리사이즈·WebP 변환 | BlogToolTool" description="이미지 크기와 품질을 조절하고 JPG, PNG, WebP로 변환하세요. 파일 업로드 없이 브라우저에서 무료로 처리합니다." path="/tools/image-resizer" />
      <header className="tool-header"><span className="tool-badge">IMAGE TOOL</span><h1>이미지 리사이즈</h1><p>블로그와 SNS에 딱 맞는 크기와 포맷으로 바꿔보세요.</p><p className="privacy-inline">✓ 이미지가 서버로 전송되지 않아요</p></header>
      <section className="tool-workspace">
        {!src ? (
          <div className={dragging ? "drop-zone dragging" : "drop-zone"} onClick={() => inputRef.current.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); loadFile(event.dataTransfer.files[0]); }}>
            <input ref={inputRef} hidden type="file" accept="image/*" onChange={(event) => loadFile(event.target.files[0])} />
            <span className="upload-icon">↗</span><h2>이미지를 끌어다 놓으세요</h2><p>JPG, PNG, WebP 파일 · 최대 크기는 브라우저 환경에 따라 달라요</p><button className="button primary" type="button">이미지 선택하기</button>
          </div>
        ) : (
          <div className="editor-grid">
            <div className="preview-pane"><img src={result?.url || src} alt="변환할 이미지 미리보기" /></div>
            <div className="control-pane">
              <h2>출력 설정</h2>
              <div className="field-row">
                <div className="field"><label htmlFor="image-width">너비 (px)</label><input id="image-width" type="number" min="1" max="8000" value={width} onChange={(event) => changeWidth(event.target.value)} /></div>
                <div className="field"><label htmlFor="image-height">높이 (px)</label><input id="image-height" type="number" min="1" max="8000" value={height} onChange={(event) => changeHeight(event.target.value)} /></div>
              </div>
              <div className="field"><label><span>비율 유지</span><input type="checkbox" checked={locked} onChange={() => setLocked(!locked)} /></label></div>
              <div className="field"><label htmlFor="image-format">파일 형식</label><select id="image-format" value={format} onChange={(event) => setFormat(event.target.value)}><option value="image/webp">WebP — 가볍고 선명함</option><option value="image/jpeg">JPG — 사진에 적합</option><option value="image/png">PNG — 투명 배경 지원</option></select></div>
              <div className="field"><label htmlFor="image-quality"><span>품질</span><output>{quality}%</output></label><input id="image-quality" type="range" min="30" max="100" value={quality} onChange={(event) => setQuality(event.target.value)} /></div>
              {!result ? <button className="button primary full" onClick={convert}>이미지 변환하기 →</button> : <button className="button primary full" onClick={download}>결과 다운로드 ↓</button>}
              {result && <p className="status-note">완료 · {(result.size / 1024).toFixed(0)} KB</p>}
              <button className="button secondary full" style={{marginTop: 10}} onClick={() => { setSrc(""); setFile(null); setResult(null); }}>다른 이미지 선택</button>
            </div>
          </div>
        )}
      </section>
      <div className="tool-explainer"><div><b>WebP가 좋은 이유</b><p>JPG보다 작은 용량으로 비슷한 체감 화질을 유지해 블로그 로딩 속도 개선에 유리합니다.</p></div><div><b>권장 블로그 너비</b><p>본문 이미지는 1200px 전후면 모바일과 데스크톱에서 모두 충분히 선명합니다.</p></div><div><b>개인정보 보호</b><p>이미지는 브라우저 메모리에서만 처리되며 페이지를 닫으면 작업 데이터가 사라집니다.</p></div></div>
    </>
  );
}

export default ImageController;
