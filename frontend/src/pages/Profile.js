import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../amol.jpeg'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';

const Profile = () => {
    const [userList, setUserList] = React.useState([])
    const [data, setData] = React.useState('')
    const [image, setImage] = React.useState()

    // getting all the profiles
    React.useEffect(async () => {
        const userData = await axios.get('http://localhost:8000/students')
        setUserList(userData.data)
    }, [])

    // console.log(list);
    // fetching user profile
    React.useEffect(async () => {
        const profileData = await axios.get('http://localhost:8000/student/6121f092b0a99b35de65334d')
        setData(profileData.data)
    }, [])

    const imageUpload = (e) => {
        const formData = new FormData()
        formData.append(image, e.target.files[0])
        axios.put('http://localhost:8000/student/profile/6125c9123767230499a24038', {
            image: e.target.files[0]
        }).then((data) => console.log(data.data))
            .catch((err) => console.log(err + " this is error"))
    }

    return (
        <>
            <Container style={{ marginTop: '20px' }}>
                <Grid container border={1}>
                    <Grid item xs={0} sm={3}></Grid>
                    <Grid item xs={12} sm={2}>
                        <img src={'http://localhost:8000/' + data.profile} alt="" height="270" width="100%" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <h2 style={{ textAlign: 'center', textTransform: 'uppercase' }}>{data.name}</h2>
                        <Grid container>
                            <Grid item xs={6} sm={6}>
                                <h4 style={{ textAlign: 'center' }}>Gender :- {data.gender}</h4>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <h4 style={{ textAlign: 'center' }}>Date :- 12/3/2000</h4>
                            </Grid>
                        </Grid>
                        <h3 style={{ textAlign: 'center' }}>Email :- {data.email}</h3>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={false}
                                    id="outlined-basic"
                                    label="Profile"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
                                    type="file"
                                    onChange={imageUpload}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3} style={{ display: 'grid', justifyContent: 'right', alignContent: 'center' }}>
                                <Button variant="outlined" color="secondary">
                                    Delete
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={3} style={{ display: 'grid', justifyContent: 'left', alignContent: 'center' }}>
                                <Button variant="outlined" color="primary">
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={0} sm={3}></Grid>
                </Grid>
            </Container>

        </>
    )
}

export default Profile
