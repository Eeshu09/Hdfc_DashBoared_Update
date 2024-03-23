import {Route,Navigate,Outlet} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const PrivateRoute1=({children,...rest})=>{ 
    // const navigate=useNavigate();
    let auth={'token':false}
    const MrmId = sessionStorage.getItem('MrmEmail');
    if (MrmId) {
      auth.token = true;
    }
  
    return (
       auth.token?<Outlet/>:<Navigate to="/"/>
    )

}
export default PrivateRoute1;