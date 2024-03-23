import {Route,Navigate,Outlet} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const PrivateRoute=({children,...rest})=>{ 
    // const navigate=useNavigate();
    let auth={'token':false}
    const adminId = sessionStorage.getItem('userId');
    const MrmEmail=sessionStorage.getItem("MrmEmail")
    if (adminId || MrmEmail ) {
      auth.token = true;
    }
    
    
  
    return (
       auth.token?<Outlet/>:<Navigate to="/"/>
    )

}
export default PrivateRoute;