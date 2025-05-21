const { db } = require('../firebase/config');

const getProducts = async (req, res) => {
    try {
        const snapshot = await db.collection('products').get();

        if(snapshot.empty){
            return res.status(204).json({message: 'No hay productos registrados de momento.'})
        }
        
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(products);
    }catch (err) {
        console.error('Error al obtener los productos:', err);
        res.status(500).json({message: 'Error interno del servidor' });
    }
};

module.exports = { getProducts };