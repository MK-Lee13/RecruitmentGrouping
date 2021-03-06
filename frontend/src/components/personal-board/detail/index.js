import styled, { keyframes } from 'styled-components';
import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import moment from 'moment';

const DetailUrl = styled.a`
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

const Detail = ({ detail, deleteDetailElement, }) => {
  const [bgColor, setBgColor] = React.useState("green")
  const [endString, setEndString] = React.useState("????????? ????????????.")
  const [startString, setStartString] = React.useState("????????? ????????????.")
  const [desc, setDesc] = React.useState("????????? ????????????.")
  const [timeDistance, setTimeDistance] = React.useState(1)

  const initDetail = () => {
    setBgColor("green")
    setEndString("????????? ????????????.")
    setStartString("????????? ????????????.")
    setDesc("????????? ????????????.")
    setTimeDistance(1)
  }

  React.useEffect(() => {
    initDetail()
    let today = moment()
    let end = moment(detail.endDate, "YYYY/MM/DD HH:mm:ss")
    setEndString(end.format("YYYY???MM???DD??? HH??????mm???"))

    if (detail.desc !== null) {
      setDesc(detail.desc)
    }

    if (detail.startDate !== null && detail.startDate !== "") {
      let start = moment(detail.startDate, "YYYY/MM/DD HH:mm:ss")
      setStartString(start.format("YYYY???MM???DD??? HH??????mm???"))
    }

    let distanceDay = parseInt(moment.duration(end.diff(today)).asDays())
    setTimeDistance(distanceDay)

    if (distanceDay >= 7) {
      setBgColor("green")
    } else if (distanceDay >= 3) {
      setBgColor("orange")
    } else if (distanceDay >= 0) {
      setBgColor("red")
    }

  }, [detail])

  return (
    <DetailBody>
      <DetailAlert style={{ color: "white", backgroundColor: bgColor }}>{timeDistance}???</DetailAlert>
      <CloseDetail onClick={deleteDetailElement}>
        <HighlightOffIcon />
      </CloseDetail>
      <DetailHeader>????????????</DetailHeader>
      <DetailElement>
        <DetailHead>?????? ??????</DetailHead>
        <DetailTitle>{detail.title}</DetailTitle>
        {/* </DetailElement>
      <DetailElement> */}
        {/* <DetailHead>?????? ??????</DetailHead> */}
        <DetailTitle>{desc}</DetailTitle>
      </DetailElement>
      <DetailElement>
        <DetailHead>?????? ?????? ??????</DetailHead>
        <DetailTitle>{startString}</DetailTitle>
      </DetailElement>
      <DetailElement>
        <DetailHead>?????? ?????? ??????</DetailHead>
        <DetailTitle>{endString}</DetailTitle>
      </DetailElement>
      {detail.url && detail.url !== "" && (
        <DetailElement>
          <DetailHead>?????? URL</DetailHead>
          <DetailUrl href={detail.url}>????????????</DetailUrl>
        </DetailElement>
      )
      }
    </DetailBody>
  );
}

export default Detail;