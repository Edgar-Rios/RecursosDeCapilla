let router = require('express').Router()
let controller = require('../controllers/nochePelisController.js')

router.get('/', controller.nochePelis)
router.get('/pelicula/:peli', controller.pelicula)
router.post('/votar', controller.votarPeli)
router.get('/listaVotaciones', controller.listasVotaciones)


module.exports = router
