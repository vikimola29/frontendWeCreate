import axios from 'axios';
import {useNavigate} from "react-router-dom";

const API_URL = 'http://127.0.0.1:8000/backend/api/';

export const getProject = (authTokens, projectId) => {
    return axios.get(`${API_URL}projects/${projectId}/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};
export const getAllProjects = (authTokens) => {
    return axios.get(`${API_URL}all-projects/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};

export const updateProject = (authTokens, projectId, projectData) => {
    return axios.put(`${API_URL}projects/${projectId}/`, projectData, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });


};

export const updateUser = (authTokens, userData) => {
    return axios.put(`${API_URL}user/`, userData, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });
};
