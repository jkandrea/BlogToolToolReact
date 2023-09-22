import Container from 'react-bootstrap/Container'
import styles from '../styles/EmptyBox.module.css'
import { useState } from 'react';

function EmptyBox({ onClick, onDragOver, onDrop }) {
    const [isdragover, setIsdragover] = useState(false);

    function emptydragover(event) {
        event.preventDefault();
        setIsdragover(true);
        onDragOver(event);
    }
    function emptydrop(event) {
        event.preventDefault();
        setIsdragover(false);
        onDrop(event);
    }
    return (
        <Container className={styles.emptycontainer}
        style={{border: isdragover ? "10px solid gray" : "10px dashed gray",
        backgroundColor: isdragover ? "lightgray" : "white"}}
            onClick={onClick} 
            onDragOver={emptydragover}
            onDragLeave={() => setIsdragover(false)}
            onDrop={emptydrop}>
            <p>파일을 여기에 드래그하거나 클릭해서 업로드해주세요.</p>
        </Container>
    );
}

export default EmptyBox;