import styled from 'styled-components';
import React from 'react'
import { get, post } from '../../utils/api';
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

const ShareBoardBody = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 80vh;
    padding-top: 10px;
`;

const ClickAlert = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 70px;
    left: 8px;
    font-family: Noto Sans KR;
    border: solid 1px white;
    border-radius: 100px;
    width: 25px;
    height: 25px;
    font-size: 14px;
    background-color: green;
    color: white;
    z-index: 9999;
    cursor: pointer;
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
    background: ${props => {
    return props.color || ''
  }};
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
  const [shareBoardList, setShareBoardList] = React.useState(null)
  const [noEndDates, setNoEndDates] = React.useState(null)
  const [detail, setDetail] = React.useState(null)
  const [register, setRegister] = React.useState(null)
  const [oneDayBefores, setOneDayBefores] = React.useState(null)
  const [threeDayBefores, setThreeDayBefores] = React.useState(null)
  const [weekBefores, setWeekBefores] = React.useState(null)
  const [selectBoards, setSelectBoards] = React.useState([])

  const refreshShareBoardList = (newBoard) => {
    let shareBoards = []
    let noEndDates = []
    let oneDays = []
    let threeDays = []
    let overWeeks = []
    let today = moment()
    shareBoards.push(newBoard)

    for (let shareBoard of shareBoardList) {
      if (shareBoard.endDate == null) {
        noEndDates.push(shareBoard)
        continue
      }
      shareBoards.push(shareBoard)
    }

    shareBoards.sort((a, b) => {
      let targetA = moment(a.endDate, "YYYY/MM/DD HH:mm:ss")
      let targetB = moment(b.endDate, "YYYY/MM/DD HH:mm:ss")
      return moment.duration(targetA.diff(targetB)).asDays()
    })

    for (let shareBoard of shareBoards) {
      let target = moment(shareBoard.endDate, "YYYY/MM/DD HH:mm:ss")
      let distanceDay = moment.duration(target.diff(today)).asDays()
      if (distanceDay > 7) {
        overWeeks.push(shareBoard)
      } else if (distanceDay > 3) {
        threeDays.push(shareBoard)
      } else if (distanceDay > 0) {
        oneDays.push(shareBoard)
      }
    }

    setNoEndDates(noEndDates)
    setOneDayBefores(oneDays)
    setThreeDayBefores(threeDays)
    setWeekBefores(overWeeks)
    setShareBoardList(shareBoards)
  }

  const uploadBoardsToUser = () => {
    let body = []
    for (let select of selectBoards) {
      let start = select.startDate
      let end = select.endDate

      if (start === null || start === "") {
        start = null
      } else {
        start = moment(start, "YYYY/MM/DD HH:mm:ss").format('YYYY/MM/DD HH:mm:ss')
      }

      if (end === null || end === "") {
        end = null
      } else {
        end = moment(end, "YYYY/MM/DD HH:mm:ss").format('YYYY/MM/DD HH:mm:ss')
      }
      select.startDate = start
      select.endDate = end
      body.push(select)
      console.log(start)
      console.log(end)
    }

    let payload = {
      body: body,
      headers: {
        "X-AUTH-TOKEN": getCookie("token")
      }
    }
    post(`/api/personals/batch`, payload)
      .then(response => {
        refreshSelectBoards()
        setAlertMessage("업로드 완료")
        setSuccessAlert(true)
        setTimeout(() => setSuccessAlert(false), 2000);
      }).catch(error => {
        console.log(error)
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

  const openRegisterView = () => {
    setDetail(null)
    setRegister(true)
  }

  const closeRegisterView = () => {
    setRegister(null)
  }

  const setDetailElement = (event, element) => {
    event.stopPropagation()
    setRegister(null)
    setDetail(element)
  }

  const deleteDetailElement = () => {
    setDetail(null)
  }

  const refreshSelectBoards = () => {
    setSelectBoards([])
    setOneDayBefores(deepCopy(oneDayBefores))
    setThreeDayBefores(deepCopy(threeDayBefores))
    setWeekBefores(deepCopy(weekBefores))
  }

  const appendSelectBoards = (element) => {
    let sb = selectBoards
    let index = sb.indexOf(element)
    if (index === -1) {
      sb.push(element)
      setSelectBoards(sb)
    } else {
      sb.splice(index, 1)
      setSelectBoards(sb)
    }
    setOneDayBefores(deepCopy(oneDayBefores))
    setThreeDayBefores(deepCopy(threeDayBefores))
    setWeekBefores(deepCopy(weekBefores))
  }

  const deepCopy = (list) => {
    let copy = []
    for (let el of list) {
      copy.push(el)
    }
    return copy
  }

  return (
    <DashboardBody>
      <Header name="취업 공유 게시판"></Header>
      <ShareBoardBody>
        {selectBoards.length !== 0 &&
          <ClickAlert onClick={uploadBoardsToUser}>
            {selectBoards.length}+
          </ClickAlert>
        }
        <OneDayBody>
          <PlusButton onClick={openRegisterView}>
            <ControlPointIcon />
          </PlusButton>
          <DayHeader>1일 전 취업 공지</DayHeader>
          {oneDayBefores && oneDayBefores.map((element, index) => {
            let today = moment()
            let target = moment(element.endDate, "YYYY/MM/DD HH:mm:ss")
            let targetString = target.format("YYYY년MM월DD일 HH시간mm분")
            let distanceDay = parseInt(moment.duration(target.diff(today)).asDays())
            let clickColor = ""
            if (selectBoards.indexOf(element) !== -1) {
              clickColor = "#d3d3d3 !important"
            }
            return (<DayElement
              color={clickColor}
              key={index}
              onClick={() => appendSelectBoards(element)}
            >
              <DayTop>
                <DayTitle onClick={(event) => setDetailElement(event, element)} >{element.title}</DayTitle>
                <DayAlert style={{ color: "white", backgroundColor: "red" }}>{distanceDay}일</DayAlert>
              </DayTop>
              <DayDate>{targetString}</DayDate>
              <DayUrl href={element.url}>바로가기</DayUrl>
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
            let clickColor = ""
            if (selectBoards.indexOf(element) !== -1) {
              clickColor = "#d3d3d3 !important"
            }
            return (<DayElement
              color={clickColor}
              key={index}
              onClick={() => appendSelectBoards(element)}
            >
              <DayTop>
                <DayTitle onClick={(event) => setDetailElement(event, element)} >{element.title}</DayTitle>
                <DayAlert style={{ color: "white", backgroundColor: "orange" }}>{distanceDay}일</DayAlert>
              </DayTop>
              <DayDate>{targetString}</DayDate>
              <DayUrl href={element.url}>바로가기</DayUrl>
            </DayElement>)
          })}
        </ThreeDayBody>
        <OverWeekBody>
          <DayHeader>일주일 전 취업 공지</DayHeader>
          {weekBefores && weekBefores.map((element, index) => {
            let today = moment()
            let target = moment(element.endDate, "YYYY/MM/DD HH:mm:ss")
            let targetString = target.format("YYYY년MM월DD일 HH시간mm분")
            let distanceDay = parseInt(moment.duration(target.diff(today)).asDays())
            let clickColor = ""
            if (selectBoards.indexOf(element) !== -1) {
              clickColor = "#d3d3d3 !important"
            }
            return (<DayElement
              color={clickColor}
              key={index}
              onClick={() => appendSelectBoards(element)}
            >
              <DayTop>
                <DayTitle onClick={(event) => setDetailElement(event, element)} >{element.title}</DayTitle>
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
          refreshShareBoardList={refreshShareBoardList}
          closeRegisterView={closeRegisterView}
          setAlertMessage={setAlertMessage}
          setErrorAlert={setErrorAlert}
        />}
      </ShareBoardBody>
    </DashboardBody >
  );
}

export default ShareBoard;