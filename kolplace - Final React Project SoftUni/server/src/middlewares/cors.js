module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://kolplace.onrender.com');
    res.setHeader('Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'Content-Type, X-Authorization');
    next();
};