const Joi = require('joi');
const schema = Joi.object({
    name: Joi.string()
              .min(2)
              .max(30)
              .required(),
    mail: Joi.string()
             .email({
                allowUnicode: true,
                tlds: true,
                minDomainSegments:2
    }),
    password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9/.$]{3,100}$")),


})

module.exports = schema;
