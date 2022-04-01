import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';

const TeamForm = (props) => {
  const { soccerTeam, handleChange, handleSubmit, heading } = props;

  return (
    <Container className="justify-content-center">
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder="what is your team's name?"
          value={soccerTeam.name}
          name="name"
          onChange={handleChange}
        />
        <Form.Label>Key Player</Form.Label>
        <Form.Control
          placeholder="who is the team's best player?"
          value={soccerTeam.key_player}
          name="key_player"
          onChange={handleChange}
        />
        <Form.Label>Rank</Form.Label>
        <Form.Control
          placeholder="what is your team's rank?"
          value={soccerTeam.rank}
          type="number"
          name="rank"
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default TeamForm;
