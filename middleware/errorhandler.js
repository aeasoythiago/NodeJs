const errorhandler = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({message: 'Algo deu errado'});
};

module.exports = errorhandler;