const {createProxyMiddleware} = require('http-proxy-middleware');
require('dotenv').config();
module.exports = function(app) {
    app.use(createProxyMiddleware('/api/*', {
        target: process.env.REACT_APP_BACKEND_URL,
        secure: false,
        changeOrigin: true,}))}
    