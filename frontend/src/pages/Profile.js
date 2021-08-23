import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../../public/logo512.png'

const Profile = () => {

    return (
        <>
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            image={logo}
                            title="Paella dish"
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <h4>this is grid</h4>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}

export default Profile
