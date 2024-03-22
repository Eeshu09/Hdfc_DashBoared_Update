
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { DarkContext } from "./DarkBar";
import LogoutIcon from '@mui/icons-material/Logout';
import MrmScreen from "../MrmScreen/MrmScreen";
import { useNavigate } from "react-router-dom";
const Topbar = () => {
  const navigate=useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { isDark, SetIsDark } = useContext(DarkContext);

  const mrmScreen = window.location.pathname === "/mrm";

  const handleIconClick = () => {
    colorMode.toggleColorMode(); 
    SetIsDark(!isDark); 
  };
  const handleLogOut=()=>{
    sessionStorage.clear();
    navigate('/')

  }

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
      </Box> */}

      {/* ICONS */}
      <Box
        style={{
          position: "fixed",
          top: "12px",
          zIndex: "2000",
          backgroundColor: isDark ? "#fcfcfc" : "#111b2d",
        }}
      >
        
        <IconButton onClick={handleIconClick} >
          
          {isDark ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        {mrmScreen &&
        <IconButton onClick={handleLogOut}>
         <LogoutIcon/>
        </IconButton>
}
      </Box>
    </Box>
  );
};

export default Topbar;