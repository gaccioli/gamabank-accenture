
const root = {
    method:'GET',
    path: '/',
    handler: (req, h) => {
     return h.redirect("https://gamabank-accenture.herokuapp.com/documentation")
    }
}


module.exports = root
