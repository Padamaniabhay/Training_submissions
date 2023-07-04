const Joi = require("joi");

const validateAuthData = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });

    const { error } = schema.validate({ email: req.body.email, password: req.body.password });
    if (error) {
        error.status = 403;
        return next(error);
    }

    next();
};

module.exports = validateAuthData;