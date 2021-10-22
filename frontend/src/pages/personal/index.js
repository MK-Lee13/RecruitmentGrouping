import PersonalBoard from '../../components/personal-board';
const Personal = ({ setErrorAlert, setSuccessAlert, setAlertMessage, }) => {
  return (
    <PersonalBoard setErrorAlert={setErrorAlert} setAlertMessage={setAlertMessage}></PersonalBoard>
  )
}

export default Personal;
