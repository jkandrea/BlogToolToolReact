import Container from "react-bootstrap/esm/Container";
import videorangestyle from '../styles/VideoRange.module.css';

function VideoRange({ maxtime, starttime, endtime, onChange, abled }) {
    return (
        // <Container style={{ width: '100%', height: '30px'
        // , display: 'flex', justifyContent: 'center'
        // , position : 'relative', top : '0px', left : '0px'
        // }}>
        <Container className={videorangestyle.videorangecontainer}>
            <input id='InputRange1' type="range" step={0.001}
                min="0" max={maxtime} value={starttime} onChange={onChange} disabled={abled} />
            <input id='InputRange2' type="range" step={0.001}
                min="0" max={maxtime} value={endtime} onChange={onChange} disabled={abled} />
        </Container>
    );
}
export default VideoRange;