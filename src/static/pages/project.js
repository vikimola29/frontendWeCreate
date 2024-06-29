import React, {useEffect, useState} from "react";
import Header from "../components/header";
import {Button, Grid, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Projects(props) {
    const GradientContainer = props.bgGradient
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    // const [projects, setProjects] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    //
    // useEffect(() => {
    //     const fetchProjects = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/backend/api/projects/', {
    //                 headers: {
    //                     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //                 }
    //             });
    //             setProjects(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchProjects();
    // }, []);
    //
    // if (loading) return <Typography>Loading...</Typography>;
    // if (error) return <Typography>Error fetching projects</Typography>;
    //

    const goToProfile = () => {
        navigate('/profile');
    };

    return (
        <GradientContainer>

            <div style={{height: '5rem'}}>
            </div>
            <Grid container className="projects-title">
                <Typography component={'span'} variant="h3">
                    <FormattedMessage id='projects.title'
                                      defaultMessage="List of Projects"/>
                </Typography>

            </Grid>
        {/*    <Grid container >*/}
        {/*    {projects.map((project) => (*/}
        {/*        <Grid item xs={12} sm={6} md={4} key={project.id}>*/}
        {/*            <div className="project-card">*/}
        {/*                <Typography variant="h5">{project.name}</Typography>*/}
        {/*                <Typography variant="body1">Link: {project.link}</Typography>*/}
        {/*                <Typography variant="body1">Status: {project.status}</Typography>*/}
        {/*                <Typography variant="body1">Finish Due Date: {project.finish_due_date}</Typography>*/}
        {/*                <Typography variant="body1">Batch Price: ${project.batch_price}</Typography>*/}
        {/*                <Typography variant="body1">Monthly Price: ${project.monthly_price}</Typography>*/}
        {/*                <Typography variant="body1">Batch Payment Due Date: {project.batch_payment_due_date}</Typography>*/}
        {/*                <Typography variant="body1">Monthly Payment Due Date: {project.monthly_payment_due_date}</Typography>*/}
        {/*                <Typography variant="body1">Batch Payment Status: {project.batch_payment_status}</Typography>*/}
        {/*                <Typography variant="body1">Monthly Payment Status: {project.monthly_payment_status}</Typography>*/}
        {/*                <Typography variant="body1">Registered Date: {project.registeredDate}</Typography>*/}
        {/*            </div>*/}
        {/*        </Grid>*/}
        {/*    ))}*/}
        {/*</Grid>*/}


            <Grid container className='projects'>
                <div>
                    <Button onClick={() => goToProfile()} variant="contained" color="secondary">
                        <Typography component={'span'} style={{color: "#E0F2F1"}} variant='body1'>
                            <FormattedMessage id='clients.profile.button' defaultMessage="Go to Profile"/>
                        </Typography>
                    </Button>
                </div>
            </Grid>


        </GradientContainer>
    )


}