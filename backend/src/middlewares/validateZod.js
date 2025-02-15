const zod = require('zod');

const validateRegister = (req, res, next) => {
    const schema = zod.object({
        fullname: zod.object({
            firstname: zod.string().min(3),
            lastname: zod.string().min(3),
        }),
        email: zod.string().email(),
        password: zod.string().min(8),
    });

    const { data, error } = schema.safeParse(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })

    const { data, error } = schema.safeParse(req.body);
    let errors = [];
    if (error) {
        error.errors.map(err => {
            errors.push(err.message);
        });
        return res.status(400).json({
            success: false,
            message: errors
        });
    }
    next();
}

module.exports = { validateRegister, validateLogin };