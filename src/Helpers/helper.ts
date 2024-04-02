import joi from 'joi'

const authSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30),
    confirm_password: joi.ref('password')

})

export default authSchema