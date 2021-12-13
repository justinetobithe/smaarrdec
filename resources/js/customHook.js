import axios from "axios";
import { useState, useEffect } from "react";

export const useFetch = (req) => {
    const [response, setResponse] = useState({
        data: [],
        loading: false,
        loadingContainer: false
    });
    useEffect(() => {
        if (!req.url.length) return;

        const fetch = async () => {
            try {
                //Initialize Response
                setResponse({
                    data: [],
                    loading: true,
                });

                //API Request
                await axios.get("/sanctum/csrf-cookie");
                let { data } = await axios(req);
                setResponse({
                    data: data,
                    loading: false,
                    loadingContainer: false
                });
            } catch (e) {
                setResponse({
                    data: [],
                    loading: false,
                    loadingContainer: false
                })
            }
        };

        //API Request
        fetch();

        return () => {
            setResponse({
                data: [],
                loading: false,
                loadingContainer: false
            });
        };
    }, [req.url]);
    return response;
};

export const useHttpRequest = (fn) => {
    const [response, setResponse] = useState({
        data: null,
        loading: false,
        error: "",
    });
    const [request, setRequest] = useState();

    useEffect(() => {
        if (!request) return;

        const apiRequest = async () => {
            try {
                setResponse({
                    data: null,
                    loading: true,
                    error: "",
                });

                //API Request
                await axios.get("/sanctum/csrf-cookie");
                const { data } = await axios(request);
                setResponse({
                    data: data,
                    loading: false,
                    error: "",
                });
            } catch (e) {
                let status = e.response.status;
                setResponse({
                    data: null,
                    loading: false,
                    error:
                        status !== 400
                            ? e.response.data.message
                            : e.response.statusText,
                })
            }
        };

        //API Request
        apiRequest();
    }, [request]);

    return [response, (...args) => setRequest(fn(...args))];
};

export const useSearch = (url, keyword) => {
    const [reponse, setResponse] = useState({
        data: [],
        loading: false,
    });

    useEffect(() => {
        const search = async () => {
            try {
                //Initialize Response
                setResponse({
                    data: [],
                    loading: false,
                });

                //API Request
                const { data } = await axios(url + keyword);

                //Set Result
                setResponse({
                    data: data,
                    loading: false,
                });
            }
            catch (error) {
                setResponse({
                    data: [],
                    loading: false,
                });
            }
        };

        let timeout = null;
        if (keyword.length) {
            //Set Loading
            setResponse((state) => ({
                ...state,
                loading: true,
            }));

            clearTimeout(timeout);
            //Detect users stop typing
            timeout = setTimeout(() => {
                search(keyword);
            }, 500);
        }

        return () => {
            clearTimeout(timeout);
            //Initialize Result
            setResponse({
                data: [],
                loading: false,
            });
        };
    }, [keyword]);

    return response;
}