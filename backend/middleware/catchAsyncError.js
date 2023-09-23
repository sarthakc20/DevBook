module.exports = (theFunc) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
}