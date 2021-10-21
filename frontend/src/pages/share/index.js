import ShareBoard from '../../components/share-board';
const Share = ({ setErrorAlert, setSuccessAlert, setAlertMessage, }) => {
  return (
    <ShareBoard setErrorAlert={setErrorAlert} setAlertMessage={setAlertMessage}></ShareBoard>
  )
}

export default Share;
