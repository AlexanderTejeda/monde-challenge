const { db } = require('../firebase/config');

const createOrder = async (req, res) => {
    const { cart, user } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0){
        return res.status(400).json({ error: 'El carrito esta vacio, verifique su orden.' });
    }

    if (!user || !user.name || !user.email) {
        return res.status(400).json({ error: 'Faltan datos del usuario' });
    }

    try {
        const batch = db.batch();

        for(const item of cart){
            const productRef = db.collection('products').doc(item.id);
            const productSnap = await productRef.get();
            
            if (!productSnap.exists) {
                return res.status(404).json({ error: `El producto con ID ${item.id} no existe` });
            }
            
            const productData = productSnap.data();
            
            const quantity = item.quantity || 1;

            if (!productData.status || productData.stock < quantity) {
                return res.status(400).json({ message: `Producto "${productData.name}" sin stock suficiente o inactivo` });
            }

            const newStock = productData.stock - quantity;
            batch.update(productRef, { stock: newStock });
        }

          const orderRef = await db.collection('orders').add({
                user,
                cart,
                createAt: new Date().toISOString()
            })

            await batch.commit();

            res.status(201).json({
                message: 'Orden creada con exito',
                orderId: orderRef.id,
                cart,
                user
            });

    }catch (err) {
        console.error('Error al crear la orden:', err);
        res.status(500).json({message: 'Error al guardar la orden.' });
    }
};

module.exports = { createOrder};