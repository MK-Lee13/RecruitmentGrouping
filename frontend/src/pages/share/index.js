import ShareBoard from '../../components/share-board';
const Share = ({ setErrorAlert, setSuccessAlert, setAlertMessage, }) => {
  return (
    <ShareBoard setErrorAlert={setErrorAlert} setSuccessAlert={setSuccessAlert} setAlertMessage={setAlertMessage}></ShareBoard>
  )
}

export default Share;
