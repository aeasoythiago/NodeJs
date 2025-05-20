const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            erro: error.errors,
            mensagem: 'Dados inválidos'
        });
    }
};

module.exports = validate; 
