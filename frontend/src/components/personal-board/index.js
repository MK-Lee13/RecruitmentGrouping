import styled, { keyframes } from 'styled-components';
import React from 'react'
import { get } from '../../utils/api';
import { redirect } from '../../utils/redirect';
import { getCookie, deleteCookie } from '../../utils/cookie';
import Header from '../header'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import moment from 'moment';
import Detail from './detail'
import Register from './register'

const DashboardBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const PersonalBoardBody = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 80vh;
    padding-top: 10px;
`;

const PlusButton = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 0px;
    right: 0px;
    font-family: Noto Sans KR;
    border: solid 1px white;
    border-radius: 100px;
    background-color: white;
    width: 30px;
    height: 30px;
    font-size: 14px;
    z-index: 9999;
    cursor: pointer;
`;


const DayHeader = styled.div`
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

const DayElement = styled.div`
    display: flex;
    z-index: 10;
    flex-direction: column;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-weight: bold;
    border: solid 1px #6289ED;
    border-radius: 10px;
    padding: 5px;
    position: relative;
    margin-top: 2px;
    margin-bottom: 2px;
`;

const DayTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const DayTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-left: 4px;
    color: #6289ED;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    cursor:pointer;
`;

const DayAlert = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: -10px;
    right: -10px;
    font-family: Noto Sans KR;
    border: solid 1px white;
    border-radius: 100px;
    width: 30px;
    height: 30px;
    font-size: 14px;
    z-index: 9999;
`;

const DayDate = styled.div`
    display: flex;
    flex-direction: column;
    color: #6289ED;
    font-family: Noto Sans KR;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
`;

const DayUrl = styled.a`
    display: flex;
    flex-direction: column;
    color: #6289ED;
    font-family: Noto Sans KR;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
`;

const OneDayBody = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 15vw;
    min-width: 200px;
    min-height: 400px;
    height: 100%;
    border-radius: 10px;
    border: solid 1px #d3d3d3;
    margin-right: 20px;
    margin-left: 10px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    z-index: 10;
    padding: 10px;
`;

const ThreeDayBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 15vw;
    min-width: 200px;
    min-height: 400px;
    height: 100%;
    border-radius: 10px;
    border: solid 1px #d3d3d3;
    margin-right: 20px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    z-index: 10;
    padding: 10px;
`;

const OverWeekBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 15vw;
    min-width: 200px;
    min-height: 400px;
    height: 100%;
    border-radius: 10px;
    border: solid 1px #d3d3d3;
    margin-right: 10px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    z-index: 10;
    padding: 10px;
`;

const ShareBoard = ({ setErrorAlert, setSuccessAlert, setAlertMessage, }) => {
  const [page, setPage] = React.useState(1)
  const [personalBoardList, setPersonalBoardList] = React.useState(null)
  const [noEndDates, setNoEndDates] = React.useState(null)
  const [detail, setDetail] = React.useState(null)
  const [register, setRegister] = React.useState(null)
  const [oneDayBefores, setOneDayBefores] = React.useState(null)
  const [threeDayBefores, setThreeDayBefores] = React.useState(null)
  const [weekBefores, setWeekBefores] = React.useState(null)

  const refreshPersonalBoardList = (newBoard) => {
    let personalBoards = []
    let noEndDates = []
    let oneDays = []
    let threeDays = []
    let overWeeks = []
    let today = moment()
    personalBoards.push(newBoard)

    for (let personalBoard of personalBoardList) {
      if (personalBoard.endDate == null) {
        noEndDates.push(personalBoard)
        continue
      }
      personalBoards.push(personalBoard)
    }

    personalBoards.sort((a, b) => {
      let targetA = moment(a.endDate, "YYYY/MM/DD HH:mm:ss")
      let targetB = moment(b.endDate, "YYYY/MM/DD HH:mm:ss")
      return moment.duration(targetA.diff(targetB)).asDays()
    })

    for (let personalBoard of personalBoards) {
      let target = moment(personalBoard.endDate, "YYYY/MM/DD HH:mm:ss")
      let distanceDay = moment.duration(target.diff(today)).asDays()
      if (distanceDay > 7) {
        overWeeks.push(personalBoard)
      } else if (distanceDay > 3) {
        threeDays.push(personalBoard)
      } else if (distanceDay > 0) {
        oneDays.push(personalBoard)
      }
    }

    setNoEndDates(noEndDates)
    setOneDayBefores(oneDays)
    setThreeDayBefores(threeDays)
    setWeekBefores(overWeeks)
    setPersonalBoardList(personalBoards)
  }

  const getShareBoardList = () => {
    get(`/api/personals`, {
      headers: {
        "X-AUTH-TOKEN": getCookie("token")
      }
    })
      .then(response => {
        let personalBoards = []
        let noEndDates = []
        let oneDays = []
        let threeDays = []
        let overWeeks = []
        let today = moment()
        for (let personalBoard of response.data) {
          if (personalBoard.endDate == null) {
            noEndDates.push(personalBoard)
            continue
          }
          let target = moment(personalBoard.endDate, "YYYY/MM/DD HH:mm:ss")
          let distanceDay = moment.duration(target.diff(today)).asDays()
          if (distanceDay > 7) {
            overWeeks.push(personalBoard)
          } else if (distanceDay > 3) {
            threeDays.push(personalBoard)
          } else if (distanceDay > 0) {
            oneDays.push(personalBoard)
          }
          personalBoards.push(personalBoard)
        }
        setNoEndDates(noEndDates)
        setOneDayBefores(oneDays)
        setThreeDayBefores(threeDays)
        setWeekBefores(overWeeks)
        setPersonalBoardList(personalBoards)
      }).catch(error => {
        if (error.response.status === 401) {
          deleteCookie("token", "")
          redirect("/login");
        } else {
          setAlertMessage("의도치 못한 버그 - 개발자에게 문의하세요")
          setErrorAlert(true)
          setTimeout(() => setErrorAlert(false), 2000);
        }
      })

  }

  React.useEffect(() => {
    getShareBoardList()
  }, [])

  const openRegisterView = () => {
    setDetail(null)
    setRegister(true)
  }

  const closeRegisterView = () => {
    setRegister(null)
  }

  const setDetailElement = (element) => {
    setRegister(null)
    setDetail(element)
  }

  const deleteDetailElement = () => {
    setDetail(null)
  }


  return (
    <DashboardBody>
      <Header name="개인 게시판"></Header>
      <PersonalBoardBody>
        <OneDayBody>
          <PlusButton onClick={openRegisterView}>
            <ControlPointIcon />
          </PlusButton>
          <DayHeader>1일 전 공지</DayHeader>
          {oneDayBefores && oneDayBefores.map((element, index) => {
            let today = moment()
            let target = moment(element.endDate, "YYYY/MM/DD HH:mm:ss")
            let targetString = target.format("YYYY년MM월DD일 HH시간mm분")
            let distanceDay = parseInt(moment.duration(target.diff(today)).asDays())
            return (<DayElement key={index} >
              <DayTop>
                <DayTitle onClick={() => setDetailElement(element)} >{element.title}</DayTitle>
                <DayAlert style={{ color: "white", backgroundColor: "red" }}>{distanceDay}일</DayAlert>
              </DayTop>
              <DayDate>{targetString}</DayDate>
              <DayUrl href={element.url}>바로가기</DayUrl>
            </DayElement>)
          })}
        </OneDayBody>
        <ThreeDayBody>
          <DayHeader>3일 전 공지</DayHeader>
          {threeDayBefores && threeDayBefores.map((element, index) => {
            let today = moment()
            let target = moment(element.endDate, "YYYY/MM/DD HH:mm:ss")
            let targetString = target.format("YYYY년MM월DD일 HH시간mm분")
            let distanceDay = parseInt(moment.duration(target.diff(today)).asDays())
            return (<DayElement key={index} >
              <DayTop>
                <DayTitle onClick={() => setDetailElement(element)} >{element.title}</DayTitle>
                <DayAlert style={{ color: "white", backgroundColor: "orange" }}>{distanceDay}일</DayAlert>
              </DayTop>
              <DayDate>{targetString}</DayDate>
              <DayUrl href={element.url}>바로가기</DayUrl>
            </DayElement>)
          })}
        </ThreeDayBody>
        <OverWeekBody>
          <DayHeader>일주일 전 공지</DayHeader>
          {weekBefores && weekBefores.map((element, index) => {
            let today = moment()
            let target = moment(element.endDate, "YYYY/MM/DD HH:mm:ss")
            let targetString = target.format("YYYY년MM월DD일 HH시간mm분")
            let distanceDay = parseInt(moment.duration(target.diff(today)).asDays())
            return (<DayElement key={index} >
              <DayTop>
                <DayTitle onClick={() => setDetailElement(element)} >{element.title}</DayTitle>
                <DayAlert style={{ color: "white", backgroundColor: "green" }}>{distanceDay}일</DayAlert>
              </DayTop>
              <DayDate>{targetString}</DayDate>
              <DayUrl href={element.url}>바로가기</DayUrl>
            </DayElement>)
          })}
        </OverWeekBody>
        {detail && <Detail
          detail={detail}
          deleteDetailElement={deleteDetailElement}
        />}
        {register && <Register
          setSuccessAlert={setSuccessAlert}
          refreshPersonalBoardList={refreshPersonalBoardList}
          closeRegisterView={closeRegisterView}
          setAlertMessage={setAlertMessage}
          setErrorAlert={setErrorAlert}
        />}
      </PersonalBoardBody>
    </DashboardBody >
  );
}

export default ShareBoard;