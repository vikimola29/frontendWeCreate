import {createContext, useState, useEffect} from 'react'
import jwtDecode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {obtainToken} from "../utils/api";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));


    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('authTokens');
        if (token) {
            try {
                return jwtDecode(token);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('authTokens');
                return null;
            }
        }
        return null;
    });

    const [authTokens, setAuthTokens] = useState(() => {
        const token = localStorage.getItem('authTokens');
        if (token) {
            try {
                return JSON.parse(token);
            } catch (error) {
                console.error('Failed to parse auth tokens:', error);
                localStorage.removeItem('authTokens');
                return null;
            }
        }
        return null;
    });

    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    let loginUser = async (email, password) => {
        const response = await obtainToken(email, password)
        let data = response.data
        if (data) {
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))

            setIsAuthenticated('true');
            localStorage.setItem('isAuthenticated', 'true');

            navigate('/')
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });} else {
            alert('Something went wrong while logging in the user!')}}

    let logoutUser = () => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        setIsAuthenticated('false');
        localStorage.setItem('isAuthenticated', 'false');

        navigate('/')
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        window.location.reload(false);
    }

    const updateToken = async () => {
        const response = await fetch('http://127.0.0.1:8000/token/refresh/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({refresh: authTokens?.refresh})})
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            console.log("NO UPDATE")
            logoutUser()}
        if (loading) {
            setLoading(false)}}


    useEffect(() => {
        if (authTokens) {updateToken()}
        const REFRESH_INTERVAL = 1000 * 60 * 100
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }}, REFRESH_INTERVAL)
        return () => clearInterval(interval)
    }, [loading])

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}