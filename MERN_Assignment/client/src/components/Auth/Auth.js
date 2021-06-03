import React, { useState } from 'react';
import 'date-fns';
import {  Button, Paper,Box, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


import useStyles from './styles';
import Input from './Input';
import {  MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (e,date) => {
    setSelectedDate(date);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignup) {
      console.log('isSignup')
      form['dateOFBirth']=selectedDate;
      axios({
        method: 'post',
        url:  'http://localhost:5000/user/signup',
        data: form,
      }).then(data => {
        localStorage.setItem('profile', JSON.stringify( data ));
        console.log(data);
        history.push('/')
      }).catch(err => {
        console.log(err.response.data.message);
        alert(err.response.data.message)
      })
      console.log('clicked Sign up ',form)
    } else {
      axios({
        method: 'post',
        url:  'http://localhost:5000/user/signin',
        data: form,
      }).then(data => {
        localStorage.setItem('profile', JSON.stringify( data ));
        console.log('logedIN');
        history.push('/')
      }).catch(err => {
        console.log(err.response.data.message);
        alert(err.response.data.message)
      })
    }
  };


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">{ isSignup ? 'Create New Customer Account' : 'Customer Login' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus />
              <Input name="lastName" label="Last Name" handleChange={handleChange} />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            { isSignup && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} xs={12} >
                <KeyboardDatePicker className={classes.DatePicker}
                  margin="normal" 
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            )}

            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Box display="flex" mx="auto" mt={5} justifyContent="center">
            <Box>
            <Button onClick={switchMode} variant="contained" color="primary" mx='auto'>
              { isSignup ? 'Cancel' : "Reset" }
            </Button>
          </Box>
          <Box>
            <Button type="submit"  variant="contained" color="primary" className={classes.submit}>
              { isSignup ? 'Submit' : 'Login' }
            </Button>
            {/* <Grid container justify="flex-end"> */}
              {/* <Grid item> */}
            {/* </Grid> */}
          </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;