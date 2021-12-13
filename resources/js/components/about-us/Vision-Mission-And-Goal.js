import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useFetch } from '../../customHook'
import { AppContext } from '../../store'

export default function Vision_Mission_And_Goal() {

    const { state, dispatch } = useContext(AppContext)

    const { data, loading } = useFetch({
        url: "/api/system-options/get-essential-data"
    })

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <section id="about" className="about">
                <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                    <div className="content" dangerouslySetInnerHTML={{ __html: data.vision_mission_goal }} />
                </div>
            </section>
        </>
    )
}
