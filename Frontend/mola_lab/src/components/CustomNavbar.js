import { Navbar, Nav, Container } from 'react-bootstrap';

function CustomNavbar() {
  return (
    <div>
        <Navbar expand="sm" bg="dark" variant="dark">
            <Container>
              <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
              <Navbar.Brand href="/"><strong>Survey Monkey</strong></Navbar.Brand>
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/results">Results</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  );
}

export default CustomNavbar;