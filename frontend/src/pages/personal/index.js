import PersonalBoard from '../../components/personal-board';
const Personal = ({ setErrorAlert, setSuccessAlert, setAlertMessage, }) => {
  return (
    <PersonalBoard setErrorAlert={setErrorAlert} setSuccessAlert={setSuccessAlert} setAlertMessage={setAlertMessage}></PersonalBoard>
  )
}

export default Personal;
