function errorHandler(err, req, res, next) {
    console.error(err.stack)
    //console.log(err);
    res.status(err.statusCode || 500);
    res.json({
        error: err.message
    });
}

module.exports = errorHandler;