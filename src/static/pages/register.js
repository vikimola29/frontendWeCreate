import React, {useState} from "react";
import Header from "../components/header";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {Alert, Button, FormControl, FormHelperText, TextField} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";


export default function Register(props) {
    const GradientContainer = props.bgGradient
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''

    });


    const handleChange = (e) => {
        const {id, value} = e.target;
        // console.log(id, value);
        setFormData({
            ...formData,
            [id]: value,
        });
    };


    const handleSubmit = async (formData) => {
        try {
            await axios.post('http://127.0.0.1:8000/backend/api/register/', formData);
            const messageS = <FormattedMessage id='register.alert.succ'/>
            setSuccessMessage(messageS);
            setOpenSuccess(true);
            setOpenWarning(false);
        } catch (error) {
            const messageW = <FormattedMessage id='register.alert.warn'/>
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


    return (

        <GradientContainer>
            <div style={{height: '5rem'}}>
            </div>

            <div className="register-content">

                <div  className="register-title">
                <Typography component={'span'} variant="h3" style={{textAlign: 'center'}}>
                    <FormattedMessage id='register.title'
                                      defaultMessage="Register"/>
                </Typography>
            </div>


            <br/>
            <br/>

                <FormControl
                    margin="normal"
                    color="primary"
                    variant="filled">



                    <TextField id="name"
                               type="text"
                               value={formData.name} onChange={handleChange} variant="outlined" color="secondary"
                               style={{width: '100%'}}
                               InputLabelProps={{color: "primary"}}
                               label={
                                   <Typography variant="body2">
                                       <FormattedMessage id='register.name'
                                                         defaultMessage="Name"/>
                                   </Typography>
                               }
                               aria-describedby="name-text"/>
                     <FormHelperText id="password-text">
                        <Typography component={'span'} variant="body2">
                            <FormattedMessage id='register.name.helper'
                                              defaultMessage="Your name!"/>
                        </Typography>
                    </FormHelperText>

                    <br/>

                    <TextField id="companyName"
                               type="text"
                               value={formData.name} onChange={handleChange} variant="outlined" color="secondary"
                               style={{width: '100%'}}
                               InputLabelProps={{color: "primary"}}
                               label={
                                   <Typography variant="body2">
                                       <FormattedMessage id='register.companyName'
                                                         defaultMessage="Company Name"/>
                                   </Typography>
                               }
                               aria-describedby="name-text"/>
                     <FormHelperText id="password-text">
                        <Typography component={'span'} variant="body2">
                            <FormattedMessage id='register.companyName.helper'
                                              defaultMessage="Optional"/>
                        </Typography>
                    </FormHelperText>

                    <br/>

                    <TextField id="email"
                               type="email"
                               value={formData.email} onChange={handleChange} variant="outlined" color="secondary"
                               style={{width: '100%'}}
                               InputLabelProps={{color: "primary"}}
                               label={
                                   <Typography variant="body2">
                                       <FormattedMessage id='register.email'
                                                         defaultMessage="Mail"/>
                                   </Typography>
                               }
                               aria-describedby="email-text"/>
                     <FormHelperText id="mail-text">
                        <Typography component={'span'} variant="body2">
                            <FormattedMessage id='register.mail.helper'
                                              defaultMessage="We will communicate wth this address!"/>
                        </Typography>
                    </FormHelperText>


                    <br/>

                    <TextField id="password"
                               type="password"
                               value={formData.password} onChange={handleChange} variant="outlined" color="secondary"
                               style={{width: '100%'}}
                               InputLabelProps={{color: "primary"}}
                               label={
                                   <Typography variant="body2">
                                       <FormattedMessage id='register.password'
                                                         defaultMessage="Password"/>
                                   </Typography>
                               }
                               aria-describedby="password-text"/>
                    <FormHelperText id="password-text">
                        <Typography component={'span'} variant="body2">
                            <FormattedMessage id='register.password.helper'
                                              defaultMessage="Choose a secure password!"/>
                        </Typography>
                    </FormHelperText>

                    <br/>

                    <TextField id="password2"
                               type="password"
                               value={formData.password2} onChange={handleChange} variant="outlined" color="secondary"
                               style={{width: '100%'}}
                               InputLabelProps={{color: "primary"}}
                               label={
                                   <Typography variant="body2">
                                       <FormattedMessage id='register.password2'
                                                         defaultMessage="Password Repeat"/>
                                   </Typography>
                               }
                               aria-describedby="password2-text"/>
                                <FormHelperText id="password-text">
                        <Typography component={'span'} variant="body2">
                            <FormattedMessage id='register.password2.helper'
                                              defaultMessage="Choose a secure password!"/>
                        </Typography>
                    </FormHelperText>

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
                            <FormattedMessage id='register.title'
                                              defaultMessage="Register"/>
                        </Typography>
                    </Button>
                    <br/>
                    <br/>
                </FormControl>

            </div>


        </GradientContainer>
    )


}