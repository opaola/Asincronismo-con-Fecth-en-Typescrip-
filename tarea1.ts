import {Product, OrderDetail} from "./Interface";

//lista de productos
  async function getProductos(): Promise<Product[]> {
    const response = await fetch(`https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json`);
    const products = await response.json() as Product[];
    return products;
    }

//lista de pedidos
  async function getOrderDetails(): Promise<OrderDetail[]> {
    const response = await fetch(`https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json`);
    const orderDetails = await response.json() as OrderDetail[];
    return orderDetails;

}
//Producto con mas ordenes
(async()=> {
    const products = await getProductos ();
    const orderDetails = await getOrderDetails();

    const productMap: {[Key: number]: string} = {};
    products.forEach(product => {
      productMap[parseInt (product.idproducto)] = product.nombreProducto;
    });

    const OrderDetailMap: {[key: number]:string} ={};
    orderDetails.forEach(orderDetail => {
      const id= Number (orderDetail.idproducto);
      OrderDetailMap[id] = (OrderDetailMap[id] || 0) + orderDetail.cantidad;
    });

     let maxID = 0;
     let maxCount = 0;
     Object.keys(OrderDetailMap).forEach(key => {
      const id = parseInt(key);
      const count = parseInt(OrderDetailMap[id]);
        if (count > maxCount) {
            maxCount = count;
            maxID = id;
        }
    });
    const roundedCount = Number(maxCount.toFixed(2));;
    console.log(`El producto más pedido es ${productMap[maxID]} con ${roundedCount} unidades.`);
})();










