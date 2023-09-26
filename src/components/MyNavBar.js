import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link as ReactLink} from 'react-router-dom';
const reactLinkSt = {
  color: "white",
  textDecoration: "none",
  padding: "0.5rem 1rem",
  display: "inline-block",
  fontSize: "1.2rem",
  fontWeight: "bold",
  lineHeight: "inherit",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  cursor: "pointer",
  transition: "all 0.2s",
  borderRadius: "0.25rem",
  "&:hover": {
    color: "white",
    textDecoration: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  "&:focus": {
    color: "white",
    textDecoration: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  "&:active": {
    color: "white",
    textDecoration: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}

function MyNavBar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={process.env.PUBLIC_URL+"/"}>BlogToolTool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <ReactLink style={reactLinkSt}  to={process.env.PUBLIC_URL+"/"}>Home</ReactLink>
          <ReactLink style={reactLinkSt}  to={process.env.PUBLIC_URL+"/gifconverter"}>GIF 변환기</ReactLink>
          <NavDropdown  title="이미지 변환기" id="navbarScrollingDropdown">
            <ReactLink style={reactLinkSt} to={process.env.PUBLIC_URL+"/tab2"}>워터마크 추가</ReactLink>
          </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavBar;