import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { register } from '../../actions/userActions';

export const GUEST_CREADENTIALS = {
  name: 'Guest 1',
  email: 'guest1@guest.com',
  password: '123456',
};
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pic, setPic] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  );
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [picMessage, setPicMessage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state: RootState) => state.user.register);
  const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/mynotes');
    }
  }, [userInfo]);

  const handleGuestCredentials = () => {
    setEmail(GUEST_CREADENTIALS.email);
    setName(GUEST_CREADENTIALS.name);
    setPassword(GUEST_CREADENTIALS.password);
    setConfirmPassword(GUEST_CREADENTIALS.password);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage('Password do not Match');
    } else {
      dispatch(register(name, email, password, pic) as any);
    }
  };

  const postDetails = (pics: any) => {
    if (!pics) {
      return setPicMessage('Please Select an Image');
    }
    setPicMessage(null);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'notezipper');
      data.append('cloud_name', 'dd22mrihi');
      fetch('https://api.cloudinary.com/v1_1/dd22mrihi/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res: any) => res.json())
        .then((data) => {
          console.log(data);

          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage('Please Select an Image');
    }
  };

  return (
    <div>
      <MainScreen title='REGISTER'>
        <div className='loginContainer'>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                value={name}
                placeholder='Enter Name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                value={email}
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='confirmpassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                value={confirmpassword}
                placeholder='Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {picMessage && (
              <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
            )}

            <Form.Group controlId='pic' className='mb-3'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                onChange={(e: any) => postDetails(e.target.files[0])}
                type='file'
                id='custom-file'
                // type='image/png'
                // label="Upload Profile Picture"
                // custom
              />
            </Form.Group>

            <Button variant='primary' className='m-2' type='submit'>
              Submit
            </Button>
            <Button
              variant='primary'
              className='m-2'
              onClick={handleGuestCredentials}
            >
              Use Guest Credentials
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Have an Account ? <Link to='/login'>Login</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </div>
  );
};

export default RegisterScreen;
