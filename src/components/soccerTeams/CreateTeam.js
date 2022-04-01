import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { createSoccerTeam } from '../../api/soccerTeams';
import {
  createTeamSuccess,
  createTeamFailure,
} from '../shared/AutoDismissAlert/messages';
import { useNavigate } from 'react-router-dom';
import TeamForm from '../shared/TeamForm';

// create renders a form and calls createTeam function
// maybe redirect(navigate) to the new team show page
// props we'll need are user, msgAlert
const CreateSoccerTeam = (props) => {
  const { user, msgAlert } = props;
  console.log('user in create', user);
  const navigate = useNavigate();
  // we'll need two states
  const [soccerTeam, setSoccerTeam] = useState({
    name: '',
    type: '',
    age: '',
    adoptable: false,
  });
  console.log('team in create', soccerTeam);
  //  an empty team object
  // and a createdId (used to navigate)
  // we'll need handleChange and handleSubmit funcs
  const handleChange = (e) => {
    // e === event
    e.persist();

    setSoccerTeam((prevTeam) => {
      const name = e.target.name;
      let value = e.target.value;
      console.log('etarget type', e.target.type);
      console.log('this is e.target checked', e.target.checked);

      if (e.target.type === 'number') {
        value = parseInt(e.target.value);
      }

      const updatedValue = { [name]: value };

      console.log('prevTeam', prevTeam);
      console.log('updatedValue', updatedValue);

      return { ...prevTeam, ...updatedValue };
    });
  };

  const handleSubmit = (e) => {
    // e === event
    e.preventDefault();

    createSoccerTeam(user, soccerTeam)
      // if create is successful, we should navigate to the show page
      .then((res) => {
        navigate(`/soccerTeams/${res.data.soccerTeam.id}`);
      })
      // then we send a success message
      .then(() =>
        msgAlert({
          heading: 'Team Added! Success!',
          message: createTeamSuccess,
          variant: 'success',
        })
      )
      // if there is an error, we'll send an error message
      .catch(() =>
        msgAlert({
          heading: 'Oh No!',
          message: createTeamFailure,
          variant: 'danger',
        })
      );
  };

  return (
    <TeamForm
      soccerTeam={soccerTeam}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      heading="Add new team!"
    />
  );
};

export default CreateSoccerTeam;
