const {db, collection, addDoc,
    query,     // Para construir la consulta
  where,     // Para añadir condiciones de filtro
  getDocs    // Para ejecutar la consulta
} = require('../data/bd');
const OMDB_API_KEY = 'f9e094e7'; // leave empty to use local mock data

let controller = {
    nochePelis: (req, res) => {
        // res.send('Bienvenido a la Noche de Películas');
        res.render('mainVotacionPelis', { title: 'Noche de Películas JAS'});
    },


    pelicula: async (req, res) => {
        try {
            let idPeli      = req.params.peli; // Puedes usar este parámetro si es necesario           
            let votaciones  = await obtenerCantidadVotos(idPeli)
            let data        = await getPeliculaData(idPeli);
            let movie       = {...data, votaciones};

            // console.log(movie)
            // console.log(`Pelicula solicitada: ${idPeli}`);
            res.render('cardMovie', { title: `${movie.Title} - Noche de Películas JAS`, movie });
            // res.send({ movie: data, votaciones: votaciones });
                
        } catch (error) {
            console.error('Error fetching movie data:', error);

            res.status(500).send('Error retrieving movie data');
        }
    },



    votarPeli: async (req, res) => {
        try {
            const {peliculaId, userName} = req.body;
            // console.log(req.body);
            const votosCollection = collection(db, 'votosPelis');
            const votoData = { 
                peliculaId: peliculaId,
                userName: userName, 
            };
            await addDoc(votosCollection, votoData);
            console.log('Voto registrado:', votoData);
            res.redirect('/noche-pelis/listaVotaciones');
        } catch (error) {
            console.error('Error al registrar el voto:', error);
            res.status(500).send('Error al registrar el voto');
        }  
    },


    listasVotaciones: async (req, res) => {
        try {
            let listaPeliculas = await ListaPeliculasId()
            
            let listaOutput = []
            // console.log('listaPeliculas', listaPeliculas)
            for (let peliId of listaPeliculas){
                let votosPeli = await obtenerCantidadVotos(peliId)
                let pelicula  = await getPeliculaData(peliId)
                listaOutput.push({...pelicula, votos: votosPeli})
            }

            listaOutput.sort((a, b) =>  b.votos - a.votos);
    
            res.render('listaVotaciones', { title: 'Votaciones - Noche de Películas JAS' , movieList: listaOutput })

        } catch (error) {
            console.log('ups',error)
        }
    }
}


async function ListaPeliculasId() {
    let lista = new Set()
    let votacionesQuery = query(collection(db, 'votosPelis'));
    let querySnapshot =  await getDocs(votacionesQuery);
    querySnapshot.docs.map(doc => {
        lista.add(doc.data().peliculaId);
    })

    return lista
}

async function obtenerCantidadVotos (idPeli) {
    // let votaciones = 0
    let votacionesQuery = query(collection(db, 'votosPelis'), where('peliculaId', '==', idPeli));
    let querySnapshot =  await getDocs(votacionesQuery);
    console.log('Votos para', idPeli, ':', querySnapshot.docs.length)
    return querySnapshot.docs.length
} 

async function getPeliculaData(idPeli) {
    let response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(idPeli)}`)
    let data     = await response.json()
    // console.log(data)
    return data
}


module.exports = controller;