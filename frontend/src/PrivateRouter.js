import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { userContext } from './App'

const PrivateRouter = ({ component: Component, ...rest }) => {
    const { state, dispatch } = useContext(userContext)
    return (
        <Route
            {...rest}
            render={props => {
                return state ? <Component {...props} /> : <Redirect to="/login"></Redirect>
            }}
        ></Route>
    )
}

export default PrivateRouter
