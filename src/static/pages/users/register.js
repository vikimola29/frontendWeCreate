import React, {useContext, useState} from "react";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {Button, FormControl, FormHelperText, TextField} from "@mui/material";
import Messages from "../../components/Messages";
import AuthContext from "../../components/AuthContext";
import {createUser} from "../../components/api";


export default function Register(props) {
    const GradientContainer = props.bgGradient
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company_name: '',
        password: '',
        password2: ''

    });
    const {loginUser} = useContext(AuthContext)


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
            await createUser(formData);
            setOpenSuccess(true);
            setOpenWarning(false);
        } catch (error) {
            console.error('Error during registration:', error);
            setOpenSuccess(false);
            setOpenWarning(true);
        }
    };



    return (

        <GradientContainer>
            <div style={{height: '5rem'}}>
            </div>

            <div className="register-content">

                <div className="register-title">
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

                    <TextField id="company_name"
                               type="text"
                               value={formData.company_name} onChange={handleChange} variant="outlined"
                               color="secondary"
                               style={{width: '100%'}}
                               InputLabelProps={{color: "primary"}}
                               label={
                                   <Typography variant="body2">
                                       <FormattedMessage id='register.company_name'
                                                         defaultMessage="Company Name"/>
                                   </Typography>
                               }
                               aria-describedby="name-text"/>
                    <FormHelperText id="password-text">
                        <Typography component={'span'} variant="body2">
                            <FormattedMessage id='register.company_name.helper'
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

                    <Messages openSuccess={openSuccess} openWarning={openWarning} setOpenSuccess={setOpenSuccess}
                              setOpenWarning={setOpenWarning}
                              successMessage={<FormattedMessage id='register.alert.succ'/>}
                              warningMessage={<FormattedMessage id='register.alert.warn'/>}/>


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