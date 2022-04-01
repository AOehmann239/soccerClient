import React, { useState, useEffect } from 'react';
import {
  getOneSoccerTeam,
  updateSoccerTeam,
  removeSoccerTeam,
} from '../../api/soccerTeams';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Container, Card, Button } from 'react-bootstrap';
import {
  showTeamSuccess,
  showTeamFailure,
} from '../shared/AutoDismissAlert/messages';
import EditSoccerTeamModal from './EditTeamModal';

const cardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap',
};

const ShowSoccerTeam = (props) => {
  const [soccerTeam, setSoccerTeam] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { user, msgAlert } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('id in showTeam', id);
  // empty dependency array in useEffect to act like component did mount
  useEffect(() => {
    getOneSoccerTeam(id)
      .then((res) => setSoccerTeam(res.data.soccerTeam))
      .then(() => {
        msgAlert({
          heading: 'Here is the team!',
          message: showTeamSuccess,
          variant: 'success',
        });
      })
      .catch(() => {
        msgAlert({
          heading: 'No team found',
          message: showTeamFailure,
          variant: 'danger',
        });
      });
  }, [updated]);

  const removeTheTeam = () => {
    removeSoccerTeam(user, soccerTeam.id)
      .then(() => {
        msgAlert({
          heading: 'team politely removed!',
          message: 'theyre gone',
          variant: 'success',
        });
      })
      .then(() => {
        navigate(`/`);
      })
      .catch(() => {
        msgAlert({
          heading: 'something went wrong',
          message: 'that aint it',
          variant: 'danger',
        });
      });
  };

  if (!soccerTeam) {
    return (
      <Container fluid className="justify-content-center">
        <Spinner animation="border" role="status" variant="warning">
          <span className="visually-hidden">Loading....</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      <Container className="fluid">
        <Card>
          <Card.Header>{soccerTeam.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <small>Name: {soccerTeam.name}</small>
              <br />
              <small>Best Player: {soccerTeam.keyPlayer}</small>
              <br />
              <small>Rank: {soccerTeam.rank}</small>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              onClick={() => setModalOpen(true)}
              className="m-2"
              variant="warning"
            >
              Edit Team
            </Button>
            <Button
              onClick={() => removeTheTeam()}
              className="m-2"
              variant="danger"
            >
              Delete Team
            </Button>
          </Card.Footer>
        </Card>
      </Container>

      <EditSoccerTeamModal
        soccerTeam={soccerTeam}
        show={modalOpen}
        user={user}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated((prev) => !prev)}
        updateSoccerTeam={updateSoccerTeam}
        handleClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ShowSoccerTeam;
