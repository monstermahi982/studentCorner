import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../amol.jpeg'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Route, Redirect } from 'react-router-dom'
import { userContext } from '../App'


const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [emailCheck, setEmailCheck] = React.useState(false)
    const [passCheck, setPassCheck] = React.useState(false)
    const [load, setLoad] = React.useState(false)
    let history = useHistory();
    const { state, dispatch } = React.useContext(userContext)

    React.useEffect(() => {
        if (state) {
            history.push('/student')
        }
    })


    const emailHandle = () => {
        setEmailCheck(!emailCheck)
    }

    const passHandle = () => {
        setPassCheck(!passCheck)
    }

    const loginUser = async () => {
        setLoad(true)
        const data = await axios.post('http://localhost:8000/student/login', {
            email,
            password
        })
        if (data.data.data == "WrongEmail") {
            setLoad(false)
            emailHandle()
        } else if (data.data.data == "WrongPassword") {
            setLoad(false)
            passHandle()
        } else {
            setLoad(false)
            history.push('/student')
        }
    }

    // setTimeout(function () { alert("Hello"); }, 3000);
    return (
        <>
            <Container>

                <Snackbar open={emailCheck} autoHideDuration={2000} onClose={emailHandle} >
                    <Alert onClose={emailHandle} severity="error">Email is WRONG</Alert>
                </Snackbar>
                <Snackbar open={passCheck} autoHideDuration={2000} onClose={passHandle} >
                    <Alert onClose={passHandle} severity="warning">Password is WRONG</Alert>
                </Snackbar>

                <Grid container border={1}>
                    <Grid item xs={0} sm={3}></Grid>
                    <Grid item xs={12} sm={6}>
                        <h2 style={{ textAlign: 'center' }}>LOGIN YOUR ACCOUNT</h2>
                        <Grid container>
                            <Grid sm={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid sm={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <br />

                        <Grid container>
                            <Grid item xs={6} sm={6} style={{ display: 'grid', justifyContent: 'right', alignContent: 'center' }}>
                                <Link to="/register"><Button variant="outlined" color="secondary">
                                    Register ?
                                </Button></Link>
                            </Grid>
                            <Grid item xs={6} sm={6} style={{ display: 'grid', justifyContent: 'left', alignContent: 'center' }}>
                                <Button variant="outlined" color="primary" onClick={loginUser}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                        <br />
                        {load ? <LinearProgress /> : ""}
                    </Grid>
                    <Grid item xs={0} sm={3}></Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Login
