import React from "react";
import Header from "../components/header";
import {Button, Grid, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";

export default function Clients(props) {
    const GradientContainer = props.bgGradient
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();


    const goToProfile = () => {
        navigate('/profile');
    };

    return (
        <GradientContainer>

            <div style={{height: '5rem'}}>
            </div>
            <Grid container className="clients-title">
                    <Typography component={'span'} variant="h3">
                        <FormattedMessage id='clients.title'
                                          defaultMessage="Clients"/>
                    </Typography>

                </Grid>


            <Grid container className='clients'>
                <div>

                    <br/>

                    <br/>



                    <Button onClick={() => goToProfile()} variant="contained" color="secondary">
                        <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                            <FormattedMessage id='clients.profile.button' defaultMessage="Go to Profile"/>
                        </Typography>
                    </Button>

                    <br/>
                    <br/>


                </div>
            </Grid>


        </GradientContainer>
    )


}