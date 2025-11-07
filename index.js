const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Simple health route
app.get('/health', (req, res) => res.json({ ok: true }));

// Fallback for unknown routes to serve index.html (useful for simple SPAs)
// Comment out if you don't want this behavior.
app.use((req, res, next) => {
    // Only serve index.html for GET requests that want HTML (avoid interfering with APIs/static files)
    if (req.method !== 'GET' || req.headers.accept?.indexOf('text/html') === -1) return next();
    res.sendFile(path.join(__dirname, 'public', 'index.html'), err => {
        if (err) return next(err);
    });
});

const server = app.listen(PORT, () => {
    console.log(`Express server serving ./public on http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
    console.log('Shutting down...');
    server.close(() => process.exit(0));
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);