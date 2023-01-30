import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { RootState } from '../redux/store';

const Header = ({ setSearch }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootState) => state.user.login);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout() as any);
    navigate('/');
  };
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
                onChange={(e) => setSearch(e.target.value)}
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
              <NavDropdown.Item onClick={logoutHandler}>
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
