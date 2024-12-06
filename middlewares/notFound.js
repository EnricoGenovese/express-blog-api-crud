function notFound(req, res, next) {
    res.status(404).json({
        error: 404, message: "Content not found"
    });
}

module.exports = notFound;