import { useState,useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Saq from "./scenes/SAQ";
import Update from "./scenes/Update/Update";
import Login from "./scenes/Login/Login";
import CreateAdmin from "./scenes/createAdmin/CreateAdmin";
import ChangePass from "./scenes/ChangePassword/ChangePass";
import ResetPass from "./scenes/Reset password/ResetPass";
import Bulkupload from "./scenes/form/Bulkupload";
import MerchantList from "./scenes/MerchantList/index";
import MerchantForm from "./scenes/MerchantList/MerchantForm";
import FormInfo from "./scenes/MerchantList/FormInfo";
import { ToastContainer } from "react-toastify";
import MrmScreen from "./scenes/MrmScreen/MrmScreen";
import MerchantApproval from "./scenes/MerchantApproval/MerchantApproval";
import MerchantLog from "./scenes/logs/MerchantLog";
import AdminLog from "./scenes/logs/AdminLog";
import Mainform from "../src/components/Form/Mainform";
import PrivateRoute from "./utils/PrivateRoutes";
import PrivateRoute1 from "./utils/PrivateRoutes1";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();
  const storedUserId = sessionStorage.getItem("userId");
  const  AdminEmail=sessionStorage.getItem("AdminEmail");
  const MrmEmail=sessionStorage.getItem("MrmEmail");



 
//   useEffect(() => {
//   const checkAuthentication = async () => {
//     try {
//       if(MrmEmail && !storedUserId){
//         navigate('/mrm')
//       }
//       else if (!storedUserId ) {
//         await navigate("/");
//       }
//     } catch (error) {
//       console.error("Error occurred while checking authentication:", error);
//     }
//   };
//   checkAuthentication();  
// }, [storedUserId, navigate]);

  const isLoginPage = window.location.pathname === "/";
  const isForgetPassword = window.location.pathname === "/reset-password";
  const isPdf = window.location.pathname === "/pdf";
  const isMrm=window.location.pathname==="/mrm";
const isHdfcForm = window.location.pathname === "/hdfcForm";

  const sidebarVisible = isHdfcForm || isMrm || isLoginPage || isForgetPassword || isPdf ? false : isSidebar;
  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {sidebarVisible && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!isLoginPage && !isPdf  && !isHdfcForm && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route element={<PrivateRoute/>}>
                <Route element={<Dashboard/>}path="/dashboard" exact/>
                <Route element={<MerchantList/>} path="/merchantList"/>
                <Route path="/form" element={<Form />} />
              <Route path="/update" element={<Update />} />
              <Route path="/createAdmin" element={<CreateAdmin />} />
              <Route path="/saqs" element={<Saq />} />
              <Route path="/changePassword" element={<ChangePass />} />
              <Route path="/reset-password" element={<ResetPass />} />
              <Route path="bulkupload" element={<Bulkupload />} />
              <Route path="merchantForm" element={<MerchantForm />} />
              <Route path="formInformation" element={<FormInfo />} />
              <Route path="merchantApproval" element={<MerchantApproval/>}/>
              <Route path="/merchantLog" element={<MerchantLog/>}/>
              <Route path="/adminLog" element={<AdminLog/>}/>
             
             
              </Route>
              <Route element={<PrivateRoute1/>}>
              <Route path="/mrm" element={<MrmScreen/>}/>
              <Route path ="/hdfcForm" element={<Mainform/>}/>


              </Route>
              <Route element={<Login/>} path="/"/>

              
              </Routes>
             
             
            
            {/* <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/merchantList" element={<MerchantList />} />
              <Route path="/form" element={<Form />} />
              <Route path="/update" element={<Update />} />
              <Route path="/createAdmin" element={<CreateAdmin />} />
              <Route path="/saqs" element={<Saq />} />
              <Route path="/changePassword" element={<ChangePass />} />
              <Route path="/reset-password" element={<ResetPass />} />
              <Route path="bulkupload" element={<Bulkupload />} />
              <Route path="merchantForm" element={<MerchantForm />} />
              <Route path="formInformation" element={<FormInfo />} />
              <Route path="merchantApproval" element={<MerchantApproval/>}/>
              <Route path="/merchantLog" element={<MerchantLog/>}/>
              <Route path="/adminLog" element={<AdminLog/>}/>
              <Route path="/mrm" element={<MrmScreen/>}/>
              <Route path ="/hdfcForm" element={<Mainform/>}/>
            </Routes> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
