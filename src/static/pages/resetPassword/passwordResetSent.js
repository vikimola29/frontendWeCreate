import React, {useState} from "react";
import {Button, FormControl, FormHelperText, TextField, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";
import Messages from "../../components/Messages";
import {passwordReset} from "../../utils/api";


export default function PasswordResetSent(props) {
    const GradientContainer = props.bgGradient
    const routerNavigate = useNavigate()
    const navigateToHomePage = () => {
        routerNavigate('/')
    }
    return (

        <GradientContainer>
            <div style={{height: '5rem'}}>
            </div>


            <div className="recover-sent-content">
                <Typography component={'span'} variant="h3" style={{textAlign: 'center'}}>
                    <FormattedMessage id='recover.sent.title'
                                      defaultMessage="Password reset sent"/>
                </Typography>
                <br/>
                <br/>
                <Typography component={'span'} variant="p" style={{textAlign: 'center'}}>
                    <FormattedMessage id='recover.sent.text1'
                                      defaultMessage="We’ve emailed you instructions for setting your password, if an account exists with the email you entered. You should receive them shortly."/>
                </Typography>
                <br/>
                <Typography component={'span'} variant="p" style={{textAlign: 'center'}}>
                    <FormattedMessage id='recover.sent.text2'
                                      defaultMessage="If you don’t receive an email, please make sure you’ve entered the address you registered with, and check your spam folder."/>
                </Typography>
                <br/>
                <br/>
                <Button onClick={navigateToHomePage} variant="contained" color="secondary">
                    <Typography component={'span'} variant='body1' style={{color: "#E0F2F1"}}>
                        <FormattedMessage id='recover.sent.btn'
                                          defaultMessage="To Home Page"/>
                    </Typography>
                </Button>


                <br/>
                <br/>

            </div>


        </GradientContainer>
    )


}