import styled, { keyframes } from 'styled-components';
import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';
import { post } from '../../../utils/api';
import { redirect } from '../../../utils/redirect';
import { getCookie, deleteCookie } from '../../../utils/cookie';

const DetailHeader = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    color: white;
    background-color: #6289ED;
    font-family: Noto Sans KR;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    min-height: 40px;
    overflow: hidden;
    white-space: nowrap;
`;

const BoxIn = keyframes`
    100% {
      transform: translateX(0%);
      -webkit-transform: translateX(0%);
    }
`

const DetailBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-self: end;
    width: 20vw;
    min-width: 400px;
    min-height: 400px;
    height: 100%;
    border-radius: 10px;
    border: solid 1px #d3d3d3;
    margin-left: auto;
    margin-right: 40px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    z-index: 10;
    padding: 10px;
    animation: ${BoxIn} 0.5s forwards;
    -webkit-animation: ${BoxIn} 0.5s forwards;
    animation-delay: 0.1s;
    -webkit-animation-delay: 0.1s;
    transform: translateX(120%);
    -webkit-transform: translateX(120%);
`;

const DetailElement = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 10px;
    border: solid 1px #6289ED;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const CloseDetail = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 0px;
    right: 0px;
    border-radius: 100px;
    background-color: white;
    width: 30px;
    height: 30px;
    z-index: 9999;
    cursor: pointer;
`;


const DetailHead = styled.div`
    display: flex;
    margin-top: 4px;
    margin-bottom: 4px;
    flex-direction: column;
    color: white;
    background-color: #6289ED;
    border-radius: 5px;
    font-family: Noto Sans KR;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
`;

const Register = ({
  setSuccessAlert,
  refreshPersonalBoardList,
  closeRegisterView,
  setAlertMessage,
  setErrorAlert
}) => {
  const [url, setUrl] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [desc, setDesc] = React.useState("")
  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleDesc = (event) => {
    setDesc(event.target.value)
  }

  const handleStart = (event) => {
    setStartDate(event.target.value)
  }

  const handleEnd = (event) => {
    setEndDate(event.target.value)
  }

  const isValidDate = (date) => {
    if (date === "") {
      return true;
    }
    let splitDate = date.split(/[\s:\/]+/)
    if (splitDate.length !== 6) {
      return false
    }
    let month = parseInt(splitDate[1])
    let day = parseInt(splitDate[2])
    let hour = parseInt(splitDate[3])
    if (
      isNaN(parseInt(month)) ||
      (parseInt(month) > 12 || parseInt(month) < 1)) {
      return false
    }
    if (
      isNaN(parseInt(day)) ||
      (parseInt(day) > 31 || parseInt(day) < 1)) {
      return false
    }
    if (
      isNaN(parseInt(hour)) ||
      (parseInt(hour) > 24 || parseInt(hour) < 0)) {
      return false
    }
    return true
  }

  const uploadShareBoard = () => {
    let pattern = /([0-2][0-9]{3})\/([0-1][0-9])\/([0-3][0-9]) ([0-5][0-9]):([0-5][0-9]):([0-5][0-9])(([\-\+]([0-1][0-9])\:00))?/;

    if (startDate !== "" && (!pattern.test(startDate) || !isValidDate(startDate))) {
      setAlertMessage("???????????? ????????? ?????? ????????????")
      setErrorAlert(true)
      setTimeout(() => setErrorAlert(false), 2000);
      return;
    }
    if (endDate !== "" && (!pattern.test(endDate) || !isValidDate(endDate))) {
      setAlertMessage("???????????? ????????? ?????? ????????????")
      setErrorAlert(true)
      setTimeout(() => setErrorAlert(false), 2000);
      return;
    }

    let start = startDate
    let end = endDate

    if (start === "") {
      start = null
    }

    if (end === "") {
      end = null
    }


    let payload = {
      body: {
        title: title,
        desc: desc,
        startDate: start,
        endDate: end,
        url: url
      },
      headers: {
        "X-AUTH-TOKEN": getCookie("token")
      }
    }

    post(`/api/personals`, payload)
      .then(response => {
        setAlertMessage("????????? ??????")
        setSuccessAlert(true)
        setTimeout(() => setSuccessAlert(false), 2000);
        let path = response.headers.location
        let newBoard = payload.body
        newBoard.id = parseInt(path.split("/")[2])
        refreshPersonalBoardList(newBoard)
      }).catch(error => {
        if (error.response.status === 401) {
          deleteCookie("token", "")
          redirect("/login");
        } else {
          setAlertMessage("????????? ?????? ?????? - ??????????????? ???????????????(???????????? ???????????? ???????????? ??????????????????)")
          setErrorAlert(true)
          setTimeout(() => setErrorAlert(false), 2000);
        }
      })

  }

  return (
    <DetailBody>
      <CloseDetail onClick={closeRegisterView}>
        <HighlightOffIcon />
      </CloseDetail>
      <DetailHeader onClick={uploadShareBoard}>????????????</DetailHeader>
      <DetailElement>
        <DetailHead>?????? ??????</DetailHead>
        <TextField
          onChange={handleTitle}
          size="small"
          variant="outlined"
        />
      </DetailElement>
      <DetailElement>
        <DetailHead>?????? ??????</DetailHead>
        <TextField
          onChange={handleDesc}
          size="medium"
          variant="outlined"
          multiline={true}
          minRows={4}
          maxRows={10}
        />
      </DetailElement>
      <DetailElement>
        <DetailHead>?????? ?????? ??????</DetailHead>
        <TextField
          onChange={handleStart}
          placeholder="YYYY/MM/DD HH:mm:ss"
          size="small"
          variant="outlined"
        />
      </DetailElement>
      <DetailElement>
        <DetailHead>?????? ?????? ??????</DetailHead>
        <TextField
          onChange={handleEnd}
          placeholder="YYYY/MM/DD HH:mm:ss"
          size="small"
          variant="outlined"
        />
      </DetailElement>
      <DetailElement>
        <DetailHead>?????? URL</DetailHead>
        <TextField
          onChange={handleUrl}
          placeholder="https://example.com"
          size="small"
          variant="outlined"
        />
      </DetailElement>
    </DetailBody>
  )
}

export default Register;