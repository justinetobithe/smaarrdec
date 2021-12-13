import React, { useContext } from "react";
import { Route, Redirect, Router } from "react-router-dom";
import { AppContext } from "@/store";
import Layout from "@/components/Layout";

export default function GuestRoute({ component: Component, ...rest }) {
    const { state } = useContext(AppContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                <Layout>
                    <Component {...props} />
                </Layout>
            }
        />
    );
}