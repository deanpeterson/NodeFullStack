var express = require('express');
var router = express.Router();

const client = require('prom-client');

// enable prom-client to expose default application metrics
const collectDefaultMetrics = client.collectDefaultMetrics;

// define a custom prefix string for application metrics
collectDefaultMetrics({ prefix: 'my_node_app:' });

const histogram = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds histogram',
    labelNames: ['method', 'handler', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 500],
});

// GET order listing
router.get('/', async (req, res, next) => {
    res.set('Content-Type', client.register.contentType);
    res.send(await client.register.metrics());
});

module.exports = router;
