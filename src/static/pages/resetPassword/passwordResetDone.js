import React from "react";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";


export default function PasswordResetDone(props) {
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
                    <FormattedMessage id='recover.done.title'
                                      defaultMessage="Password reset complete"/>
                </Typography>
                <br/>
                <br/>
                <Typography component={'span'} variant="p" style={{textAlign: 'center'}}>
                    <FormattedMessage id='recover.done.text'
                                      defaultMessage="Your Password has been set. You may go ahead and login"/>
                </Typography>
                <br/>
                <br/>

                <Button onClick={navigateToHomePage} variant="contained" color="secondary">
                    <Typography component={'span'} variant='body1' style={{color: "#E0F2F1"}}>
                        <FormattedMessage id='recover.done.btn'
                                          defaultMessage="To Home Page"/>
                    </Typography>
                </Button>


                <br/>
                <br/>

            </div>


        </GradientContainer>
    )


}