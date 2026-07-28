import { useCallback, useEffect, useRef, useState } from "react";
import Meta from "../components/Meta";

function Watermark() {
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const [src, setSrc] = useState("");
  const [fileName, setFileName] = useState("image");
  const [text, setText] = useState("© BlogToolTool");
  const [opacity, setOpacity] = useState(55);
  const [size, setSize] = useState(5);
  const [position, setPosition] = useState("bottom-right");
  const [color, setColor] = useState("#ffffff");
  const [ready, setReady] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => () => { if (src) URL.revokeObjectURL(src); }, [src]);
  const draw = useCallback(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    const fontSize = Math.max(14, Math.round(canvas.width * size / 100));
    const padding = Math.round(canvas.width * .035);
    ctx.font = `700 ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity / 100;
    ctx.shadowColor = color === "#ffffff" ? "rgba(0,0,0,.55)" : "rgba(255,255,255,.5)";
    ctx.shadowBlur = Math.max(2, fontSize / 12);
    const metrics = ctx.measureText(text);
    const placements = {
      "top-left": [padding, padding + fontSize],
      "top-right": [canvas.width - metrics.width - padding, padding + fontSize],
      "center": [(canvas.width - metrics.width) / 2, (canvas.height + fontSize) / 2],
      "bottom-left": [padding, canvas.height - padding],
      "bottom-right": [canvas.width - metrics.width - padding, canvas.height - padding],
    };
    ctx.fillText(text, ...placements[position]);
    ctx.globalAlpha = 1;
  }, [color, opacity, position, size, text]);

  useEffect(() => { if (ready) draw(); }, [draw, ready]);

  function loadFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      imageRef.current = image;
      setSrc(url);
      setFileName(file.name.replace(/\.[^.]+$/, ""));
      setReady(true);
    };
    image.src = url;
  }

  function download() {
    const anchor = document.createElement("a");
    anchor.download = `${fileName}-watermarked.png`;
    anchor.href = canvasRef.current.toDataURL("image/png");
    anchor.click();
  }

  return (
    <>
      <Meta title="사진 워터마크 넣기 — 무료·업로드 없음 | BlogToolTool" description="사진에 텍스트 워터마크를 간편하게 추가하세요. 위치, 크기, 색상, 투명도를 조절하고 서버 업로드 없이 다운로드할 수 있습니다." path="/tools/watermark" />
      <header className="tool-header"><span className="tool-badge">BRAND TOOL</span><h1>워터마크 넣기</h1><p>사진을 해치지 않으면서 내 콘텐츠를 보호하세요.</p><p className="privacy-inline">✓ 사진이 서버로 전송되지 않아요</p></header>
      <section className="tool-workspace">
        {!src ? (
          <div className="drop-zone" onClick={() => inputRef.current.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); loadFile(event.dataTransfer.files[0]); }}>
            <input ref={inputRef} hidden type="file" accept="image/*" onChange={(event) => loadFile(event.target.files[0])} />
            <span className="upload-icon">◈</span><h2>워터마크를 넣을 사진을 선택하세요</h2><p>JPG, PNG, WebP 파일을 지원합니다</p><button className="button primary" type="button">사진 선택하기</button>
          </div>
        ) : (
          <div className="editor-grid">
            <div className="preview-pane"><canvas ref={canvasRef} style={{maxWidth:"100%", maxHeight:440}} aria-label="워터마크 결과 미리보기" /></div>
            <div className="control-pane">
              <h2>워터마크 설정</h2>
              <div className="field"><label htmlFor="watermark-text">표시할 문구</label><input id="watermark-text" type="text" value={text} maxLength="60" onChange={(event) => setText(event.target.value)} /></div>
              <div className="field-row">
                <div className="field"><label htmlFor="watermark-position">위치</label><select id="watermark-position" value={position} onChange={(event) => setPosition(event.target.value)}><option value="bottom-right">오른쪽 아래</option><option value="bottom-left">왼쪽 아래</option><option value="top-right">오른쪽 위</option><option value="top-left">왼쪽 위</option><option value="center">가운데</option></select></div>
                <div className="field"><label htmlFor="watermark-color">색상</label><select id="watermark-color" value={color} onChange={(event) => setColor(event.target.value)}><option value="#ffffff">흰색</option><option value="#171814">검은색</option><option value="#ff6b4a">코랄</option></select></div>
              </div>
              <div className="field"><label htmlFor="watermark-size"><span>크기</span><output>{size}%</output></label><input id="watermark-size" type="range" min="2" max="15" value={size} onChange={(event) => setSize(event.target.value)} /></div>
              <div className="field"><label htmlFor="watermark-opacity"><span>투명도</span><output>{opacity}%</output></label><input id="watermark-opacity" type="range" min="10" max="100" value={opacity} onChange={(event) => setOpacity(event.target.value)} /></div>
              <button className="button primary full" onClick={download}>PNG로 다운로드 ↓</button>
              <button className="button secondary full" style={{marginTop:10}} onClick={() => { setSrc(""); setReady(false); }}>다른 사진 선택</button>
            </div>
          </div>
        )}
      </section>
      <div className="tool-explainer"><div><b>권장 투명도</b><p>사진을 방해하지 않으면서 식별할 수 있는 25~45%부터 조절해 보세요.</p></div><div><b>안전한 위치</b><p>모서리에서 2~4% 안쪽에 배치하면 안정적입니다. 도용 방지가 중요하면 중앙 주변도 고려하세요.</p></div><div><b>원본 보관</b><p>다운로드 결과는 PNG입니다. 편집 전 원본은 별도로 안전하게 보관해 주세요.</p></div></div>
    </>
  );
}

export default Watermark;
