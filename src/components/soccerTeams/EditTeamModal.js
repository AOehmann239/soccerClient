import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import TeamForm from '../shared/TeamForm';

const EditSoccerTeamModal = (props) => {
  const { user, show, handleClose, updateTeam, msgAlert, triggerRefresh } =
    props;
  const [soccerTeam, setSoccerTeam] = useState(props.soccerTeam);

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

    console.log('the team to submit', soccerTeam);
    updateTeam(user, soccerTeam)
      // if create is successful, we should navigate to the show page
      .then(() => handleClose())
      // then we send a success message
      .then(() =>
        msgAlert({
          heading: 'Team Updated! Success!',
          message: 'u did it',
          variant: 'success',
        })
      )
      .then(() => triggerRefresh())
      // if there is an error, we'll send an error message
      .catch(() =>
        msgAlert({
          heading: 'Oh No!',
          message: 'that aint it',
          variant: 'danger',
        })
      );
    console.log('this is the team', soccerTeam);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <TeamForm
          soccerTeam={soccerTeam}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          heading="Edit team!"
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditSoccerTeamModal;
