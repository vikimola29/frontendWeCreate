import React, {useContext, useEffect, useState} from "react";
import {Button, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../components/AuthContext";
import {deleteUser, getAllUsers} from "../../utils/api";

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
         scrollToTop()
    };

    const goToUpdate = (clientId) => {
        navigate(`/client-update/${clientId}`);
    }
    const goToDelete = async (clientId) => {
        await deleteUser(authTokens, clientId)
        window.location.reload(false);


    }




    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const goToRegister = () => {
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
                <br/>
                <br/>
                <div className="clients-nav-btns">

                    <Button onClick={() => goToProfile()} variant="contained" color="primary">
                        <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                            <FormattedMessage id='profile.btn' defaultMessage="Go to Profile"/>
                        </Typography>
                    </Button>
                    <Button onClick={() => goToRegister()} variant="contained" color="primary"
                            style={{marginTop: '1rem'}}>
                        <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                            <FormattedMessage id='profile.btn2' defaultMessage="Register new User"/>
                        </Typography>
                    </Button>
                </div>


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
                                        <Typography variant="body1"><FormattedMessage id='user.email'
                                                                                      defaultMessage="Email:  "/>  {client.email}</Typography>
                                        <Typography variant="body1"><FormattedMessage id='user.company_name'
                                                                                      defaultMessage="Company:  "/> {client.company_name}</Typography>
                                    </Grid>
                                    <Grid className="clients-data" item xs={12} md={3}>
                                        <Typography variant="body1"><FormattedMessage id='user.phone'
                                                                                      defaultMessage="Phone Number:  "/> {client.phone_number}</Typography>
                                        <Typography variant="body1"><FormattedMessage id='user.address'
                                                                                      defaultMessage="Address:  "/> {client.address}</Typography>
                                        <Typography variant="body1"><FormattedMessage id='user.status'
                                                                                      defaultMessage="Status:  "/> {client.status}</Typography>
                                    </Grid>
                                    <Grid className="clients-data-btn" item xs={12} md={2}>
                                        <Button onClick={() => goToUpdate(client.id)} variant="contained"
                                                color="secondary">
                                            <Typography component={'span'} style={{color: "#E0F2F1"}}
                                                        variant='body1'>
                                                <FormattedMessage id='update.btn'
                                                                  defaultMessage="Update"/>
                                            </Typography>
                                        </Button>
                                        <div style={{height: '1rem'}}>
                                        </div>
                                        <Button onClick={() => goToDelete(client.id)} variant="contained"
                                                color="secondary">
                                            <Typography component={'span'} style={{color: "#E0F2F1"}}
                                                        variant='body1'>
                                                <FormattedMessage id='delete.btn'
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