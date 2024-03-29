import { Box, Button, Modal, TextField ,CircularProgress,MenuItem} from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../apiConfig";
import axios from "axios";
import { useContext } from "react";
import { ToastClassName,ToastContainer,toast } from "react-toastify"
import { DarkContext } from "../../scenes/global/DarkBar";

function EditModal({ selectedItem, editModalOpen, setEditModalOpen, handleCloseModal,refetch }) { 
  const[loading,setLoading]=useState(false);
  console.log("selectedIntem",selectedItem);
  // const [mainEmail,setMainEmail]=useState('');

  const [editData, setEditData] = useState({
    
    leagalName:"",
    merchantType:"",
    dbaName:"",
    email:"",
  });
  const { isDark } = useContext(DarkContext);
  useEffect(()=>{
    setEditData({ 
         leagalName:selectedItem?.leagalName,
         merchantType:selectedItem?.merchantType,
         dbaName:selectedItem?.dbaName,
         email:selectedItem?.email,
    })

  },[selectedItem])
  const handleCancel=()=>{
    setEditData({
      leagalName:'',
      merchantType:'',
      email:'',
      dbaName:''
    })

    handleCloseModal();
  }

  const handleEditSubmit = async (email) => { 
    if (!editData.email || !editData.leagalName || !editData.dbaName || !editData.merchantType) {
      toast.error("Please fill in all fields");
      return;
    }
  
    // Validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
  
    // Validation for legal name (alphabets only)
    const legalNameRegex = /^[a-zA-Z\s]+$/;
    if (!legalNameRegex.test(editData.leagalName)) {
      toast.error("Legal name should contain only alphabets and spaces");
      return;
    }
  
    // Validation for DBA name (alphabets only)
    const dbaNameRegex = /^[a-zA-Z\s]+$/;
    if (!dbaNameRegex.test(editData.dbaName)) {
      toast.error("DBA name should contain only alphabets and spaces");
      return;
    }
    setLoading(true);
    try {
        const patchData = [
            {
                path: "/leagalName",
                op: "replace",
                // from: "string",
                value: editData?.leagalName,
            },
            {
              path: "/email",
              op: "replace",
              // from: "string",
              value:editData?.email, 
            },
            
            {
              path: "/dbaName",
              op: "replace",
              // from: "string",
              value:editData?.dbaName, 
            },
            {
              path: "/merchantType",
              op: "replace",
              // from: "string",
              value:editData?.merchantType, 
            },    
        ];

        const response = await axios.patch(
            `${BASE_URL}PatchMerchant`,
            patchData,{
              params:{
                Email:email
              },
            }
        );
        console.log("response",response);
        if(response?.status===200){
          toast.success("Data update Successfully",{
            position:'top-center'
          });
          handleCancel();
          refetch();
        }
    } catch (error) {
      toast.error("Something went wrong")
        console.error("Error editing merchant:", error);
    }finally{
      setLoading(false);
      setEditModalOpen(false);

    }
};
const handleMerchantTypeChange = (e) => {
  setEditData({ ...editData, merchantType: e.target.value });
};

  return (
    <>
    <Modal
      open={editModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <TextField
          label="Leagal Name"
          value={editData.leagalName}
          name="leagalName"
          onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: {
              color: isDark ? "black" : "white",
            },
          }}

        />
        <TextField
          label="Email"
          name="email"
          value={editData.email}
          onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
          fullWidth
          InputLabelProps={{
            style: {
              color: isDark ? "black" : "white",
            },
          }}

          margin="normal"
        />
         <TextField
          label="Dba Name"
          name="dbaName"
          value={editData.dbaName}
          onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
          fullWidth
          InputLabelProps={{
            style: {
              color: isDark ? "black" : "white",
            },
          }}

          margin="normal"
        />
         
         <TextField
          label="MerchantType"
          name="merchantType"
          value={editData.merchantType}
          onChange={handleMerchantTypeChange}
          fullWidth
          select 
          InputLabelProps={{
            style: {
              color: isDark ? "black" : "white",
            },
          }}
          margin="normal"
        >
          {/* Dropdown options */}
          <MenuItem value="Level 1">Level 1</MenuItem>
          <MenuItem value="Level 2">Level 2</MenuItem>
          <MenuItem value="Level 3">Level 3</MenuItem>
          <MenuItem value="Level 4">Level 4</MenuItem>
          <MenuItem value="MRM_Level 4">MRM_Level 4</MenuItem>

        </TextField>
       
        

        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleEditSubmit(selectedItem.email)}
          >
           {loading?<CircularProgress size={20}/>:"Edit"}
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{ marginLeft: 8 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
    {/* <ToastContainer/> */}
    </>
  );
}

export default EditModal;
