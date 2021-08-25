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

const Register = () => {
    const [gender, setGender] = React.useState('');
    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [image, setImage] = React.useState()

    const submitForm = () => {
        axios.post('http://localhost:8000/student', {
            name: name,
            email: email,
            password: password,
            gender: gender
        }).then((data) => console.log(data.data))
    }
    return (
        <>
            <Container>
                <Grid container border={1}>
                    <Grid item xs={0} sm={3}></Grid>
                    <Grid item xs={12} sm={6}>
                        <h2 style={{ textAlign: 'center' }}>CREATE YOUR PROFILE</h2>
                        <Grid container>
                            <Grid sm={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid sm={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid sm={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid sm={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="outlined-basic"
                                    label="Confirm Password"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid sm={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="outlined-basic"
                                    label="Profile"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </Grid>
                            <Grid sm={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
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
                    </Grid>
                    <Grid item xs={0} sm={3}></Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Register
