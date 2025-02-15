const globalCatch = (err, req, res, next) => {
    console.log(err)
    if(err){
        return res.status(500).json({
            success: false,
            message: err
        })
    }
}

module.exports = globalCatch