import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetch } from '../customHook';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Agencies() {

    const { data, loading } = useFetch({
        url: "/api/get-agencies-by-name",
    });

    return (
        <>
            <section id="consortium-agencies" className="consortium-agencies">
                <div className="agencies-slider container" data-aos="zoom-in" data-aos-delay="100">
                    <Swiper
                        navigation
                        // pagination={{ clickable: true }} 
                        onSwiper={(swiper) => true}
                        onSlideChange={() => true}
                        speed={600}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }}
                        slidesPerView={'auto'}
                        pagination={{
                            el: '.swiper-pagination',
                            type: 'bullets',
                            clickable: true
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 5
                            },
                            576: {
                                slidesPerView: 2,
                                spaceBetween: 5
                            },

                            768: {
                                slidesPerView: 3,
                                spaceBetween: 5
                            },

                            1200: {
                                slidesPerView: 6,
                                spaceBetween: 5
                            }
                        }}
                    >

                        {data.map(agency => (
                            <SwiperSlide key={agency.id}>
                                <img style={{ cursor: "pointer" }} className="img-fluid" src={agency.logo_url} alt={agency.agency_name}></img>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

        </>
    )
}
