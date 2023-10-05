import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PreviewCard(previewurl, filename, filesize, cardid, key){
    return(
        <Card key={cardid} style={{ width: '16rem'}}>
          <Card.Img variant="top" src={previewurl} alt = 'loading...' />
          <Card.Body>
            <Card.Title>
                {filename}
            </Card.Title>
            <Card.Text>
                파일 크기: {filesize}
            </Card.Text>
            <Button variant="primary" href={previewurl} download={filename}>
                다운로드
            </Button>
          </Card.Body>
        </Card>
    );
}

export default PreviewCard;