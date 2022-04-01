import IndexTeams from './soccerTeams/IndexTeams';

const Home = (props) => {
  // const { msgAlert, user } = props
  const { user, msgAlert } = props;

  return (
    <>
      <h2>Home Page</h2>
      <IndexTeams user={user} msgAlert={msgAlert} />
    </>
  );
};

export default Home;
