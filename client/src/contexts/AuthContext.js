import { createContext, useEffect, useReducer } from "react"
import axios from 'axios'
import { apiURL, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import { AuthReducer } from '../reducer/AuthReducer'
import setAuthHeader from '../defaults/setAuthHeader'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //login
    const loginUser = async loginForm => {
        try {
            const response = await axios.post(`${apiURL}/auth/login`, loginForm)
            if (response.data.success) localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)

            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }
    //register
    const registerUser = async registerForm => {
        try {
            const response = await axios.post(`${apiURL}/auth/register`, registerForm)
            if (response.data.success) localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)

            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }

    //log out
    const logoutUser = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null
            }
        })
    }

    // Authentication
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthHeader(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiURL}/auth`)
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthHeader(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }

    useEffect(() => loadUser(), [])

    // Context data
    const AuthContextData = { loginUser, authState, registerUser, logoutUser }

    // return context provider
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
