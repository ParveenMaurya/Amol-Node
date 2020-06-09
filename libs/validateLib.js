const Joi = require('joi');

module.exports = (data)=>{
    const Schema = {
        product_id : Joi.string().required(),
        user_id : Joi.string().required(),
        amount : Joi.number().min(10).max(1000).required()
    }
    return Joi.validate(data,Schema);
}