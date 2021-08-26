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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/RemoveRedEye';
import { useHistory } from "react-router-dom";


function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Profile = () => {
    const [userList, setUserList] = React.useState([])
    const [data, setData] = React.useState('')
    const [image, setImage] = React.useState(false)
    let history = useHistory();

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
    }, [image])

    const imageUpload = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        fetch('http://localhost:8000/student/profile/6121f092b0a99b35de65334d', {
            method: "put",
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setImage(!image)
            })
            .catch((e) => console.log(e + "failed error"));
    }

    const particularPost = async (e) => {
        history.push('/student/' + e.target.id)
    }

    return (
        <>
            <Container style={{ marginTop: '20px' }}>
                <Grid container border={1}>
                    <Grid item xs={12} sm={8}>

                        <Grid container>
                            <Grid item xs={12} sm={4}>
                                <img src={'http://localhost:8000/' + data.profile} alt="" height="270" width="100%" />
                            </Grid>
                            <Grid item xs={12} sm={8}>
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
                        </Grid>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">
                            OTHER STUDENTS :=
                        </Typography>
                        <div>
                            <List >
                                {
                                    userList.map((name, index) => (
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <img src={'http://localhost:8000/' + name.profile} alt="" />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={name.name}
                                                secondary={name.gender}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon onClick={particularPost} id={name.id} />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}

export default Profile
