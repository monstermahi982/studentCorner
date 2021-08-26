import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';


const Particular = () => {
    let id = useParams();
    let history = useHistory()
    const [userList, setUserList] = React.useState([])
    const [change, setChange] = React.useState(true)
    const userId = sessionStorage.getItem('userId')

    const [data, setData] = React.useState('')

    React.useEffect(async () => {
        const profileData = await axios.get('http://localhost:8000/student/' + id.id)
        if (profileData.data.data === "wrongId") {
            history.push('/')
            return
        }
        setData(profileData.data)
        return { profileData }
    }, [change])

    // getting all the profiles
    React.useEffect(async () => {
        const userData = await axios.get('http://localhost:8000/students')
        setUserList(userData.data)
        return { userData }
    }, [])

    const particularPost = async (e) => {
        history.push('/student/' + e.target.id)
        setChange(!change)
    }

    return (
        <>
            <Container style={{ marginTop: '30px' }}>
                <Grid container border={1}>
                    <Grid item xs={12} sm={8}>

                        <Grid container>
                            <Grid item xs={12} sm={4}>
                                <img src={'http://localhost:8000/' + data.profile} alt="" height="250" width="100%" />
                            </Grid>
                            <Grid item xs={12} sm={8}>
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

export default Particular
