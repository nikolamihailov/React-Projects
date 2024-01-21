// const BASE_URL = import.meta.env.VITE_REST_API_BASE_URL; deployed server endpoint
const BASE_URL = "http://localhost:3030";  // local test server endpoint


const requester = async (method, URL, data) => {

    const options = { method, headers: {} };

    if (data) {
        options.headers = {
            "content-type": "application/json"
        };
        options.body = JSON.stringify(data);
    }

    // if user is making authorized request, put special header
    const lsData = JSON.parse(localStorage.getItem("kolplace-auth"));
    if (lsData !== null && Object.keys(lsData).length > 0) {
        options.headers["X-Authorization"] = lsData.token;
    }

    const res = await fetch(BASE_URL + URL, options);
    const result = await res.json();

    return result;
};

export const request = {
    get: requester.bind(null, "GET"),
    post: requester.bind(null, "POST"),
    put: requester.bind(null, "PUT"),
    delete: requester.bind(null, "DELETE"),
};