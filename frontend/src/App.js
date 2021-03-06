import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Login from './pages/login'
import Personal from './pages/personal'
import Share from './pages/share'
import React from 'react'

const App = () => {
  const [errorAlert, setErrorAlert] = React.useState(false)
  const [successAlert, setSuccessAlert] = React.useState(false)
  const [warningAlert, setWarningAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState("")
  return (
    <BrowserRouter>
      <Box sx={{ top: 0, left: 0, width: '100vw', position: 'absolute', zIndex: 100000 }}>
        <Collapse in={errorAlert}>
          <Alert variant="filled" severity="error">
            {alertMessage}
          </Alert>
        </Collapse>
      </Box>
      <Box sx={{ top: 0, left: 0, width: '100vw', position: 'absolute', zIndex: 100000 }}>
        <Collapse in={warningAlert}>
          <Alert variant="filled" severity="warning">
            {alertMessage}
          </Alert>
        </Collapse>
      </Box>
      <Box sx={{ top: 0, left: 0, width: '100vw', position: 'absolute', zIndex: 100000 }}>
        <Collapse in={successAlert}>
          <Alert variant="filled" severity="success">
            {alertMessage}
          </Alert>
        </Collapse>
      </Box>
      <Switch>
        <Route exact path="/personal">
          <Personal
            setErrorAlert={setErrorAlert}
            setSuccessAlert={setSuccessAlert}
            setAlertMessage={setAlertMessage}
          />
        </Route>
        <Route exact path="/share">
          <Share
            setErrorAlert={setErrorAlert}
            setSuccessAlert={setSuccessAlert}
            setAlertMessage={setAlertMessage}
          />
        </Route>
        <Route exact path="/login">
          <Login
            setErrorAlert={setErrorAlert} setAlertMessage={setAlertMessage}
          />
        </Route>
        <Redirect path="*" to="/share" />
      </Switch>
    </BrowserRouter >
  );
}

export default App;
