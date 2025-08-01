import axios from "axios";

export const api = axios.create({
    baseURL: 'https://97492e2de952.ngrok-free.app',
    headers: {
        "ngrok-skip-browser-warning": "69420",
    }
})