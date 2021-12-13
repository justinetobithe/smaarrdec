import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AppContext } from '../../store'
import Layout from './Layout'

export default function GuestRoute({ component: Component, ...rest }) {
    const { state } = useContext(AppContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                !isset(state.user.id) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/admin/dashboard",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    )
}
