import { TextField } from "@mui/material";


function LoginWarning(){

return(

    <div className="testmain">
      <div className="cut">
      <TextField  label="First Name"   name='firstName'  variant="outlined" />
    <div className="warning">
      <img 
        src="https://github.com/saif0133/deploy-sec/blob/main/imgs/warning.png?raw=true" 
        alt="" 
        style={{ width: "100px" ,marginBottom:"20px"}} 
      />
    </div>
          <h4 style={{color:"#90908F"}} >Please Login to show your Data</h4>
           </div>
           </div>
);


}


export default LoginWarning;