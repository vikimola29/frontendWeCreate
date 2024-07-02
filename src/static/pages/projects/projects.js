import React, {useContext, useEffect, useState} from "react";
import Header from "../../components/header";
import {Button, Grid, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthContext from "../../components/AuthContext";
import {deleteProject, getAllProjects} from "../../components/api";

export default function Projects(props) {
    const GradientContainer = props.bgGradient
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const {authTokens} = useContext(AuthContext);


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getAllProjects(authTokens)
                setProjects(response.data);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            }
        };

        fetchProjects();
    }, [authTokens]);
    const goToProfile = () => {
        navigate('/profile');
        scrollToTop()

    };
    const goToAddProject = () => {
        navigate('/project-create');
        scrollToTop()

    };


    const goToUpdate = (projectId) => {
        navigate(`/project-update/${projectId}`);
        scrollToTop()
    }
    const handleDelete  = async (projectId) =>  {
        try{
            await deleteProject(authTokens, projectId)
        }catch (error) {
            console.log(error)
        }
        window.location.reload(false);

    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <GradientContainer>
            <div className="projects">

                <div style={{height: '5rem'}}>
                </div>
                <div className="projects-title">
                    <Typography component={'span'} variant="h3">
                        <FormattedMessage id='projects.title'
                                          defaultMessage="List of Projects"/>
                    </Typography>


                </div>

                <br/>
                <Grid container className="projects-nav-btns-ccontainer">
                    <Grid item xs={12} sm={6} className="projects-nav-btns">
                        <Button onClick={() => goToProfile()} variant="contained" color="primary" style={{marginTop:'1rem'}}>
                            <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                <FormattedMessage id='projects.profile.button' defaultMessage="Go to Profile"/>
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} className="projects-nav-btns">



                        <Button onClick={() => goToAddProject()} variant="contained" color="primary" style={{marginTop:'1rem'}}>
                            <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                                <FormattedMessage id='projects.profile.button' defaultMessage="Create Prtoject"/>
                            </Typography>
                        </Button>
                    </Grid>

                </Grid>

                <Grid container>
                    {projects.map((project) => (
                        <Grid item xs={12} key={project.id}>
                            <div className="project-card">
                                <br/>
                                <br/>
                                <Typography variant="h4">{project.name}</Typography>
                                <Grid container spacing={1}>
                                    <Grid className="projects-data" item xs={12} md={3}>
                                        <Typography variant="body1"><a href={project.link} target="_blank"
                                                                       rel="noopener noreferrer">Go to
                                            page</a></Typography>
                                        <Typography variant="body1">Finish Due
                                            Date: {project.finish_due_date}</Typography>
                                        <Typography variant="body1">Status: {project.status}</Typography>
                                    </Grid>
                                    <Grid className="projects-data" item xs={12} md={4}>
                                        <Typography variant="body1">Batch Price: ${project.batch_price}</Typography>
                                        <Typography variant="body1">Batch Payment Due
                                            Date: {project.batch_payment_due_date}</Typography>
                                        <Typography variant="body1">Batch Payment
                                            Status: {project.batch_payment_status}</Typography>
                                    </Grid>
                                    <Grid className="projects-data" item xs={12} md={4}>
                                        <Typography variant="body1">Monthly Price: ${project.monthly_price}</Typography>
                                        <Typography variant="body1">Monthly Payment Due
                                            Date: {project.monthly_payment_due_date}</Typography>
                                        <Typography variant="body1">Monthly Payment
                                            Status: {project.monthly_payment_status}</Typography>
                                    </Grid>
                                    <Grid className="projects-data" item xs={12} md={1}>
                                        <Button onClick={() => goToUpdate(project.id)} variant="contained"
                                                color="secondary">
                                            <Typography component={'span'} style={{color: "#E0F2F1"}}
                                                        variant='body1'>
                                                <FormattedMessage id='project.edit.button'
                                                                  defaultMessage="Update"/>
                                            </Typography>
                                        </Button>
                                        <div style={{height: '1rem'}}>
                                        </div>
                                        <Button onClick={() => handleDelete(project.id)} variant="contained"
                                                color="secondary">
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