import { useEffect, useState } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
// import notes from '../../data/notes';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

import axios from 'axios';
import { RootState } from '../../redux/store';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const userLogin = useSelector((state: RootState) => state.user.login);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state: RootState) => state.note.delete);

  const noteCreate = useSelector((state: RootState) => state.note.add);

  const noteUpdate = useSelector((state: RootState) => state.note.update);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
    }
  };
  const fetchNotes = async () => {
    const { data } = await axios.get('/api/notes');
    setNotes(data.default);
  };
  console.log(notes);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      <Link to='createnote'>
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          Create New Note
        </Button>
      </Link>
      <>
        {notes.map((note: any) => (
          <Accordion key={note._id}>
            {/* <Card style={{ margin: 10 }} key={note._id}>
            <Accordion.Item eventKey="0"> */}

            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                {/* <Card.Header style={{ display: 'flex' }}>
            <span style={{
              color: 'black',
              textDecoration: 'none',
              flex: 1,
              cursor: 'pointer',
              alignSelf: 'center',
              fontSize: 18,
                    }}> */}
                <span>{note.title}</span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant='danger'
                    className='mx-2'
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
                {/* </Card.Header> */}
              </Accordion.Header>
              <Accordion.Body>
                {/* <Card.Body> */}
                <h4>
                  <Badge bg='success'>Category - {note.category}</Badge>
                </h4>
                <blockquote className='blockquote mb-0'>
                  <p>{note.content}</p>
                  <footer className='blockquote-footer'>
                    Created on -date
                  </footer>
                </blockquote>

                {/* </Card.Body> */}
              </Accordion.Body>
            </Accordion.Item>
            {/* // </Card> */}
          </Accordion>
        ))}
      </>
    </MainScreen>
  );
};

export default MyNotes;
