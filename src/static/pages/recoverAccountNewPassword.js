import React, {useState} from "react";
import Header from "../components/header";
import {Alert, Button, FormControl, FormHelperText, Grid, TextField, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import Messages from "../components/Messages";


export default function RecoverAccountNewPassword(props) {
    const GradientContainer = props.bgGradient
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [formData, setFormData] = useState({
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
            await axios.post('http://127.0.0.1:8000/backend/api/recover-password/', formData);
            const messageS = <FormattedMessage id='recover.password.succ'/>
            setSuccessMessage(messageS);
            setOpenSuccess(true);
            setOpenWarning(false);
        } catch (error) {
            const messageW = <FormattedMessage id='recover.password.warn'/>
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


            <div className="recover-password-content">
                <div className="recover-password-title">
                    <Typography component={'span'} variant="h3" style={{textAlign: 'center'}}>
                        <FormattedMessage id='recover.password.title'
                                          defaultMessage="Choose a new password!"/>
                    </Typography>
                </div>
                <br/>
                <br/>

                {isSmallScreen && <br/>}
                {isSmallScreen && <br/>}


                <FormControl
                    margin="normal"
                    color="primary"
                    variant="filled">


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

                    <br/>

                          <Messages openSuccess={openSuccess} openWarning={openWarning} setOpenSuccess={setOpenSuccess}
                                  setOpenWarning={setOpenWarning}
                                  successMessage={<FormattedMessage id='recover.password.succ'/>}
                                  warningMessage={<FormattedMessage id='recover.password.warn'/>}/>




                    <Button onClick={() => handleSubmit(formData)} variant="contained" color="secondary">
                        <Typography component={'span'} variant='body1' style={{color: "#E0F2F1"}}>
                            <FormattedMessage id='recover.title'
                                              defaultMessage="Recover"/>
                        </Typography>
                    </Button>
                    <br/>

                </FormControl>


                <br/>
                <br/>

            </div>


        </GradientContainer>
    )


}