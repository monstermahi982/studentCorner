import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../amol.jpeg'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Particular = () => {
    return (
        <>
            <Container>
                <Grid container border={1}>
                    <Grid item xs={0} sm={3}></Grid>
                    <Grid item xs={12} sm={2}>
                        <img src={logo} alt="" height="250" width="100%" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <h2 style={{ textAlign: 'center' }}>Mahesh Gaikwad</h2>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <h4 style={{ textAlign: 'center' }}>Gender :- MALE</h4>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h4 style={{ textAlign: 'center' }}>Date :- 12/3/2000</h4>
                            </Grid>
                        </Grid>
                        <h3 style={{ textAlign: 'center' }}>Email :- maheshgaikwad8892@gmail.com</h3>
                    </Grid>
                    <Grid item xs={0} sm={3}></Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Particular
