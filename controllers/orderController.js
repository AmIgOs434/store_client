
const {Order,BasketDevice, Basket,User, OrderDevice } = require('../models/models')
const ApiError = require('../error/ApiError');

class OrderController {
    async create(req, res, next) {
        try {
            let {FIO,poluchatel,address, final_price,email,phone, status, otkrytca,comment,name_poluch,familia_poluch,userId} = req.body

            const order = await Order.create({FIO,poluchatel,address,final_price ,phone,status,email,otkrytca,comment,name_poluch,familia_poluch,userId});
            
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


  async getAllItem(req, res) {
    const {id} = req.params
    const item = await Order.findAll(
        {
          where:{userId:id}
        }
    )
    return res.json(item)
}

async getOrderDevice(req, res) {
  const {id} = req.params
  const item = await OrderDevice.findAll(
      {
        where:{orderId:id}
      }
  )
  return res.json(item)
}


    async getAll(req, res) {
        const order = await Order.findAll()
        return res.json(order)
    }


    async getOne(req, res) {
        const {id} = req.params
        const order = await Order.findOne({
            where:{id:id}
        })
        return res.json(order)
    }

    async createOrderDevice(req, res) {
        
      const {img,price,orderId,quantity,name} = req.body
      const orderDevice = await OrderDevice.create({img,price,orderId,quantity,name})
  
      return res.json(orderDevice)
  }
    async delOne (req, res) {
        try {
          const { id } = req.params;
      
          const deletedOrder = await Order.destroy({
            where: { id: id },
          });
      
          if (deletedOrder) {
            return res.status(204).send('Product deleted successfully ');
          }
      
          throw new Error('Product not found');
        } catch (error) {
          return res.status(500).send(error.message);
        }
      };

      async delbasketDevice (req, res) {
        try {
          const { id } = req.params;
      
          const deletedProduct = await BasketDevice.destroy({
            where: { id: id },
          });
      
          if (deletedProduct) {
            return res.status(204).send('Product deleted successfully ');
          }
      
          throw new Error('Product not found');
        } catch (error) {
          return res.status(500).send(error.message);
        }
      };
        
    
      async updateOrder (req, res) {
        const {id} = req.params
        const order =  await Order.update(
        {
            FIO: req.body.FIO,
            address:req.body.address,
            final_price: req.body.final_price,
            email: req.body.email,
            phone: req.body.phone,
            status: req.body.status,
            comment: req.body.comment,
        },
        {
            where: {id} 
        }
        
        )
    
        if (order) {
            return res.status(206).send('Order updated successfully ');
          }throw new Error('Order not found');
        } catch (error) {
          return res.status(500).send(error.message);
    }

    async updateOrder_status (req, res) {
      const {id} = req.params
      const order =  await Order.update(
      {

          status: req.body.status,
      },
      {
          where: {id} 
      }
      
      )
  
      if (order) {
          return res.status(206).send('Order updated successfully ');
        }throw new Error('Order not found');
      } catch (error) {
        return res.status(500).send(error.message);
  }

    async Device_Basket_to_Order (req, res) {
        const {id} = req.params
        const basketDevice =  await BasketDevice.update(
        {
            orderId: req.body.orderId,
            basketId :null,
            status:0
        },
        {
            where: {basketId:id} 
        }
        )
        if (basketDevice) {
            return res.status(206).send('Order updated successfully ');
          }throw new Error('Order not found');
        } catch (error) {
          return res.status(500).send(error.message);      
    }


    async Device_Order_to_Basket (req, res) {
        const {id} = req.params
        const basketDevice =  await BasketDevice.update(
        {
            orderId:null,
            basketId :req.body.basketId,
        },
        {
            where: {orderId:id} 
        }
        )
        if (basketDevice) {
            return res.status(206).send('Order updated successfully ');
          }throw new Error('Order not found');
        } catch (error) {
          return res.status(500).send(error.message);      
    }



    async deleteBasketDevice (req, res) {
        const {id} = req.params
        const basketDevice =  await BasketDevice.destroy(
        {
            where: {basketId:id} 
        }
        )
        if (basketDevice) {
            return res.status(206).send('Order updated successfully ');
          }throw new Error('Order not found');
        } catch (error) {
          return res.status(500).send(error.message);     
          
    }
    async getAllOrderDevice(req, res) {
      const {id} = req.params
      const basketDevice = await BasketDevice.findAll(
          {
              where : {orderId : id}
          }
      )
  
      return res.json(basketDevice)
  }
    
}

module.exports = new OrderController()