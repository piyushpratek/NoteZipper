import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../actions/userActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { RootState } from '../../redux/store';
import './profileScreen.css';
import { UserInfo } from 'os';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = ({ location }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pic, setPic] = useState<string | undefined>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picMessage, setPicMessage] = useState<null | undefined | string>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state: RootState) => state.user.login);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state: RootState) => state.user.update);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

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

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password, pic }) as any);
  };
  const handleChange =
    (e: ChangeEvent<HTMLInputElement>) => (e: { target: { files: any[] } }) =>
      postDetails(e.target.files[0]);

  return (
    <MainScreen title='EDIT PROFILE'>
      <div>
        <Row className='profileContainer'>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant='success'>
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{' '}
              {picMessage && (
                <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
              )}
              <div>
                <Form.Group controlId='pic'>
                  <Form.Label>Change Profile Picture</Form.Label>
                  <div className='mb-3'>
                    <input
                      className='form-control'
                      type='file'
                      id='custom-file'
                      // label='Upload Profile Picture'
                      // type='image/png'
                      // custom
                      onChange={handleChange}
                    ></input>
                  </div>
                </Form.Group>
              </div>
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={pic} alt={name} className='profilePic' />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
