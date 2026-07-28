import { useEffect, useRef, useState } from "react";
import GIF from "gif.js";
import Meta from "../components/Meta";

function seekVideo(video, time) {
  return new Promise((resolve) => {
    const done = () => { video.removeEventListener("seeked", done); resolve(); };
    video.addEventListener("seeked", done);
    video.currentTime = Math.min(time, video.duration);
  });
}

function GIFConverter() {
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const cancelRef = useRef(false);
  const [src, setSrc] = useState("");
  const [fileName, setFileName] = useState("blogtooltool");
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [fps, setFps] = useState(10);
  const [scale, setScale] = useState(50);
  const [progress, setProgress] = useState(0);
  const [working, setWorking] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => () => {
    cancelRef.current = true;
    if (src) URL.revokeObjectURL(src);
    if (result?.url) URL.revokeObjectURL(result.url);
  }, [src, result]);

  function loadFile(file) {
    if (!file || !file.type.startsWith("video/")) return;
    if (src) URL.revokeObjectURL(src);
    setSrc(URL.createObjectURL(file));
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    setResult(null);
    setError("");
  }

  function loaded(event) {
    const length = event.currentTarget.duration;
    setDuration(length);
    setStart(0);
    setEnd(Math.min(length, 6));
  }

  async function convert() {
    const video = videoRef.current;
    if (!video || end <= start) return;
    const clipLength = end - start;
    const frames = Math.ceil(clipLength * fps);
    if (frames > 180) {
      setError("원활한 변환을 위해 길이와 FPS를 조절해 180프레임 이하로 만들어 주세요.");
      return;
    }
    setError("");
    setWorking(true);
    setProgress(0);
    cancelRef.current = false;
    video.pause();
    const width = Math.max(2, Math.round(video.videoWidth * scale / 100 / 2) * 2);
    const height = Math.max(2, Math.round(video.videoHeight * scale / 100 / 2) * 2);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    try {
      const encoder = new GIF({
        workers: 2,
        quality: 10,
        width,
        height,
        workerScript: `${process.env.PUBLIC_URL}/gif.worker.js`,
      });
      for (let frame = 0; frame < frames; frame += 1) {
        if (cancelRef.current) throw new Error("cancelled");
        await seekVideo(video, start + frame / fps);
        context.drawImage(video, 0, 0, width, height);
        encoder.addFrame(context, { copy: true, delay: 1000 / fps });
        setProgress(Math.round(((frame + 1) / frames) * 100));
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      const blob = await new Promise((resolve, reject) => {
        encoder.on("finished", resolve);
        encoder.on("abort", () => reject(new Error("cancelled")));
        encoder.render();
      });
      setResult({ url: URL.createObjectURL(blob), size: blob.size, width, height });
    } catch (conversionError) {
      if (conversionError.message !== "cancelled") setError("이 영상을 변환하지 못했습니다. MP4(H.264) 또는 WebM 형식으로 다시 시도해 주세요.");
    } finally {
      setWorking(false);
    }
  }

  function download() {
    const anchor = document.createElement("a");
    anchor.href = result.url;
    anchor.download = `${fileName}.gif`;
    anchor.click();
  }

  function reset() {
    cancelRef.current = true;
    setSrc("");
    setResult(null);
    setProgress(0);
    setError("");
  }

  const estimatedFrames = Math.ceil(Math.max(0, end - start) * fps);
  return (
    <>
      <Meta title="동영상 GIF 변환 — 무료·워터마크 없음 | BlogToolTool" description="MP4와 WebM 영상에서 원하는 구간을 잘라 GIF로 변환하세요. 워터마크와 서버 업로드 없이 브라우저에서 무료로 만들 수 있습니다." path="/tools/video-to-gif" />
      <header className="tool-header"><span className="tool-badge">VIDEO TOOL</span><h1>동영상을 GIF로</h1><p>필요한 구간만 골라 블로그에 바로 쓸 수 있는 GIF를 만드세요.</p><p className="privacy-inline">✓ 영상이 서버로 전송되지 않아요</p></header>
      <section className="tool-workspace">
        {!src ? (
          <div className="drop-zone" onClick={() => inputRef.current.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); loadFile(event.dataTransfer.files[0]); }}>
            <input ref={inputRef} hidden type="file" accept="video/mp4,video/webm,video/*" onChange={(event) => loadFile(event.target.files[0])} />
            <span className="upload-icon">▶</span><h2>동영상을 끌어다 놓으세요</h2><p>MP4, WebM 등 브라우저에서 재생 가능한 영상</p><button className="button primary" type="button">동영상 선택하기</button>
          </div>
        ) : (
          <>
            <div className="editor-grid">
              <div className="preview-pane">{result ? <img src={result.url} alt="변환된 GIF 미리보기" /> : <video ref={videoRef} src={src} controls muted playsInline onLoadedMetadata={loaded} />}</div>
              <div className="control-pane">
                <h2>{result ? "GIF 완성" : "변환 설정"}</h2>
                {result ? (
                  <>
                    <div className="field"><label>결과 크기</label><p>{result.width} × {result.height}px · {(result.size / 1024 / 1024).toFixed(2)} MB</p></div>
                    <button className="button primary full" onClick={download}>GIF 다운로드 ↓</button>
                    <button className="button secondary full" style={{marginTop:10}} onClick={() => setResult(null)}>설정 다시 조절</button>
                    <button className="button secondary full" style={{marginTop:10}} onClick={reset}>다른 영상 선택</button>
                  </>
                ) : (
                  <>
                    <div className="field-row">
                      <div className="field"><label htmlFor="gif-start">시작 (초)</label><input id="gif-start" type="number" min="0" max={end} step=".1" value={start} disabled={working} onChange={(event) => setStart(Math.max(0, Number(event.target.value)))} /></div>
                      <div className="field"><label htmlFor="gif-end">종료 (초)</label><input id="gif-end" type="number" min={start} max={duration} step=".1" value={end} disabled={working} onChange={(event) => setEnd(Math.min(duration, Number(event.target.value)))} /></div>
                    </div>
                    <div className="field"><label htmlFor="gif-fps"><span>부드러움 (FPS)</span><output>{fps} FPS</output></label><input id="gif-fps" type="range" min="5" max="20" value={fps} disabled={working} onChange={(event) => setFps(Number(event.target.value))} /></div>
                    <div className="field"><label htmlFor="gif-scale"><span>출력 크기</span><output>{scale}%</output></label><input id="gif-scale" type="range" min="20" max="100" step="5" value={scale} disabled={working} onChange={(event) => setScale(Number(event.target.value))} /></div>
                    <p className="status-note">{(end - start).toFixed(1)}초 · 약 {estimatedFrames}프레임 {estimatedFrames > 180 && "· 설정을 줄여주세요"}</p>
                    {error && <p style={{color:"#b83b2c",fontSize:11,lineHeight:1.5}}>{error}</p>}
                    <button className="button primary full" disabled={working || estimatedFrames < 1 || estimatedFrames > 180} onClick={convert}>{working ? `변환 중 ${progress}%` : "GIF 만들기 →"}</button>
                    {working ? <button className="button secondary full" style={{marginTop:10}} onClick={() => { cancelRef.current = true; }}>취소</button> : <button className="button secondary full" style={{marginTop:10}} onClick={reset}>다른 영상 선택</button>}
                  </>
                )}
              </div>
            </div>
            {working && <div className="progress-wrap"><div className="progress-track"><div className="progress-bar" style={{width:`${progress}%`}} /></div></div>}
          </>
        )}
      </section>
      <div className="tool-explainer"><div><b>용량을 줄이려면</b><p>먼저 영상 길이를 줄이고, 그다음 출력 크기와 FPS를 낮추는 순서가 가장 효과적입니다.</p></div><div><b>추천 설정</b><p>블로그 사용법 안내는 5초 이내, 10~12 FPS, 원본 크기의 40~60%를 권장합니다.</p></div><div><b>작업 중에는</b><p>브라우저가 프레임을 하나씩 만들기 때문에 고해상도 영상은 잠시 시간이 걸릴 수 있습니다.</p></div></div>
    </>
  );
}

export default GIFConverter;
