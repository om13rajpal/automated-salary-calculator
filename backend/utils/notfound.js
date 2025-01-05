function pageNotFound(req, res, next){
    res.status(404).send("Sorry, page not found")
}

module.exports = {
    pageNotFound,
};