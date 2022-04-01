import React, { useState, useEffect } from 'react';
import { getAllSoccerTeams } from '../../api/soccerTeams';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  indexTeamsSuccess,
  indexTeamsFailure,
} from '../shared/AutoDismissAlert/messages';

// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap',
};

const IndexTeams = (props) => {
  const [soccerTeams, setSoccerTeams] = useState(null);

  const { user, msgAlert } = props;

  useEffect(() => {
    getAllSoccerTeams()
      .then((res) => {
        setSoccerTeams(res.data.soccerTeams);
      })
      .then(() => {
        msgAlert({
          heading: 'Found some teams!',
          message: indexTeamsSuccess,
          variant: 'success',
        });
      })
      .catch(() => {
        msgAlert({
          heading: 'No teams?!!',
          message: indexTeamsFailure,
          variant: 'danger',
        });
      });
  }, []);

  if (!soccerTeams) {
    return <p>loading...</p>;
  } else if (soccerTeams.length === 0) {
    return <p>no teams yet, go add some</p>;
  }

  let teamCards;

  if (soccerTeams.length > 0) {
    // petsJsx = pets.map(pet => (
    //     <li key={pet.id}>
    //         {pet.fullTitle}
    //     </li>
    // ))
    teamCards = soccerTeams.map((soccerTeam) => (
      // one method of styling, usually reserved for a single style
      // we can use inline, just like in html
      <Card key={soccerTeam.id} style={{ width: '30%' }} className="m-2">
        <Card.Header>{soccerTeam.name}</Card.Header>
        <Card.Body>
          <Card.Text>
            <Link to={`/soccerTeams/${soccerTeam.id}`}>
              View {soccerTeam.name}
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    ));
  }

  return (
    <>
      <h3>All the teams</h3>
      <div style={cardContainerLayout}>{teamCards}</div>
    </>
  );
};

export default IndexTeams;
