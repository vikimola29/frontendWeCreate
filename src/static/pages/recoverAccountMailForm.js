import React, {useState} from "react";
import Header from "../components/header";
import {Alert, Button, FormControl, FormHelperText, Grid, TextField, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import {useNavigate} from "react-router-dom";




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


    const handleSubmit = async (formData) => {
        try {
            await axios.post('http://127.0.0.1:8000/backend/api/recover/', formData);
            routerNavigate('/recover-password')
        } catch (error) {
            const messageW = <FormattedMessage id='recover.warn'/>
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
            <Header/>
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