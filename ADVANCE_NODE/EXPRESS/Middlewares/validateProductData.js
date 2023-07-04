const Joi = require("joi")

const validateProductData = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).positive().required(),
        description: Joi.string().required(),
    });

    const { error } = schema.validate(req.body.product);
    if (error) {
        error.status = 403;
        return next(error);
    }
    next();
};

module.exports = validateProductData;
