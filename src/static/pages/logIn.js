import React, {useContext, useEffect, useState} from "react";
import {Button, FormControl, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";
import jwtDecode from 'jwt-decode';
import AuthContext from "../components/AuthContext";
import Messages from "../components/Messages";

export default function LogIn(props) {
    const GradientContainer = props.bgGradient
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {loginUser} = useContext(AuthContext)

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                props.setIsAuthenticated(true);
                navigate('/profile');
            }
        }
    }, [navigate, props]);


    const handleChange = (e) => {
        const {id, value} = e.target;
        console.log(id, value);
        setFormData({
            ...formData,
            [id]: value,
        });
    };


    const handleSubmit = async (e) => {
        try {
            console.log("LOGIN")
            e.preventDefault()
            const username = e.target.username.value
            const password = e.target.password.value
            console.log(username)
            console.log(password)
            await loginUser(username, password)

            setOpenSuccess(true);
            setOpenWarning(false);

            props.setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/profile');
        } catch (error) {
            setOpenSuccess(false);
            setOpenWarning(true);
        }
    };


    const handleButtonClick = () => {
        navigate('/register');
    };

    return (

        <GradientContainer>
            <div style={{height: '5rem'}}>
            </div>


            <div className="login-content">
                <div className="login-title">
                    <Typography component={'span'} variant="h3" >
                        <FormattedMessage id='login.title'
                                          defaultMessage="Log In"/>
                    </Typography>
                </div>
                <br/>
                <br/>

                <form onSubmit={handleSubmit}>
                    <FormControl
                        margin="normal"
                        color="primary"
                        variant="filled">


                        <TextField id="username"
                                   type="text"
                                   value={formData.username} onChange={handleChange} variant="outlined"
                                   color="secondary"
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
                                   value={formData.password} onChange={handleChange} variant="outlined"
                                   color="secondary"
                                   style={{width: '100%'}}
                                   InputLabelProps={{color: "primary"}}
                                   label={
                                       <Typography variant="body2">
                                           <FormattedMessage id='login.password'
                                                             defaultMessage="Password"/>
                                       </Typography>
                                   }
                                   aria-describedby="password-text"/>
                        <Typography component={'span'} variant="caption" sx={{marginLeft: '0.7rem'}}>

                            <FormattedMessage
                                // id="login.forgotten"
                                id="login.forgotten.password"
                                defaultMessage="{link}"
                                values={{
                                    link: (
                                        <a href="/recover" target="_blank" rel="noopener noreferrer">
                                            <FormattedMessage id="login.forgotten.password"
                                                              defaultMessage="Parola uitata"/>
                                        </a>
                                    ),
                                }}
                            />
                        </Typography>
                        <br/>

                        <Messages openSuccess={openSuccess} openWarning={openWarning} setOpenSuccess={{setOpenSuccess}}
                                  setOpenWarning={setOpenWarning}
                                  successMessage={<FormattedMessage id='login.alert.succ'/>}
                                  warningMessage={<FormattedMessage id='login.alert.warn'/>}/>


                        {/*<Button onClick={() => handleSubmit(formData)} variant="contained" color="secondary">*/}
                        <Button variant="contained" color="secondary" type="submit">
                            <Typography component={'span'} variant='body1' style={{color: "#E0F2F1"}}>
                                <FormattedMessage id='login.title'
                                                  defaultMessage="Log In"/>
                            </Typography>
                        </Button>

                        <br/>

                    </FormControl>

                </form>
                <Button onClick={() => handleButtonClick()} variant="contained" color="primary">
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