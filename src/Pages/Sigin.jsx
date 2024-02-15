import React , {useState} from 'react';
import { Link, Button, TextField, Typography, Container, Grid, makeStyles } from '@mui/material';
import { UseNavigate ,NavLink, useNavigate } from 'react-router-dom';
import app from 'firebase/app';
import { auth } from '../Firebase/Firebase.js';
import { useApi } from '../Context/Context.jsx';
import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword
} from "firebase/auth";

function SignInPage() {
    
    const { email , setEmail , password , setPassword ,setusername , username} = useApi();

 
    const navigate = useNavigate();
    const handleSignIn = async (e) => {
        e.preventDefault()
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log(user);
                navigate("/")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

            });
    };

    



    return (
        <Container component="main" maxWidth="xs"  >
            <Typography  variant="h2" align="center" color="primary" gutterBottom>
                Sign In
            </Typography>
            <form onSubmit={handleSignIn}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            required
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            required
                            autoFocus
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    Sign In
                </Button>
            </form>
            <Grid container justifyContent="flex-end" style={{ marginTop: '0.5rem' }}>
                <Grid item>
                    <Link href="/login" variant="body2">
                      Login here                  </Link>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignInPage;

