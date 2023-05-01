const { Genre } =  require('../../database/models');

module.exports = {
    list : async (req, res) => {
        try {
            const GENRES = await Genre.findAll();
            const RESPONSE = {
                meta : {
                    status: 200,
                    url : '/genres',
                    total : GENRES.length,
                    data : GENRES
                }
            }
            res.status(200).json(RESPONSE);
        } catch (error) {
            res.status(500).send(error);
        };
    },
    detail :  async (req, res) => {
        //return res.json(req.params.id)
        try {
            const GENRE = await Genre.findByPk(req.params.id);
           
            if (GENRE){
                const RESPONSE = {
                    status : 200,
                    endpoint: `/genres/${req.params.id}`,
                    data: GENRE,
                }

                return res.status(200).json(RESPONSE);
            }

            return res.status(400).json(`El genero con id: ${req.params.id} no existe`);

        } catch (error) {
            return res.status(500).send(error);
        }
    },
}