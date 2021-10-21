import styled from 'styled-components';
import React from 'react'
import { get } from '../../utils/api';
import { redirect } from '../../utils/redirect';
import { getCookie, deleteCookie } from '../../utils/cookie';
import Header from '../header'
import moment from 'moment';

const DashboardBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ShareBoardBody = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 80vh;
    transition: all 0.1s ease;
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
    width: 20vw;
    min-width: 400px;
    min-height: 400px;
    height: 100%;
    transition: all 0.1s ease;
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
    width: 20vw;
    min-width: 400px;
    min-height: 400px;
    height: 100%;
    transition: all 0.1s ease;
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
    width: 20vw;
    min-width: 400px;
    min-height: 400px;
    height: 100%;
    transition: all 0.1s ease;
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

const ShareBoard = ({ setErrorAlert, setSuccessAlert, setAlertMessage, }) => {
  const [page, setPage] = React.useState(1)
  const [shareBoardList, setShareBoardList] = React.useState(null)
  const [noEndDates, setNoEndDates] = React.useState(null)
  const [oneDayBefores, setOneDayBefores] = React.useState(null)
  const [threeDayBefores, setThreeDayBefores] = React.useState(null)
  const [weekBefores, setWeekBefores] = React.useState(null)

  const getShareBoardList = () => {
    get(`/api/shares`, {
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

  const redirectPage = (src) => {
    window.location.href = src;
  }

  return (
    <DashboardBody>
      <Header name="취업 공유 게시판"></Header>
      <ShareBoardBody>
        <OneDayBody>
          <DayHeader>1일 전 취업 공지</DayHeader>
          {oneDayBefores && oneDayBefores.map((element, index) => {
            let today = moment()
            let target = moment(element.endDate, "YYYY/MM/DD HH:mm:ss")
            let targetString = target.format("YYYY년MM월DD일 HH시간mm초")
            let distanceDay = parseInt(moment.duration(target.diff(today)).asDays())
            return (<DayElement key={index} >
              <DayTop>
                <DayTitle>{element.title}</DayTitle>
                <DayAlert style={{ color: "white", backgroundColor: "red" }}>{distanceDay}일</DayAlert>
              </DayTop>
              <DayDate>{targetString}</DayDate>
              <DayUrl href={element.url}>{element.url}</DayUrl>
            </DayElement>)
          })}
        </OneDayBody>
        <ThreeDayBody>
          <DayHeader>3일 전 취업 공지</DayHeader>
          {threeDayBefores && threeDayBefores.map((element, index) => {
            let today = moment()
            let target = moment(element.endDate, "YYYY/MM/DD HH:mm:ss")
            let targetString = target.format("YYYY년MM월DD일 HH시간mm분")
            let distanceDay = parseInt(moment.duration(target.diff(today)).asDays())
            return (<DayElement key={index} >
              <DayTop>
                <DayTitle>{element.title}</DayTitle>
                <DayAlert style={{ color: "white", backgroundColor: "#6289ED" }}>{distanceDay}일</DayAlert>
              </DayTop>
              <DayDate>{targetString}</DayDate>
              <DayUrl href={element.url}>{element.url}</DayUrl>
            </DayElement>)
          })}
        </ThreeDayBody>
        <OverWeekBody>
          <DayHeader>일주일 전 취업 공지</DayHeader>
          {weekBefores && weekBefores.map((element, index) => {
            let today = moment()
            let target = moment(element.endDate, "YYYY/MM/DD HH:mm:ss")
            let targetString = target.format("YYYY년MM월DD일 HH시간mm초")
            let distanceDay = parseInt(moment.duration(target.diff(today)).asDays())
            return (<DayElement key={index} >
              <DayTop>
                <DayTitle>{element.title}</DayTitle>
                <DayAlert style={{ color: "white", backgroundColor: "#6289ED" }}>{distanceDay}일</DayAlert>
              </DayTop>
              <DayDate>{targetString}</DayDate>
              <DayUrl href={element.url}>{element.url}</DayUrl>
            </DayElement>)
          })}
          {/* onClick={() => redirectPage(element.url)} */}
        </OverWeekBody>
      </ShareBoardBody>
    </DashboardBody>
  );
}

export default ShareBoard;