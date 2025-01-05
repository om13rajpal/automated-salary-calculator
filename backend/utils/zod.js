const zod = require("zod")

const userSchema = zod.object({
    username: zod.string().min(3).max(20),
    password: zod.string().min(6).max(30)
})

function validateUser(payload){
    const result = userSchema.safeParse(payload)
    return result.success
}

module.exports = {
    validateUser
}