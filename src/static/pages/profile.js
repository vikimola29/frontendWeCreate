import React, {useContext, useEffect, useState} from "react";
import AuthContextProfileData from "../components/fetchProfileData";
import AuthContext from "../components/AuthContext";
import {useNavigate} from "react-router-dom";
import {Button, Grid, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import axios from "axios";

const Profile = (props) => {
    const GradientContainer = props.bgGradient
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const {user} = useContext(AuthContextProfileData);
    const {logoutUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const {authTokens} = useContext(AuthContext);


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/backend/api/projects/', {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                });
                setProjects(response.data);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            }
        };

        fetchProjects();
    }, [authTokens]);


    const goToClients = () => {
        navigate('/clients');
    };
    const goToProjects = () => {
        navigate('/projects');
    };
    const handleLogout = async () => {
        await logoutUser();
        navigate('/');
    };

    return (
        <GradientContainer>
            <div className="profile">
                <div style={{height: '5rem'}}>
                </div>
                <Grid container className="profile-title">
                    <Typography component={'span'} variant="h3">
                        <FormattedMessage id='profile.title'
                                          defaultMessage="Hellow"/>
                    </Typography>

                </Grid>
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
                                <Typography component={'span'} variant="body1">Email: {user.email}</Typography>
                                <br/>
                                <Typography component={'span'} variant="body1">Address: {user.address}</Typography>
                                <br/>
                                <Typography component={'span'} variant="body1">Company: {user.company_name}</Typography>
                                <br/>
                                <Typography component={'span'} variant="body1">Status: {user.status}</Typography>
                                <br/>
                                <br/>
                                <Button variant="contained" color="secondary">
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
                                    <Typography variant="body1"><a href={project.link} target="_blank"> Go to page </a></Typography>
                                    <br/>
                                    <Typography variant="body1">Finish Due
                                        Date: {project.finish_due_date}</Typography>
                                    <Typography variant="body1">Status: {project.status}</Typography>
                                    <br/>
                                    <Typography variant="body1">Batch Price: ${project.batch_price}</Typography>
                                    <Typography variant="body1">Batch Payment Due
                                        Date: {project.batch_payment_due_date}</Typography>
                                    <Typography variant="body1">Batch Payment
                                        Status: {project.batch_payment_status}</Typography>
                                    <br/>
                                    <Typography variant="body1">Monthly Price:
                                        ${project.monthly_price}</Typography>
                                    <Typography variant="body1">Monthly Payment Due
                                        Date: {project.monthly_payment_due_date}</Typography>
                                    <Typography variant="body1">Monthly Payment
                                        Status: {project.monthly_payment_status}</Typography>
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
                                <Typography component={'span'} variant="body1">Email: {user.email}</Typography>
                                <br/>
                                <Typography component={'span'} variant="body1">Status: {user.status}</Typography>
                                <br/>
                                <br/>
                            </div>
                        </Grid>

                    )}
                    {user && user.status === "Admin" && (
                        <Grid container item sm={12} md={6} className="profile-projects">
                            <div className="profile-projects-btn">
                                <Button onClick={() => goToClients()} variant="contained" color="secondary">
                                    <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                        <FormattedMessage id='profile.clients.button' defaultMessage="Go to Clients"/>
                                    </Typography>
                                </Button>
                            </div>

                            <div className="profile-projects-btn">
                                <Button onClick={() => goToProjects()} variant="contained" color="secondary">
                                    <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                        <FormattedMessage id='profile.projects.button' defaultMessage="Go to Projects"/>
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
// import React, {useContext, useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
// import {Button} from "@mui/material";
// import Typography from "@mui/material/Typography";
// import {FormattedMessage} from "react-intl";
// import AuthContext from "../components/AuthContext";
// import AuthContextProfileData from "../components/fetchProfileData";
//
//
// export default function Profile(props) {
//     const GradientContainer = props.bgGradient
//     const {user, fetchProfileData} = useContext(AuthContextProfileData);
//     const {authTokens, logoutUser} = useContext(AuthContext)
//     const navigate = useNavigate();
//
//
//     useEffect(() => {
//         fetchProfileData();
//     }, [fetchProfileData]);
//
//
//     const handleLogout = async () => {
//         await logoutUser();
//         props.setIsAuthenticated('false');
//         localStorage.setItem('isAuthenticated', 'false');
//         navigate('/');
//         console.log("Logout Profile")
//
//     }
//
//     return (
//
//         <GradientContainer>
//             <div className="profile">
//                 <div style={{height: '5rem'}}>
//                 </div>
//                 <div>
//                     <Typography variant="h1">Profile</Typography>
//                     {/*<Typography variant="body1">Email: {user.email}</Typography>*/}
//                     {/*<Typography variant="body1">Name: {user.name}</Typography>*/}
//                     {/*<Typography variant="body1">Address: {user.address}</Typography>*/}
//                     {/*<Typography variant="body1">Company: {user.company_name}</Typography>*/}
//                     {/*<Typography variant="body1">Status: {user.status}</Typography>*/}
//                     {/*<Typography variant="body1">Registered*/}
//                     {/*    on: {new Date(user.registered_date).toLocaleDateString()}</Typography>*/}
//                 </div>
//                 <div className="profile-logout-button">
//                     <Button onClick={() => handleLogout()} variant="contained" color="secondary">
//                         <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
//                             <FormattedMessage id='logout.button'
//                                               defaultMessage="Logout"/>
//                         </Typography>
//                     </Button>
//                 </div>
//
//             </div>
//
//         </GradientContainer>
//     )
//
//
// }