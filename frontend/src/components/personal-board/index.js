import styled, { keyframes } from 'styled-components';
import React from 'react'
import { get } from '../../utils/api';
import { redirect } from '../../utils/redirect';
import { getCookie, deleteCookie } from '../../utils/cookie';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Header from '../header'
import moment from 'moment';

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

const DayHeader = styled.div`
    display: flex;
    flex-direction: column;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: white;
    background-color: #6289ED;
    font-family: Noto Sans KR;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    height: 40px;
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
    width: 15vw;
    min-width: 200px;
    min-height: 400px;
    height: 100%;
    border-radius: 10px;
    box-shadow: 2px 2px 1px 1px gray;
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
    box-shadow: 2px 2px 1px 1px gray;
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
    box-shadow: 2px 2px 1px 1px gray;
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
    box-shadow: 2px 2px 1px 1px gray;
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

const DetailAlert = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 0px;
    left: 0px;
    font-family: Noto Sans KR;
    border: solid 1px white;
    border-radius: 100px;
    width: 30px;
    height: 30px;
    font-size: 14px;
    z-index: 9999;
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

const DetailTitle = styled.div`
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    color: #6289ED;
    font-family: Noto Sans KR;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
`;

const ShareBoard = ({ setErrorAlert, setSuccessAlert, setAlertMessage, }) => {
  const [page, setPage] = React.useState(1)
  const [shareBoardList, setShareBoardList] = React.useState(null)
  const [noEndDates, setNoEndDates] = React.useState(null)
  const [detail, setDetail] = React.useState(null)
  const [oneDayBefores, setOneDayBefores] = React.useState(null)
  const [threeDayBefores, setThreeDayBefores] = React.useState(null)
  const [weekBefores, setWeekBefores] = React.useState(null)

  const getShareBoardList = () => {
    get(`/api/personals`, {
      headers: {
        "X-AUTH-TOKEN": getCookie("token")
      }
    })
      .then(response => {
        let shareBoards = []
        let noEndDates = []
        let oneDays = []
        let threeDays = []
        let overWeeks = []
        let today = moment()
        for (let shareBoard of response.data) {
          if (shareBoard.endDate == null) {
            noEndDates.push(shareBoard)
            setShareBoardList(shareBoards)
            continue
          }
          let target = moment(shareBoard.endDate, "YYYY/MM/DD HH:mm:ss")
          let distanceDay = moment.duration(target.diff(today)).asDays()
          if (distanceDay > 7) {
            overWeeks.push(shareBoard)
          } else if (distanceDay > 3) {
            threeDays.push(shareBoard)
          } else if (distanceDay > 0) {
            oneDays.push(shareBoard)
          }
          shareBoards.push(shareBoard)
        }
        setNoEndDates(noEndDates)
        setOneDayBefores(oneDays)
        setThreeDayBefores(threeDays)
        setWeekBefores(overWeeks)
        setShareBoardList(shareBoards)
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

  const setDetailView = () => {
    let today = moment()
    let end = moment(detail.endDate, "YYYY/MM/DD HH:mm:ss")
    let endString = end.format("YYYY년MM월DD일 HH시간mm분")
    let startString = "정보가 없습니다."
    let desc = "정보가 없습니다."
    let bgColor = "green"

    if (detail.desc !== null) {
      desc = detail.desc
    }
    if (detail.startDate !== null && detail.startDate !== "") {
      let start = moment(detail.startDate, "YYYY/MM/DD HH:mm:ss")
      startString = start.format("YYYY년MM월DD일 HH시간mm분")
    }

    let distanceDay = parseInt(moment.duration(end.diff(today)).asDays())

    if (distanceDay >= 7) {
      bgColor = "green"
    } else if (distanceDay >= 3) {
      bgColor = "orange"
    } else if (distanceDay >= 0) {
      bgColor = "red"
    }
    return (
      <DetailBody>
        <DetailAlert style={{ color: "white", backgroundColor: bgColor }}>{distanceDay}일</DetailAlert>
        <CloseDetail onClick={deleteDetailElement}>
          <HighlightOffIcon />
        </CloseDetail>
        <DayHeader>상세보기</DayHeader>
        <DetailElement>
          <DetailHead>공고 이름</DetailHead>
          <DetailTitle>{detail.title}</DetailTitle>
        </DetailElement>
        <DetailElement>
          <DetailHead>공고 정보</DetailHead>
          <DetailTitle>{desc}</DetailTitle>
        </DetailElement>
        <DetailElement>
          <DetailHead>공고 시작 날짜</DetailHead>
          <DetailTitle>{startString}</DetailTitle>
        </DetailElement>
        <DetailElement>
          <DetailHead>공고 마감 날짜</DetailHead>
          <DetailTitle>{endString}</DetailTitle>
        </DetailElement>
        <DetailElement>
          <DetailHead>공고 URL</DetailHead>
          <DayUrl href={detail.url}>바로가기</DayUrl>
        </DetailElement>
      </DetailBody>
    )

  }

  const setDetailElement = (element) => {
    setDetail(element)
  }

  const deleteDetailElement = (element) => {
    setDetail(null)
  }

  return (
    <DashboardBody>
      <Header name="개인 게시판"></Header>
      <PersonalBoardBody>
        <OneDayBody>
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
        {detail && setDetailView()}
      </PersonalBoardBody>
    </DashboardBody >
  );
}

export default ShareBoard;