import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyNavBar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={process.env.PUBLIC_URL+"/"}>BlogToolTool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href={process.env.PUBLIC_URL+"/"}>Home</Nav.Link>
          <Nav.Link href={process.env.PUBLIC_URL+"/gifconverter"}>GIF 변환기</Nav.Link>
          <NavDropdown title="이미지 변환기" id="navbarScrollingDropdown">
            <Nav.Link href={process.env.PUBLIC_URL+"/tab2"}>워터마크 추가</Nav.Link>
          </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavBar;