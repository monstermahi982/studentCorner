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

const Register = () => {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
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
                                />
                            </Grid>
                            <Grid sm={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <TextField
                                    error={false}
                                    id="outlined-basic"
                                    label="Email"
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
                                    label="Password"
                                    variant="outlined"
                                    style={{ margin: '20px' }}
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
                                />
                            </Grid>
                            <Grid sm={12} sm={6} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
                                <FormControl variant="outlined" style={{ margin: '20px' }}>
                                    <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={age}
                                        onChange={handleChange}
                                        label="Gender"

                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>MALE</MenuItem>
                                        <MenuItem value={20}>FEMALE</MenuItem>
                                        <MenuItem value={30}>OTHER</MenuItem>
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
                                <Button variant="outlined" color="primary">
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
