import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg='primary' expand='lg' variant='dark'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>Note Zipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            <Form className='d-flex'>
              <Form.Control
                type='Search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
              />
            </Form>
          </Nav>
          <Nav className='me-auto'>
            <Nav.Link href='/mynotes'>
              <Link to='/mynotes'>My Notes</Link>
            </Nav.Link>

            <NavDropdown title='Piyush Prateek' id='basic-nav-dropdown'>
              <NavDropdown.Item>
                <Link to='/myprofile'>My Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem('userInfo');
                  navigate('/');
                }}
              >
                LogOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
