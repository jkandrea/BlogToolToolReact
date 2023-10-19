import ProgressBar from 'react-bootstrap/ProgressBar';
import EmptyBox from '../components/EmptyBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import { useState, useRef } from 'react';
import GIFEncoder from 'gifencoder';
import PreviewCard from '../components/Previewcard';
import VideoRange from '../components/VideoRange';
import { Helmet } from 'react-helmet';

function GIFConverter() {
    const mobileyn = MobileCheck();

    function MobileCheck() {
        const UserAgent = navigator.userAgent;
        if (UserAgent.indexOf("Mobile") > -1) {
            return true;
        } else {
            return false;
        }
    }
    const [videourl, setVideoURL] = useState();
    const [videolength, setVideolength] = useState(0);
    const [starttime, setStarttime] = useState(0);
    const [endtime, setEndtime] = useState(0);
    const [magnification, setMagnification] = useState(50);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [vcurrenttime, setVcurrenttime] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [onair, setOnair] = useState(false);
    const [cuttedlength, setCuttedlength] = useState(0);
    const [cuttedfps, setCuttedfps] = useState(15);

    const [cards, setCards] = useState([]);

    const gifencoder = useRef(null);
    const canvas = useRef(null);
    const ctx = useRef(null);
    const captime = useRef(0);

    function VideoFileOpen() {
        const file = document.createElement("input");
        file.type = "file";
        file.accept = "video/*";
        file.onchange = function (event) {
            const file = event.target.files[0];
            setLoaded(false);
            setVideoURL(URL.createObjectURL(file));
        }
        file.click();
    }
    function VideoClick(event) {
        if (mobileyn) {
            VideoFileOpen();
        } else {
            if (event.target.paused) {
                event.target.play();
            }
            else {
                event.target.pause();
            }
        }
    }
    function VideoDragOver(event) {
        event.preventDefault();
    }
    function VideoFileDrop(event) {
        event.preventDefault();

        if (event.dataTransfer.files.length === 0) {
            return;
        }
        if (event.dataTransfer.files[0].type.indexOf("video") === -1) {
            return;
        }

        const file = event.dataTransfer.files[0];
        setLoaded(false);
        setVideoURL(URL.createObjectURL(file));
    }
    function VideoLoadedData(event) {
        setVideolength(event.target.duration);
        setStarttime(0);
        setEndtime(event.target.duration);
        document.getElementById('InputStart').value = 0;
        document.getElementById('InputEnd').value = event.target.duration;
        setWidth(Math.round(event.target.videoWidth * magnification / 100));
        setHeight(Math.round(event.target.videoHeight * magnification / 100));

        setLoaded(true);
        setOnair(false);
    }

    function Rangevalchange(event) {
        event.target.value = parseFloat(event.target.value).toFixed(1); //소수점 1자리까지만 허용
        if (event.target.id === 'InputRange1' || event.target.id === 'InputStart') {
            if (parseFloat(event.target.value) >= parseFloat(endtime)) {
                event.target.value = parseFloat(endtime) - 0.1;
            }
            setStarttime(event.target.value);
            if (event.target.id === 'InputRange1') {
                document.getElementById('InputStart').value = event.target.value;
            }
            document.getElementById('SrcVideo').currentTime = event.target.value;
            setCuttedlength(parseFloat(endtime - event.target.value).toFixed(1));
        }
        else if (event.target.id === 'InputRange2' || event.target.id === 'InputEnd') {
            if (parseFloat(event.target.value) >= parseFloat(videolength)) {
                event.target.value = videolength;
            }
            if (parseFloat(event.target.value) <= parseFloat(starttime)) {
                event.target.value = parseFloat(starttime) + 0.1;
            }
            setEndtime(event.target.value);
            if (event.target.id === 'InputRange2') {
                document.getElementById('InputEnd').value = event.target.value;
            }
            document.getElementById('SrcVideo').currentTime = starttime;
            setCuttedlength(parseFloat(event.target.value - starttime).toFixed(1));
        }
    }

    function TimeUpdate(event) {
        setVcurrenttime(event.target.currentTime);
        // if(onair){
        //     console.log(event.target.currentTime + ' ' + endtime + ' ' + captime.current);
        // }
        if (event.target.currentTime >= endtime) {
            if (onair) {
                console.log(event.target.currentTime + ' ' + endtime);
                setOnair(false);
                gifencoder.current.finish();

                const gif_url = URL.createObjectURL(new Blob([new Uint8Array(gifencoder.current.out.getData())], { type: 'image/gif' }));
                const card = PreviewCard(gif_url,
                    'BlogtooltoolGIF_' + cards.length + '.gif',
                    (gifencoder.current.out.getData().length / 1024 / 1024).toFixed(1) + 'MB',
                    'card' + cards.length
                );
                setCards([...cards, card]);
            }
            event.target.currentTime = starttime;
            if (event.target.paused) {
                event.target.play();
            }
        } else if (onair) {
            event.target.pause();
            if (event.target.currentTime >= captime.current) {
                ctx.current.drawImage(event.target, 0, 0, canvas.current.width, canvas.current.height);
                gifencoder.current.addFrame(ctx.current);
                captime.current = parseFloat(captime.current) + 1 / cuttedfps;
            }
            event.target.play();
        }
    }

    function magnificationChange(event) {
        setMagnification(event.target.value);
        setWidth(Math.round(document.getElementById('SrcVideo').videoWidth * event.target.value / 100));
        setHeight(Math.round(document.getElementById('SrcVideo').videoHeight * event.target.value / 100));
    }

    function fpsChange(event) {
        setCuttedfps(event.target.value);
    }
    function ConvertStart(event) {
        event.preventDefault();

        gifencoder.current = new GIFEncoder(width, height);
        gifencoder.current.setRepeat(0);
        gifencoder.current.setDelay(1000 / cuttedfps);

        canvas.current = document.createElement('canvas');
        canvas.current.width = width;
        canvas.current.height = height;
        ctx.current = canvas.current.getContext('2d');

        captime.current = starttime;

        gifencoder.current.start();
        const video = document.getElementById('SrcVideo');
        document.getElementById('SrcVideo').pause();
        video.pause();
        video.currentTime = starttime;
        console.log(video.currentTime, starttime);
        setOnair(true);
    }
    return (
        <>
        <Helmet>
            <title>블록툴툴 GIF 변환기</title>
        </Helmet>
        <Container>
            <Row>
                <Col>
                    <h1>GIF Converter</h1>
                    <p>Video to GIF Converter</p>
                    {videourl == null ?
                        <EmptyBox onClick={VideoFileOpen} onDragOver={VideoDragOver} onDrop={VideoFileDrop} /> :
                        <div>
                            <Container style={{ width: '100%', height: '410px', display: 'flex', justifyContent: 'center' }}
                            >
                                <video id='SrcVideo'
                                    style={
                                        {
                                            width: '100%',
                                            height: '400px',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }
                                    }
                                    src={videourl}
                                    controls={false} autoPlay={true} muted={true}
                                    onClick={VideoClick}
                                    onDragOver={VideoDragOver}
                                    onDrop={VideoFileDrop}
                                    onLoadedData={VideoLoadedData}
                                    onTimeUpdate={TimeUpdate}
                                    onEnded={TimeUpdate}
                                >
                                </video>
                            </Container>
                            <div>
                                <ProgressBar>
                                    <ProgressBar style={{ backgroundColor: 'gray' }} now={starttime} max={videolength} />
                                    <ProgressBar style={{ backgroundColor: '#5E9EDF' }} now={vcurrenttime - starttime} max={videolength} />
                                    <ProgressBar style={{ backgroundColor: '#7FAEFF' }} now={endtime - vcurrenttime} max={videolength} />
                                    <ProgressBar style={{ backgroundColor: 'gray' }} now={videolength - endtime} max={videolength} />
                                </ProgressBar>
                            </div>
                            <VideoRange maxtime={videolength} starttime={starttime} endtime={endtime} onChange={Rangevalchange} disabled={onair} />            
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column xs={3} md={2}>시작 시간(초)</Form.Label>
                                    <Col xs={3} md={2}>
                                        <Form.Control id='InputStart' type="number" step={0.001} min="0" max={videolength} onBlur={Rangevalchange} disabled={onair} />
                                    </Col>
                                    <Form.Label column xs={3} md={2}>종료 시간(초)</Form.Label>
                                    <Col xs={3} md={2}>
                                        <Form.Control id='InputEnd' type="number" step={0.001} min="0" max={videolength} onBlur={Rangevalchange} disabled={onair} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column xs={3} md={2}>FPS</Form.Label>
                                    <Col xs={3} md={2}>
                                        <Form.Control type="number" value={cuttedfps} min="0" max={videolength} onChange={fpsChange} disabled={onair} />
                                    </Col>
                                    <Form.Label column xs={3} md={2}>영상 길이(초)</Form.Label>
                                    <Col xs={3} md={2}>
                                        <Form.Control type="number" value={cuttedlength} min="0" max={videolength} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column xs={9} md={2} >배율(%)</Form.Label>
                                    <Col xs={3} md={2}>
                                        <Form.Control type="number" min="0" max="100" value={magnification} onChange={magnificationChange} disabled={onair} />
                                    </Col>
                                    <Form.Label column xs={3} md={2} >넓이</Form.Label>
                                    <Col xs={3} md={2}>
                                        <Form.Control type="number" min="0" max="100" value={width} disabled />
                                    </Col>
                                    <Form.Label column xs={3} md={2} >높이</Form.Label>
                                    <Col xs={3} md={2}>
                                        <Form.Control type="number" min="0" max="100" value={height} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Col xs={12} md={12}>
                                        <Form.Control type="submit" value="변환 시작" onClick={ConvertStart} disabled={onair} />
                                    </Col>
                                </Form.Group>
                            </Form>
                            <div>
                                <h2>변환된 GIF 목록</h2>
                                <Row>
                                    {cards}
                                </Row>
                            </div>
                        </div>
                    }
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default GIFConverter;