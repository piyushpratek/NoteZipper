import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer
      style={{
        width: '100vh',
        position: 'relative',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy;Note Zipper 2022
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
