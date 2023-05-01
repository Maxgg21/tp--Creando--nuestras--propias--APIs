const { Movie , sequelize , Actor} =  require('../../database/models');
const {op} = sequelize

module.exports = {
    list : async (req, res) => {
        try {
            const MOVIES = await Movie.findAll();
            const RESPONSE = {
                meta : {
                    status: 200,
                    url : 'api/movies',
                    total : MOVIES.length,
                    data : MOVIES
                }
            }
            res.status(200).json(RESPONSE);
        } catch (error) {
            res.status(500).send(error);
        } 
    },
    detail : async (req, res) => {
        try {
            const MOVIE = await Movie.findByPk(req.params.id);
            if (MOVIE){
                const RESPONSE = {
                    status : 200,
                    endpoint: `api/movies/detail/${req.params.id}`,
                    data: MOVIE,
                }

                return res.status(200).send(RESPONSE);
            }

            return res.status(400).json(`El MOVIE con id: ${req.params.id} no existe`);

        } catch (error) {
            return res.status(500).send(error);
        }
    },
    new: (req, res) => {
        Movie.findAll({
            order : [
                ['rating', 'DESC']
            ],
            limit: 5
        })
        .then(movies => {
                if (movies) {
                    const RESPONSE = {
                        meta : {
                            status: 200,
                            url : 'api/movies/newMovies',
                            total : movies.length,
                            data : movies
                        }
                    }
                    return res.status(200).json(RESPONSE);
                }
               return res.status(500).json('Er')
            });
    },
    create: (req,res) => {
        try {
            let RESULT =  Movie.create(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                }
            );
            return res.status(200).json({
                meta : {
                    url: "api/movies/create",
                    msg : "Pelicula agregada"                    
                },
                data : RESULT,
            })    
        } catch (error) {
            return res.status(500).send({
                meta : {
                    url: "api/movies/create",
                    msg : "Error al agregar la pelicula"
                }
            })
        }
        
        
    },
    destroy: async (req, res) => {
        const {id : MOVIE_ID} = req.params;
       
        const ACTOR_DELETE = await Actor.update( {favorite_movie_id : null }, {
            where : {
                favorite_movie_id : MOVIE_ID
            }
        })
        if (!ACTOR_DELETE) {
            throw new Error('ERORRRRRRRRRRRRRRRR AQUI')
        } else {
            const RESULT = Movie.destroy({where: {id:req.params.id}, force: true}); // force: true es para asegurar que se ejecute la acción
            if (RESULT === 1) {
                    RESPONSE = {
                        meta : {
                            status : 200,
                            url: "api/movies/delete/:id",
                            msg: `Pelicula con el id ${req.params.id} eliminada`
                        },
                    };
                    return res.status(200).json(RESPONSE)
                }else {
                    RESPONSE = {
                        meta : {
                            status : 201,
                            url: "api/movies/delete/:id",
                            msg: `Pelicula con el id ${req.params.id} eliminada`
                        },
                    };
                    return res.status(201).send(RESPONSE)
                };
            }
        }
}