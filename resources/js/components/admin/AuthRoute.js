
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AppContext } from '../../store'
import Layout from './Layout'

export default function AuthRoute({ component: Component, ...rest }) {
    const { state } = useContext(AppContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                isset(state.user.id) ? (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/admin/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />

    )
}
