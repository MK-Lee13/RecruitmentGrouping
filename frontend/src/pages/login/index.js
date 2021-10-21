import LoginDashboard from '../../components/login-dashboard';
import { redirect } from '../../utils/redirect';
import { validate } from '../../utils/cookie';
import React from 'react'
const Login = ({ setErrorAlert, setAlertMessage, }) => {

  React.useEffect(() => {
    if (validate("token")) redirect("/share");
  }, [])

  return (
    <LoginDashboard setErrorAlert={setErrorAlert} setAlertMessage={setAlertMessage}></LoginDashboard>
  )
}

export default Login;
