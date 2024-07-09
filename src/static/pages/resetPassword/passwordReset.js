import React, {useState} from "react";
import {Button, FormControl, FormHelperText, TextField, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";
import Messages from "../../components/Messages";
import {passwordReset} from "../../utils/api";


export default function PasswordReset(props) {
    const GradientContainer = props.bgGradient
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const routerNavigate = useNavigate()
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });


    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };


    const handleSubmit = async () => {
        try {
            await passwordReset(formData)
            routerNavigate('/password-reset-sent')
        } catch (error) {
            setOpenSuccess(false);
            setOpenWarning(true);
        }
    };

    return (

        <GradientContainer>
            <div style={{height: '5rem'}}>
            </div>


            <div className="recover-content">
                <div className="recover-title">
                    <Typography component={'span'} variant="h3" style={{textAlign: 'center'}}>
                        <FormattedMessage id='recover.title'
                                          defaultMessage="Recover Account"/>
                    </Typography>
                </div>
                <br/>
                <br/>

                {isSmallScreen && <br/>}
                {isSmallScreen && <br/>}
                {isSmallScreen && <br/>}

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
                                       <FormattedMessage id='recover.email'
                                                         defaultMessage="Mail"/>
                                   </Typography>
                               }
                               aria-describedby="email-text"/>
                    <FormHelperText id="password-text">
                        <Typography component={'span'} variant="body2">
                            <FormattedMessage id='recover.email.helper'
                                              defaultMessage="Type in your email!"/>
                        </Typography>
                    </FormHelperText>


                    <br/>


                    <Messages openSuccess={openSuccess} openWarning={openWarning} setOpenSuccess={setOpenSuccess}
                              setOpenWarning={setOpenWarning}
                              successMessage={<FormattedMessage id='recover.succ'/>}
                              warningMessage={<FormattedMessage id='recover.warn'/>}/>


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