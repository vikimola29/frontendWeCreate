import React, {useContext, useEffect, useState} from "react";
import AuthContextProfileData from "../../components/fetchProfileData";
import AuthContext from "../../components/AuthContext";
import {useNavigate} from "react-router-dom";
import {Button, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {getUsersProjects} from "../../utils/api";

const Profile = (props) => {
    const GradientContainer = props.bgGradient
    const {user} = useContext(AuthContextProfileData);
    const {logoutUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const {authTokens} = useContext(AuthContext);


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getUsersProjects(authTokens)
                setProjects(response.data);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            }
        };
        fetchProjects();
    }, [authTokens]);


    const goToClients = () => {
        navigate('/clients')
        scrollToTop()

    }
    const goToProjects = () => {
        navigate('/projects')
        scrollToTop()

    }
    const goToUpdateUser = (clientId) => {
        navigate(`/clientS-update/${clientId}`);
        scrollToTop()


    }
    const handleLogout = async () => {
        await logoutUser()
        navigate('/')
        scrollToTop()

    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    return (
        <GradientContainer>
            <div className="profile">
                <div style={{height: '5rem'}}>
                </div>
                <div className="profile-title">
                    <Typography component={'span'} variant="h3">
                        <FormattedMessage id='profile.title'
                                          defaultMessage="Hellow"/>
                    </Typography>
                    {user && <Typography component={'span'} variant="h3" style={{marginLeft: '1rem'}}>
                        {user.name}
                    </Typography>}

                </div>
                <br/>
                <br/>
                <Grid container className="profile-userdata-projectdata">

                    {/*CLIENTS*/}

                    {user && user.status === "Client" && (
                        <Grid container item sm={12} md={4} className="profile-userdata">
                            <div className="profile-userdata-name">
                                <br/>
                                <br/>

                                <Typography component={'span'} variant="h3">
                                    {user.name}
                                </Typography>
                            </div>

                            <div>
                                <br/>
                                <Typography component={'span'} variant="body1"><FormattedMessage id='user.email'
                                                                                      defaultMessage="Email:  "/> {user.email}</Typography>
                                <br/>
                                <Typography component={'span'} variant="body1"><FormattedMessage id='user.address'
                                                                                      defaultMessage="Address:  "/>  {user.address}</Typography>
                                <br/>
                                <Typography component={'span'} variant="body1"><FormattedMessage id='user.company_name'
                                                                                      defaultMessage="Company:  "/> {user.company_name}</Typography>
                                <br/>
                                <Typography component={'span'} variant="body1"><FormattedMessage id='user.status'
                                                                                      defaultMessage="Status:  "/> {user.status}</Typography>
                                <br/>
                                <br/>
                                <Button onClick={() => goToUpdateUser(user.id)} variant="contained" color="secondary">
                                    <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                        <FormattedMessage id='profile.update.user.button' defaultMessage="Update Data"/>
                                    </Typography>
                                </Button>

                            </div>
                        </Grid>

                    )}
                    {user && user.status === "Client" && (
                        <Grid container item sm={12} md={8} className="profile-projects">
                            {projects.map((project) => (

                                <div className="profile-project-card" key={project.id}>
                                    <Typography variant="h4">{project.name}</Typography>
                                    <Typography variant="body1"><a href={project.link} target="_blank"><FormattedMessage
                                        id='projects.gotopage'
                                        defaultMessage="Go to page"/></a></Typography>
                                    <br/>
                                    <Typography variant="body1"><FormattedMessage id='projects.finish.date'
                                                                                  defaultMessage="Finish Due Date: "/></Typography>
                                    <Typography variant="body1"><FormattedMessage id='projects.status'
                                                                                  defaultMessage="Status: "/> {project.status}
                                    </Typography>
                                    <br/>
                                    <Typography variant="body1"><FormattedMessage id='projects.batch.price'
                                                                                  defaultMessage="Batch Price: "/>{project.batch_price}€</Typography>
                                    <Typography variant="body1"><FormattedMessage id='projects.batch.date'
                                                                                  defaultMessage="Batch Payment Due
                                            Date: "/> {project.batch_payment_due_date}</Typography>
                                    <Typography variant="body1"><FormattedMessage id='projects.batch.status'
                                                                                  defaultMessage="Batch Payment
                                            Status: "/> {project.batch_payment_status}</Typography>
                                    <br/>
                                    <Typography variant="body1"><FormattedMessage id='projects.monthly.price'
                                                                                  defaultMessage="Monthly Price: "/> {project.monthly_price}€
                                    </Typography>
                                    <Typography variant="body1"><FormattedMessage id='projects.monthly.date'
                                                                                      defaultMessage="Monthly Payment Due
                                            Date: "/> {project.monthly_payment_due_date}</Typography>
                                    <Typography variant="body1"><FormattedMessage id='projects.monthly.status'
                                                                                      defaultMessage="Monthly Payment
                                            Status: "/> {project.monthly_payment_status}</Typography>
                                    <br/>
                                    <br/>
                                    <br/>
                                </div>
                            ))}
                        </Grid>
                    )}

                    {/*ADMIN*/}

                    {user && user.status === "Admin" && (
                        <Grid container item sm={12} md={6} className="profile-userdata">
                            <div className="profile-userdata-name">
                                <Typography component={'span'} variant="h3">
                                    {user.name}
                                    {/*<FormattedMessage id='profile.user.title'*/}
                                    {/*                  defaultMessage="User data"/>*/}

                                </Typography>
                            </div>

                            <div>
                                <br/>
                                <Typography component={'span'} variant="body1"><FormattedMessage id='user.email'
                                                                                      defaultMessage="Email:  "/> {user.email}</Typography>
                                <br/>
                                <Typography component={'span'} variant="body1"><FormattedMessage id='user.status'
                                                                                      defaultMessage="Status:  "/> {user.status}</Typography>
                                <br/>
                                <br/>
                            </div>
                        </Grid>

                    )}
                    {user && user.status === "Admin" && (
                        <Grid container item sm={12} md={6} className="profile-projects">
                            <div className="profile-projects-btn">
                                <Button onClick={() => goToClients()} variant="contained" color="primary">
                                    <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                        <FormattedMessage id='profile.clients.btn' defaultMessage="Go to Clients"/>
                                    </Typography>
                                </Button>
                            </div>

                            <div className="profile-projects-btn">
                                <Button onClick={() => goToProjects()} variant="contained" color="primary">
                                    <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                        <FormattedMessage id='profile.projects.btn' defaultMessage="Go to Projects"/>
                                    </Typography>
                                </Button>
                            </div>
                        </Grid>
                    )}
                </Grid>
                <br/>
                <br/>
                <div className="profile-logout">
                    <Button onClick={handleLogout} variant="contained" color="secondary">
                        <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                            <FormattedMessage id='profile.logout.button' defaultMessage="Logout"/>
                        </Typography>
                    </Button>
                </div>
                <br/>
                <br/>
            </div>
        </GradientContainer>
    )
        ;
};

export default Profile;
