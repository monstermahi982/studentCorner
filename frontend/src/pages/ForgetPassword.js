import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const ForgetPassword = () => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setnewPassword] = React.useState("");
  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [oldpasscheck, setoldpasscheck] = React.useState(false);
  const [passCheck, setPassCheck] = React.useState(false);
  const [fillDetail, setfillDetail] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  let history = useHistory();

  const toregister = () => {
    history.push("/register");
  };

  const oldPasswordCheck = () => {
    setoldpasscheck(!oldpasscheck);
  };

  const confrmPasswordCheck = () => {
    setPassCheck(!passCheck);
  };

  const checkDeatils = () => {
    setfillDetail(!fillDetail);
  };

  const tologin = () => {
    history.push("/login");
  };

  const resetPassword = async () => {
    setLoad(true);
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      checkDeatils();
      setLoad(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      confrmPasswordCheck();
      setLoad(false);
      return;
    }
    const data = await axios.post("http://localhost:8000/updatepassword", {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    setLoad(false);
    if (data.data.data === "notFound") {
      oldPasswordCheck();
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <Container style={{ marginTop: "30px" }}>
        <Snackbar
          open={oldpasscheck}
          autoHideDuration={2000}
          onClose={oldPasswordCheck}
        >
          <Alert onClose={oldPasswordCheck} severity="error">
            OLD password not matched
          </Alert>
        </Snackbar>
        <Snackbar
          open={passCheck}
          autoHideDuration={2000}
          onClose={confrmPasswordCheck}
        >
          <Alert onClose={confrmPasswordCheck} severity="warning">
            Confirm Password not matched
          </Alert>
        </Snackbar>
        <Snackbar
          open={fillDetail}
          autoHideDuration={2000}
          onClose={checkDeatils}
        >
          <Alert onClose={checkDeatils} severity="warning">
            Please fill all deatils
          </Alert>
        </Snackbar>

        <Grid container border={1}>
          <Grid item xs={false} sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <h2 style={{ textAlign: "center" }}>RESET PASSWORD</h2>
            <Grid container>
              <Grid
                xs={12}
                sm={4}
                style={{
                  display: "grid",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <TextField
                  error={false}
                  id="email"
                  label="old password"
                  variant="outlined"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Grid>
              <Grid
                xs={12}
                sm={4}
                style={{
                  display: "grid",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <TextField
                  error={false}
                  id="password"
                  label="new password"
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                />
              </Grid>
              <Grid
                xs={12}
                sm={4}
                style={{
                  display: "grid",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <TextField
                  error={false}
                  id="Cpassword"
                  label="confirm password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <br />

            <Grid
              container
              style={{
                display: "grid",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <ButtonGroup
                color="primary"
                aria-label="large outlined primary button group"
              >
                <Button onClick={toregister} color="secondary">
                  Register
                </Button>
                <Button onClick={tologin} color="secondary">
                  Login
                </Button>
                <Button onClick={resetPassword}>RESET Password</Button>
              </ButtonGroup>
            </Grid>

            <br />
            {load ? <LinearProgress /> : ""}
          </Grid>
          <Grid item xs={false} sm={3}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ForgetPassword;
