import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {Button, FormControl, FormHelperText, TextField} from "@mui/material";
import Messages from "../components/Messages";


export default function Register(props) {
    const GradientContainer = props.bgGradient
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyName: '',
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
        const response = await fetch('http://127.0.0.1:8000/backend/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                companyName: formData.companyName,
                password: formData.password,
                password2: formData.password2
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            console.log('Registration successful:', data.message);
            setOpenSuccess(true);
            setOpenWarning(false);
        } else {
            console.log('Registration failed:', data.message);
            setOpenSuccess(false);
            setOpenWarning(true);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        setOpenSuccess(false);
        setOpenWarning(true);
    }
};

    // const handleSubmit = async (formData) => {
    //     try {
    //         // formData.preventDefault();
    //         const response = await fetch('http://127.0.0.1:8000/backend/api/register/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 name: formData.name,
    //                 email: formData.email,
    //                 companyName: formData.companyName,
    //                 password: formData.password,
    //                 password2: formData.password2
    //             })
    //         });
    //
    //         const data = await response.json();
    //
    //         if (data.success) {
    //             console.log('Registration successful:', data.message);
    //             setOpenSuccess(true);
    //             setOpenWarning(false);
    //         } else {
    //             console.log('Registration failed:', data.message);
    //             setOpenSuccess(false);
    //             setOpenWarning(true);
    //         }
    //     } catch (error) {
    //         console.error('Error during registration:', error);
    //         setOpenSuccess(false);
    //         setOpenWarning(true);
    //     }
    // };


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

                    <TextField id="companyName"
                               type="text"
                               value={formData.companyName} onChange={handleChange} variant="outlined" color="secondary"
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