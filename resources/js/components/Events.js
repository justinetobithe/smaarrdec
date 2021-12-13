import React, { useState, useEffect, useContext } from "react";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { useFetch } from "../customHook";
import { NavLink } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { AppContext } from "../store";


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const DragAndDropCalendar = withDragAndDrop(Calendar);


export default function Events() {

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/events"
    });

    useEffect(() => {
        dispatch({ type: "FETCH_EVENTS", payload: data });
    }, [data])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading])

    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(undefined);

    const [showAssignments, setShowAssignments] = useState(true);
    const [showCourseTimes, setShowCourseTimes] = useState(true);
    const [showOfficeHours, setShowOfficeHours] = useState(true);
    const [showStudySessions, setShowStudySessions] = useState(false); // add later

    const setView = [
        setShowAssignments,
        setShowCourseTimes,
        setShowOfficeHours,
        setShowStudySessions,
    ];

    function Event({ event }) {
        return (
            <span>
                <strong>{event.title}</strong>
                {event.desc && ':  ' + event.desc}
            </span>
        )
    }

    function EventAgenda({ event }) {
        return (
            <span>
                <em style={{ color: 'magenta' }}>{event.title}</em>
                <p>{event.desc}</p>
            </span>
        )
    }



    const handleSelectSlot = ({ start, end, slots }) => {
        setSelectedDate(start);
        return;
    };

    let components = {
        event: Event, // used by each view (Month, Day, Week)
        // toolbar: MyToolbar,
        agenda: {
            event: EventAgenda // with the agenda view use a different component to render events
        }
    }


    const filterViewChange = (selected) => {
        var indexOfSelected = [];
        selected.map((selection) =>
            indexOfSelected.push(selection.index)
        );

        viewOptions.map((option) =>
            indexOfSelected.includes(option.index)
                ? setView[option.index](true)
                : setView[option.index](false)
        );
    };

    const goToBack = () => {
        let mDate = toolbar.date;
        let newDate = new Date(
            mDate.getFullYear(),
            mDate.getMonth() - 1,
            1);
        toolbar.onNavigate('prev', newDate);
        this.getCalendarEvents(newDate);

    }

    return (
        <>

            <section id="events" className="events">
                <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                    <div className="section-title">
                        <h2>Events</h2>
                        <p>Calendar Event</p>
                    </div>


                    <Calendar
                        customButtons={{
                            myCustomButton: {
                                text: 'custom!',
                                click: function () {
                                    alert('clicked the custom button!');
                                },
                            },
                        }}
                        events={
                            state.events.map(events => ({
                                id: events.id,
                                title: <NavLink className="text-white" to={"/event/" + events.event_slug}>{events.event_title}</NavLink>,
                                start: new Date(events.date_started),
                                end: new Date(events.date_ended),
                            }))
                        }

                        components={components}
                        views={["month", "agenda"]}
                        localizer={localizer}
                        style={{ height: 800 }}
                        defaultDate={new Date()}
                        defaultView={Views.AGENDA}
                    // dayPropGetter={customDayPropGetter}
                    // slotPropGetter={customSlotPropGetter}
                    // components={{
                    //     event: Event,
                    //     agenda: {
                    //         event: EventAgenda,
                    //     },
                    // }}
                    />

                    {/* <Calendar
                        selectable
                        resizable
                        popup

                        localizer={localizer}
                        events={
                            state.events.map(events => ({
                                id: events.id,
                                title: <NavLink className="text-white" to={"/event/" + events.event_slug}>{events.event_title}</NavLink>,
                                start: new Date(events.date_started),
                                end: new Date(events.date_ended),
                            }))
                        }
                        startAccessor="start"
                        endAccessor="end" 
                        onSelectSlot={handleSelectSlot}

                        style={{ height: 800 }}
                        defaultDate={new Date()}
                    /> */}


                </div>
            </section>

        </>
    )

}