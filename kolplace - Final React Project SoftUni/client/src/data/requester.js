const BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

const requester = async (method, URL, data) => {

    const options = {
        method
    };

    if (data) {
        options.headers = {
            "content-type": "application/json"
        };
        options.body = JSON.stringify(data);
    }

    // if user is making authorized request, put special header

    const req = await fetch(BASE_URL + URL, options);

    if (!req.status.ok) {
        console.log("Problem");
    }

    const res = await req.json();

    return res;
};

export const request = {
    get: requester.bind(null, "GET"),
    post: requester.bind(null, "POST"),
    put: requester.bind(null, "PUT"),
    delete: requester.bind(null, "DELETE"),
};