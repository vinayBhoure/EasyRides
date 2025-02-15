
const asyncError = (theFunction) => {
    return (req, res, next) => {
        return Promise.resolve(theFunction(req, res, next)).catch(next);
    }
}

module.exports = asyncError;