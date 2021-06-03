import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid , Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import gragphImage from './../../images/graphs.png'


const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const history = useHistory();


  useEffect(() => {
    let profile=localStorage.getItem('profile')
    if(!profile){
      history.push('/auth')
    }
  }, []);

  let LogoutUser=()=>{
    history.push('/auth');
    localStorage.clear()
  }

  return (
    <Grow in>
      <Container>
        <Grid container justify="flex-end" style={{marginTop: '30px'}}>
          <Button onClick={LogoutUser} variant="contained" color="primary" mx='auto'>
            Logout
          </Button>
        </Grid>
        <Grid justify="center" style={{marginTop: '30px'}} xs={12} >
          <img src={gragphImage} alt="gragphImage"/>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;