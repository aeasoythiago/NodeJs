const errorhandler = (error, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message : 'Algo deu errado'});
};

module.exports = {errorhandler};