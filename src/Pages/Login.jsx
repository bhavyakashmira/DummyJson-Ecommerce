import React , {useState} from 'react';
import { Link, Button, TextField, Typography, Container, Grid, makeStyles } from '@mui/material';
import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate, NavLink } from 'react-router-dom';
import { useApi } from '../Context/Context.jsx';
import { auth } from '../Firebase/Firebase.js';


function LogInPage() {
    const navigate = useNavigate();
    const { email, setEmail, password, setPassword  } = useApi();
   
  
    const handleLogin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    };



    return (

        <Container component="main" maxWidth="xs" sx={{padding:10}} >
            <Typography variant="h2" align="center" color="primary" gutterBottom>
                LogIn
            </Typography>
            <form onSubmit={handleLogin}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <TextField
                           
                            fullWidth
                            label="Email"
                            variant="outlined"
                            required
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </Grid>
                   
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ marginTop: '1.5rem' }}
                >
                    LogIn
                </Button>
            </form>
            <Grid container justifyContent="flex-end" style={{ marginTop: '0.5rem' }}>
                <Grid item>
                    <Link href="/signin" variant="body2">
                        Sign Up
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
}

export default LogInPage;