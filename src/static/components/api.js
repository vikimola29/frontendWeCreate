import axios from 'axios';


const API_URL = 'http://127.0.0.1:8000/backend/api/';
export const obtainToken = (email, password) => {
    return axios.post(`${API_URL}token/`, { email, password }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
export const createProject = (authTokens, projectData) => {

    return axios.post(`${API_URL}projects/`, projectData, {

        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });
};

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

export const getUsersProjects = (authTokens) => {
    return axios.get(`${API_URL}projects/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
}

export const updateProject = (authTokens, projectId, projectData) => {
    console.log("PROJECT DATA", projectData)
    return axios.put(`${API_URL}projects/${projectId}/`, projectData, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });
};
export const deleteProject = (authTokens, projectId) => {
    return axios.delete(`${API_URL}projects/${projectId}/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });
};


export const createUser = ( userData) => {
    return axios.post(`${API_URL}clients/`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


export const getLoggedUser = (authTokens) => {
    return axios.get(`${API_URL}profile/`,{
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};
export const getUser = (authTokens, userId) => {
    return axios.get(`${API_URL}clients/${userId}/`,{
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};

export const getAllUsers = (authTokens) => {
    return axios.get(`${API_URL}all-clients/`, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    });
};
export const updateUser = (authTokens, userData, userId) => {
    return axios.put(`${API_URL}user/${userId}`, userData, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });
};
export const deleteUser = (authTokens, userData) => {
    return axios.delete(`${API_URL}user/${userData.id}`, userData, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });
};
