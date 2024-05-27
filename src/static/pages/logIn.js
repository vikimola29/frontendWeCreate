import React, {useState} from "react";
import Header from "../components/header";
import {Alert, Button, FormControl, TextField, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function LogIn(props) {
    const GradientContainer = props.bgGradient
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const handleChange = (e) => {
        const {id, value} = e.target;
        console.log(id, value);
        setFormData({
            ...formData,
            [id]: value,
        });
    };



    const handleSubmit = async (formData) => {
        try {
            await axios.post('http://127.0.0.1:8000/backend/api/login/', formData);
            const messageS = <FormattedMessage id='login.alert.succ'/>
            setSuccessMessage(messageS);
            setOpenSuccess(true);
            setOpenWarning(false);
        } catch (error) {
            const messageW = <FormattedMessage id='login.alert.warn'/>
            setWarningMessage(messageW);
            setOpenSuccess(false);
            setOpenWarning(true);
        }
    };


    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseWarning = () => {
        setOpenWarning(false);
    };



    const handleButtonClick = () => {
        navigate('/register');
  };

    return (

        <GradientContainer>
            <Header/>
            <div style={{height: '5rem'}}>
            </div>


            <div className="login-content">
                <div className="login-title">
                    <Typography component={'span'} variant="h3" style={{textAlign: 'center'}}>
                        <FormattedMessage id='login.title'
                                          defaultMessage="Log In"/>
                    </Typography>
                </div>
                <br/>
                <br/>



                <FormControl
                    margin="normal"
                    color="primary"
                    variant="filled">


                    <TextField id="email"
                               type="email"
                               value={formData.email} onChange={handleChange} variant="outlined" color="secondary"
                               style={{width: '100%'}}
                               InputLabelProps={{color: "primary"}}
                               label={
                                   <Typography variant="body2">
                                       <FormattedMessage id='login.email'
                                                         defaultMessage="Mail"/>
                                   </Typography>
                               }
                               aria-describedby="email-text"/>


                    <br/>

                    <TextField id="password"
                               type="password"
                               value={formData.password} onChange={handleChange} variant="outlined" color="secondary"
                               style={{width: '100%'}}
                               InputLabelProps={{color: "primary"}}
                               label={
                                   <Typography variant="body2">
                                       <FormattedMessage id='login.password'
                                                         defaultMessage="Password"/>
                                   </Typography>
                               }
                               aria-describedby="password-text"/>
                    <Typography component={'span'} variant="caption" sx={{marginLeft:'0.7rem'}}>

                        <FormattedMessage
                            // id="login.forgotten"
                            id="login.forgotten.password"
                            defaultMessage="{link}"
                            values={{
                                link: (
                                    <a href="/recover" target="_blank" rel="noopener noreferrer">
                                        <FormattedMessage id="login.forgotten.password" defaultMessage="Parola uitata"/>
                                    </a>
                                ),
                            }}
                        />
                    </Typography>
                    <br/>


                    {openSuccess && (
                        <div>
                            <Button
                                aria-label="close"
                                color="inherit"
                                size="small"
                                sx={{textTransform: 'none'}}
                            > <Alert onClick={handleCloseSuccess} icon={<CheckIcon fontSize="inherit"/>}
                                     severity="success" sx={{width: '100%'}}>
                                <Typography component={'span'} variant="body2">
                                    {successMessage}
                                </Typography>

                            </Alert>
                            </Button>
                            <br/>
                            <br/>
                        </div>)}


                    {openWarning && (
                        <div>
                            <Button
                                aria-label="close"
                                color="inherit"
                                size="small"
                                sx={{textTransform: 'none'}}>
                                <Alert onClick={handleCloseWarning} severity="warning" sx={{width: '100%'}}>
                                    <Typography component={'span'} variant="body2">
                                        {warningMessage}
                                    </Typography>
                                </Alert>
                            </Button>
                            <br/>
                            <br/>
                        </div>
                    )}



                    <Button onClick={() => handleSubmit(formData)} variant="contained" color="secondary">
                        <Typography component={'span'} variant='body1' style={{color: "#E0F2F1"}}>
                            <FormattedMessage id='login.title'
                                              defaultMessage="Log In"/>
                        </Typography>
                    </Button>

                    <br/>

                </FormControl>


                <Button onClick={() => handleButtonClick()}  variant="contained" color="primary">
                        <Typography component={'span'} variant='body1' style={{color: "#E0F2F1"}}>
                            <FormattedMessage id='login.register'
                                              defaultMessage="No account? Register!"/>
                        </Typography>
                    </Button>




                <br/>
                <br/>

            </div>


        </GradientContainer>
    )


}