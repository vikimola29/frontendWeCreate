import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import AuthContext from "../components/AuthContext";


export default function Profile(props) {
    const GradientContainer = props.bgGradient
    let {authTokens, logoutUser} = useContext(AuthContext)

    const navigate = useNavigate();

    // const handleButtonClick = () => {
    //     navigate('/register');
    // };

    const handleLogout = async () => {
        await logoutUser();
        props.setIsAuthenticated('false');
        localStorage.setItem('isAuthenticated', 'false');
        navigate('/');
        console.log("Logout Profile")

    }

    return (

        <GradientContainer>
            <div className="profile">
                <div style={{height: '5rem'}}>
                </div>
                <div className="profile-logout-button">
                    <Button onClick={() => handleLogout()} variant="contained" color="secondary">
                        <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                            <FormattedMessage id='logout.button'
                                              defaultMessage="Logout"/>
                        </Typography>
                    </Button>
                </div>

            </div>

        </GradientContainer>
    )


}