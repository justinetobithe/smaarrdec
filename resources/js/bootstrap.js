require('jquery')
require("bootstrap/dist/js/bootstrap.bundle.min.js");
require("swiper/swiper-bundle.min.js");
require("swiper/swiper-bundle.min.css");

window.axios = require("axios");
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:8000"
        : "https://smaarrdec.slims.usep.edu.ph/smaarrdec/";
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

axios.defaults.withCredentials = true;

//Global Functions
window.isset = (value) => {
    return typeof value !== "undefined" ? true : false;
}

window.formatBytes = (a, b = 2) => {
    if (0 === a) return "0 Bytes";
    const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
    return (
        parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
        " " +
        ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    );
};

/* LARAVEL ECHO */
import Pusher from "pusher-js";
import Echo from "laravel-echo";
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true
});