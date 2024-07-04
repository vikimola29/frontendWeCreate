import React, {useState} from "react";
import Header from "../components/header";
import {Alert, Button, FormControl, FormHelperText, Grid, TextField, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Messages from "../components/Messages";
import {recover} from "../components/api";


export default function RecoverAccountMailForm(props) {
    const GradientContainer = props.bgGradient
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const routerNavigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });


    const handleChange = (e) => {
        const {id, value} = e.target;
        // console.log(id, value);
        setFormData({
            ...formData,
            [id]: value,
        });
    };


    const handleSubmit = async () => {
        try {
            await recover(formData)
            routerNavigate('/recover-password')
        } catch (error) {
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