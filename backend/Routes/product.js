const router = require('express').Router();
const ensureAuth = require('../Middlewares/Auth')


router.get('/', ensureAuth, (req, res)=>{
    res.status(200).json([
        {
            name : "Suncreen",
            price : 350
        },
        {
            name : "moisturizer",
            price : 250
        }
    ])
})
    


module.exports = router;
