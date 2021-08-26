import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';

const Register = () => {
    const [gender, setGender] = React.useState('');
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [Cpassword, setCPassword] = React.useState('')
    const [passCheck, setPassCheck] = React.useState(false)
    const [Passwordvalid, setPasswordvalid] = React.useState(false)
    const [Succefful, setSuccefful] = React.useState(false)
    const [load, setLoad] = React.useState(false)
    let history = useHistory();

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const passHandle = () => {
        setPassCheck(!passCheck)
    }

    const passwordChecker = () => {
        setPasswordvalid(!Passwordvalid)
    }

    const AcountCreated = () => {
        setSuccefful(!Succefful)
    }



    const submitForm = () => {
        setLoad(true)
        if (email === '' || name === '' || password === '' || Cpassword === '') {
            passHandle()
            setLoad(false)
            return
        }
        if (Cpassword !== password) {
            passwordChecker()
            setLoad(false)
            return
        }
        axios.post('http://localhost:8000/student', {
            name: name,
            email: email,
            password: password,
            gender: gender
        }).then((data) => {
            AcountCreated()
            setLoad(false)
            history.push('/login')
        })
    }
    return (
        <>
            <Container>

                <Snackbar open={Succefful} autoHideDuration={2000} onClose={AcountCreated} >
                    <Alert onClose={AcountCreated} severity="success">Account Created Successfully, Please <strong>LOGIN</strong></Alert>
                </Snackbar>
                <Snackbar open={passCheck} autoHideDuration={2000} onClose={passHandle} >
                    <Alert onClose={passHandle} severity="warning">Please Fill All the <strong>DETAILS</strong></Alert>
                </Snackbar>
                <Snackbar open={Passwordvalid} autoHideDuration={5000} onClose={passwordChecker} >
                    <Alert onClose={passwordChecker} severity="warning">CONFIRM PASSWORD not MATCHED</Alert>
                </Snackbar>

                <Grid container border={1}>
                    <Grid item xs={0} sm={3}></Grid>
                    <Grid item xs={12} sm={6}>
                        <h2 style={{ textAlign: 'center' }}>CREATE YOUR PROFILE</h2>
                        <Grid container>
                            <Grid xs={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="cpassword"
                                    label="Confirm Password"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
                                    value={Cpassword}
                                    onChange={(e) => setCPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={12} sm={12} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <FormControl variant="outlined" style={{ margin: '20px' }}>
                                    <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={gender}
                                        onChange={handleChange}
                                        label="Gender"

                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="male">MALE</MenuItem>
                                        <MenuItem value="female">FEMALE</MenuItem>
                                        <MenuItem value="other">OTHER</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={6} style={{ display: 'grid', justifyContent: 'right', alignContent: 'center' }}>
                                <Link to="login"><Button variant="outlined" color="secondary">
                                    Login ?
                                </Button></Link>
                            </Grid>
                            <Grid item xs={6} sm={6} style={{ display: 'grid', justifyContent: 'left', alignContent: 'center' }}>
                                <Button variant="outlined" onClick={submitForm} color="primary">
                                    Register
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

export default Register
