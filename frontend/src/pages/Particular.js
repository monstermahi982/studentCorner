import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../amol.jpeg'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom'
import axios from 'axios'


const Particular = () => {
    let id = useParams();
    console.log('http://localhost:8000/student/' + id.id)
    const [data, setData] = React.useState('')

    React.useEffect(async () => {
        const profileData = await axios.get('http://localhost:8000/student/' + id.id)
        setData(profileData.data)
    }, [])
    return (
        <>
            <Container>
                <Grid container style={{ marginTop: '40px' }}>
                    <Grid item xs={0} sm={3}></Grid>
                    <Grid item xs={12} sm={2}>
                        <img src={'http://localhost:8000/' + data.profile} alt="" height="250" width="100%" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <h2 style={{ textAlign: 'center' }}>{data.name}</h2>
                        <Grid container>
                            <Grid item xs={6} sm={6}>
                                <h4 style={{ textAlign: 'center' }}>Gender :- {data.gender}</h4>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <h4 style={{ textAlign: 'center' }}>Date :- 12/3/2000</h4>
                            </Grid>
                        </Grid>
                        <h3 style={{ textAlign: 'center' }}>Email :- {data.email}</h3>
                    </Grid>
                    <Grid item xs={0} sm={3}></Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Particular
