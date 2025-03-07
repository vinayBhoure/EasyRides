const asyncError = (theFunction) => {
    if (typeof theFunction !== 'function') {
        throw new Error('asyncError wrapper requires a function');
    }

    return async (req, res, next) => {
        try {
            await theFunction(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = asyncError;