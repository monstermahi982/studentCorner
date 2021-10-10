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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
    const [userList, setUserList] = React.useState([])
    const [data, setData] = React.useState('')
    const [image, setImage] = React.useState(false)
    const [load, setLoad] = React.useState(false)
    const [fileUpload, setFileUpload] = React.useState(false)
    let history = useHistory();
    const { dispatch } = React.useContext(userContext)
    const userId = sessionStorage.getItem('userId')
    const [open, setOpen] = React.useState(false);
    const [name, setname] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [updateProfileCheck, setUpdateProfileCheck] = React.useState(false)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const imageUploadstatus = () => {
        setFileUpload(!fileUpload)
    }

    const getlistdata = async () => {
        const userData = await axios.get('http://localhost:8000/students')
        setUserList(userData.data)
    }

    const getprfiledata = async () => {
        const profileData = await axios.get('http://localhost:8000/student/' + userId)
        setData(profileData.data)
        setname(profileData.data.name)
        setEmail(profileData.data.email)
    }

    // getting all the profiles
    React.useEffect(() => {
        getlistdata()
        return { getlistdata }
    }, [])

    // console.log(list);
    // fetching user profile
    React.useEffect(() => {
        getprfiledata()
        return { getprfiledata }
    }, [image, load])

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

    const updateProfile = async () => {
        setLoad(true)
        if (email === '' || name === '') {
            alert('file')
            setOpen(false)
            setLoad(false)
            return
        }
        await axios.put('http://localhost:8000/student/' + userId, {
            "name": name,
            "email": email
        })
        setOpen(false);
        profileUpdate()
        setLoad(false)

    }

    const deleteProfile = async () => {
        setLoad(true)
        await axios.delete('http://localhost:8000/student/' + userId)
        setLoad(false)
        logout()
    }

    const profileUpdate = () => {
        setUpdateProfileCheck(!updateProfileCheck)
    }
    return (
        <>
            <Container style={{ marginTop: '30px' }}>
                <Snackbar open={fileUpload} autoHideDuration={5000} onClose={imageUploadstatus} >
                    <Alert onClose={imageUploadstatus} severity="success">Image Updated Successfully</Alert>
                </Snackbar>
                <Snackbar open={updateProfileCheck} autoHideDuration={5000} onClose={profileUpdate} >
                    <Alert onClose={profileUpdate} severity="success">Profile Updated Successfully</Alert>
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
                                        <h3 style={{ textAlign: 'center' }}>Gender :- {data.gender}</h3>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <h3 style={{ textAlign: 'center' }}>Date :- 12/3/2000</h3>
                                    </Grid>
                                </Grid>
                                <h2 style={{ textAlign: 'center' }}>Email :- {data.email}</h2>
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
                                        <Button variant="outlined" color="secondary" onClick={deleteProfile}>
                                            <DeleteIcon />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={2} style={{ display: 'grid', justifyContent: 'left', alignContent: 'center' }}>
                                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                            <EditIcon />
                                        </Button>
                                        <Dialog
                                            open={open}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle id="alert-dialog-slide-title">{data.name + " Update Your Profile"}</DialogTitle>
                                            <DialogContent>
                                                <Grid container>
                                                    <Grid item xs={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                                        <TextField
                                                            error={false}
                                                            id="email"
                                                            label="Email"
                                                            variant="outlined"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                                        <TextField
                                                            error={false}
                                                            id="name"
                                                            label="name"
                                                            variant="outlined"
                                                            value={name}
                                                            onChange={(e) => setname(e.target.value)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} color="primary">
                                                    close
                                                </Button>
                                                <Button onClick={updateProfile} color="primary">
                                                    update
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
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
