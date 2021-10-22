import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useHistory, useLocation } from "react-router-dom";
import { deleteCookie } from '../../utils/cookie';

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [where, setWhere] = React.useState("");
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    let path = location.pathname
    if (path === "/share") {
      setWhere("취업 공유 게시판")
    } else if (path === "/personal") {
      setWhere("개인 게시판")
    } else {
      setWhere("로그아웃")
    }
  }, [])

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    let value = event.target.innerText
    setWhere(value)
    if (value === "취업 공유 게시판") {
      history.push("share");
    } else if (value === "개인 게시판") {
      history.push("personal");
    } else if (value === "로그아웃") {
      deleteCookie("token", "")
      history.push("login");
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        style={{ color: 'white' }}
        onClick={handleClick}
      >
        <AppsIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={handleClose}
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: '14px',
            fontWeight: 'bold',
          }}>
          취업 공유 게시판
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: '14px',
            fontWeight: 'bold',
          }}>
          개인 게시판
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: '14px',
            fontWeight: 'bold',
          }}>
          로그아웃
        </MenuItem>
      </Menu>
    </div>
  );
}
