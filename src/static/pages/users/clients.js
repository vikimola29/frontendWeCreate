import React, {useContext, useEffect, useState} from "react";
import Header from "../../components/header";
import {Button, Grid, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../components/AuthContext";
import axios from "axios";
import {deleteUser, getAllUsers} from "../../components/api";

export default function Clients(props) {
    const GradientContainer = props.bgGradient
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const {authTokens} = useContext(AuthContext);


    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await getAllUsers(authTokens)
                setClients(response.data);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            }
        };
        fetchClients();
    }, [authTokens]);


    const goToProfile = () => {
        navigate('/profile');
    };

    const goToUpdate = (clientId) => {
        navigate(`/client-update/${clientId}`);
    }
    const goToDelete = async (clientId) => {
        await deleteUser(authTokens, clientId)
        window.location.reload(false);


    }

    const goToRegister=()=>{
        navigate('/register');
    }

    return (
        <GradientContainer>
            <div className='clients'>

                <div style={{height: '5rem'}}>
                </div>
                <Grid container className="clients-title">
                    <Typography component={'span'} variant="h3">
                        <FormattedMessage id='clients.title'
                                          defaultMessage="Clients"/>
                    </Typography>

                </Grid>

                <div>

                <Button onClick={() => goToProfile()} variant="contained" color="primary">
                    <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                        <FormattedMessage id='clients.profile.button' defaultMessage="Go to Profile"/>
                    </Typography>
                </Button>
                <Button onClick={() => goToRegister()} variant="contained" color="primary" style={{marginTop:'1rem'}}>
                            <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                <FormattedMessage id='projects.profile.button' defaultMessage="Register new User"/>
                            </Typography>
                        </Button>
                </div>
                <br/>
                <br/>

                <Grid container>
                    {clients.map((client) => (
                        <Grid item xs={12} key={client.email}>
                            <div className="project-card">
                                <br/>
                                <br/>

                                <Grid container spacing={1}>
                                    <Grid className="clients-data" item xs={12} md={3}>
                                        <Typography variant="h4">{client.name}</Typography>
                                        <Typography variant="h4">{client.id}</Typography>
                                    </Grid>
                                    <Grid className="clients-data" item xs={12} md={4}>
                                        <Typography variant="body1">Email: {client.email}</Typography>
                                        <Typography variant="body1">Company Name: {client.company_name}</Typography>
                                    </Grid>
                                    <Grid className="clients-data" item xs={12} md={4}>
                                        <Typography variant="body1">Phone Number: {client.phone_number}</Typography>
                                        <Typography variant="body1">Address: {client.address}</Typography>
                                        <Typography variant="body1">Status: {client.status}</Typography>
                                    </Grid>
                                    <Grid className="clients-data" item xs={12} md={1}>
                                        <Button onClick={() => goToUpdate(client.id)} variant="contained"
                                                color="secondary">
                                            <Typography component={'span'} style={{color: "#E0F2F1"}}
                                                        variant='body1'>
                                                <FormattedMessage id='project.edit.button'
                                                                  defaultMessage="Update"/>
                                            </Typography>
                                        </Button>
                                        <div style={{height: '1rem'}}>
                                        </div>
                                        <Button onClick={() => goToDelete(client.id)} variant="contained" color="secondary">
                                            <Typography component={'span'} style={{color: "#E0F2F1"}}
                                                        variant='body1'>
                                                <FormattedMessage id='project.delete.button'
                                                                  defaultMessage="Delete"/>
                                            </Typography>
                                        </Button>
                                    </Grid>

                                </Grid>
                            </div>
                        </Grid>

                    ))}

                </Grid>

            </div>

            <br/>
            <br/>

        </GradientContainer>
    )


}