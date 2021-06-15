
const Middlewares = {
    isUser: async (req, res, next) => {
        console.log(req.body)
        next();
    }
}

module.exports = {...Middlewares}