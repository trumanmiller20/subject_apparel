import axios from "axios"

const Order = ({
  cart,
  handleChange,
  addOrder,
  newOrder,
  setCart,
  setNewOrder,
  orders,
  setOrders,
}) => {
  const handleSubmit = (e) => {
    addOrder(e)
  }

  const deleteFromCart = (e) => {
    const newCart = cart.filter((item) => item._id !== e.target.id)
    setCart(newCart)
    let delProduct = newOrder.products
    delProduct = delProduct.filter((item) => item === e.target.id)
    setNewOrder({ ...newOrder, products: delProduct })
  }

  const cancelOrder = async (e, orderIndex) => {
    let currentOrders = [...orders]
    currentOrders.splice(orderIndex, 1)
    setOrders(currentOrders)
    await axios.delete(`http://localhost:3001/order/${e.target.id}`)
  }

  const editOrder = async (e) => {
    await axios.put(`http://localhost:3001/order/${e.target.id}`)
  }

  return (
    <div className="order-form">
      <div className="display-products">
        {cart.map((product) => (
          <div className="product-card">
            <div className="product-img">
              <img src={product.image} />
            </div>
            <div className="info">
              <h3>
                {product.name} ${product.price}
              </h3>
            </div>
            <button
              className="button"
              id={product._id}
              onClick={deleteFromCart}
            >
              Delete Item
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="firstname">First Name:</label>
          <br />
          <input
            type="text"
            id="firstname"
            onChange={handleChange}
            value={newOrder.firstname}
          />
        </div>
        <div className="form-input">
          <label htmlFor="lastname">Last Name:</label>
          <br />
          <input
            type="text"
            id="lastname"
            onChange={handleChange}
            value={newOrder.lastname}
          />
        </div>
        <div className="form-input">
          <label htmlFor="address">Address:</label>
          <br />
          <input
            type="text"
            id="address"
            onChange={handleChange}
            value={newOrder.address}
          />
        </div>
        <div className="form-input">
          <label htmlFor="phone">Phone:</label>
          <br />
          <input
            type="text"
            id="phone"
            onChange={handleChange}
            value={newOrder.phone}
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
      <div className="display-orders">
        {orders?.map((order, index) => (
          <div className="order-card">
            <div className="info">
              <h3>
                {order.firstname} {order.lastname}
              </h3>
              <h4>{order.address}</h4>
              <h4>{order.phone}</h4>
              <h4>{order.products.length} Items</h4>
            </div>
            <button
              className="button"
              id={order._id}
              onClick={() => editOrder(index)}
            >
              Edit Order
            </button>
            <button
              className="button"
              id={order._id}
              onClick={(e) => cancelOrder(e, index)}
            >
              Cancel Order
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
