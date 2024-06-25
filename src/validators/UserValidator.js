const Joi = require('joi');

const postSchema = Joi.object({
    email: Joi.string().email().required(),
    zipCode: Joi.string().pattern(new RegExp('^[0-9]{5}$')).required(),
    id: Joi.string().required()
});

const putSchema = Joi.object({
    id: Joi.string().required()
});

const deleteSchema = Joi.object({
    id: Joi.string().required()
});

const validatePost = (data) => {
    const { error, value } = postSchema.validate(data, {
        stripUnknown: true
    });
    return { error, value };
};

const validatePut = (data) => {
    const { error, value } = putSchema.validate(data, {
        stripUnknown: true
    });
    return { error, value };
};

const validateDelete = (data) => {
    const { error, value } = deleteSchema.validate(data, {
        stripUnknown: true
    });
    return { error, value };
};

module.exports = { validatePost, validatePut, validateDelete };
