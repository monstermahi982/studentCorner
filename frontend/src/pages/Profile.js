import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { userContext } from '../App'


const Profile = () => {
    const [userList, setUserList] = React.useState([])
    const [data, setData] = React.useState('')
    const [image, setImage] = React.useState(false)
    const [load, setLoad] = React.useState(false)
    const [fileUpload, setFileUpload] = React.useState(false)
    let history = useHistory();
    const { dispatch } = React.useContext(userContext)
    const userId = sessionStorage.getItem('userId')
    const imageUploadstatus = () => {
        setFileUpload(!fileUpload)
    }

    // getting all the profiles
    React.useEffect(async () => {
        const userData = await axios.get('http://localhost:8000/students')
        setUserList(userData.data)
        return { userData }
    }, [])

    // console.log(list);
    // fetching user profile
    React.useEffect(async () => {
        const profileData = await axios.get('http://localhost:8000/student/' + userId)
        setData(profileData.data)
        return { profileData }
    }, [image])

    const imageUpload = (e) => {
        setLoad(true)
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        fetch('http://localhost:8000/student/profile/' + userId, {
            method: "put",
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                setImage(!image)
                setLoad(false)
                imageUploadstatus()
            })
            .catch((e) => {
                console.log(e + "failed error")
                setLoad(false)
            });
    }

    const particularPost = async (e) => {
        history.push('/student/' + e.target.id)
    }

    const logout = () => {
        setLoad(true)
        sessionStorage.clear()
        dispatch({ type: "USER", payload: false })
        setLoad(false)
    }

    return (
        <>
            <Container style={{ marginTop: '30px' }}>
                <Snackbar open={fileUpload} autoHideDuration={5000} onClose={imageUploadstatus} >
                    <Alert onClose={imageUploadstatus} severity="success">Image Updated Successfully</Alert>
                </Snackbar>

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
                                    <Grid item xs={4} sm={2} style={{ display: 'grid', justifyContent: 'right', alignContent: 'center' }}>
                                        <Button variant="outlined" color="secondary">
                                            <DeleteIcon />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={2} style={{ display: 'grid', justifyContent: 'left', alignContent: 'center' }}>
                                        <Button variant="outlined" color="primary">
                                            <EditIcon />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={2} style={{ display: 'grid', justifyContent: 'left', alignContent: 'center' }}>
                                        <Button variant="outlined" color="secondary" onClick={logout}>
                                            <ExitToAppIcon color="secondary" />
                                        </Button>
                                    </Grid>
                                </Grid>
                                {load ? <LinearProgress /> : ""}
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
                                    userList.filter(filterData => filterData.id !== userId).map((name, index) => (
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
                                                    <RemoveRedEye color="primary" onClick={particularPost} id={name.id} />
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
