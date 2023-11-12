const uuid = require('uuid')
const path = require('path');
const {Device,DeviceInfo,Deviceimg,Deviceingrid,DeviceSize,BasketDevice, Basket,User, SizeColor, Order, Glav_str, OrderDevice} = require('../models/models')
const ApiError = require('../error/ApiError');

class deviceController {
    async create(req, res, next) {
        try {
            let {name,quantity,title,price,deviceInfo,deviceimg,deviceingrid,keeping} = req.body
            const device = await Device.create({name,quantity,title,price,keeping});

    
            if (deviceInfo) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }


            if (deviceimg) {
                info = JSON.parse(deviceimg)
                info.forEach(i =>
                    Deviceimg.create({
                        img: i.img,
                        deviceId: device.id
                    })
                )
            }


            if (deviceingrid) {
                info = JSON.parse(deviceingrid)
                info.forEach(i =>
                    Deviceingrid.create({
                        name: i.name,
                        deviceId: device.id
                    })
                )
            }


            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }











    async getAll(req, res) {
        let devices; 
        devices = await Device.findAll()
        return res.json(devices)
    }









    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'},{model: Deviceingrid, as: 'ingrid'}, {model: Deviceimg, as: 'img'},],
                
            }
        )
        return res.json(device)
    }

    

    async getDeviceInfo(req, res) {
        const {id} = req.params
        const device = await DeviceSize.findAll(
            {
                where: {deviceId:id},
            },
        )
        return res.json(device)
    }


    async getOneDeviceInfo(req, res) {
        const {id} = req.params
        const device = await DeviceSize.findOne(
            {
                where: {deviceId:id},
            },
        )
        return res.json(device)
    }

    async getAll_(req, res) {
        const {id} = req.params
        const device = await Device.findAll(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'},{model: DeviceSize, as: 'size'}],
              
            },
        )
        return res.json(device)
    }
    
    async getAll1(req, res) {
        const device = await Device.findAll()
        return res.json(device)
    }


async updateOneBasket (req, res) {
    const {id} = req.params
    const basket =  await Basket.update(
    {
        final_price: req.body.final_price,
        
    },
    {
        where: {id} 
    }
    
    )

    if (basket) {
        return res.status(206).send('Basket updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}



async updateOne (req, res) {
    const {id} = req.params
    const device =  await Device.update(
    {
        name: req.body.name,
        quantity:req.body.quantity,
        price: req.body.price,

        typeId: req.body.typeId,


    },

    
    {
        where: {id} 
    }
    
    )

    if (device) {
        return res.status(206).send('Product updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}


async updateOneColor (req, res) {
    const {id} = req.params
    const device =  await SizeColor.update(
    {
        color: req.body.color,
        quantity:req.body.quantity,


    },

    
    {
        where: {id} 
    }
    
    )

    if (device) {
        return res.status(206).send('Product updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}

async getoneColor(req, res) {
      
    const {id} = req.params
    const colors = await SizeColor.findOne(
      
        {
            where: {id}
        }
    )
    return res.json(colors)
}


async updateQuantity (req, res) {
    const {id} = req.params
    const quantity =  req.body.quantity

    const device1 = await SizeColor.findOne(
        {
            where: {id},
        }
    )

    const quant = device1.quantity
    const device =  await SizeColor.update(
    {
        quantity: quant-quantity
    },

    
    {
        where: {id} 
    }
    
    )

    if (device) {
        return res.status(206).send('Product updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}


async createBasketDevice(req, res) {
        
    const {userId,deviceId,quantity,final_price,fin_price,status,img,name,description} = req.body
    const basketDevice = await BasketDevice.create({userId,deviceId,quantity,final_price,fin_price,img,name,status,description})

    return res.json(basketDevice)
}



async createGlavStr(req, res) {
        
    const {video,photo1,photo2,photo3,photo4,photo5,photo6} = req.body
    const basketDevice = await Glav_str.create({video,photo1,photo2,photo3,photo4,photo5,photo6})

    return res.json(basketDevice)
}



async putGlavStr (req, res) {
    const {id} = req.params

    const basket =  await Glav_str.update(
    {
        video: req.body.video,
        photo1:req.body.photo1,
        photo2:req.body.photo2,
        photo3:req.body.photo3,
        photo4:req.body.photo4,
        photo5:req.body.photo5,
        photo6:req.body.photo6,
    },
    {
        where :{ 
                id
               }
    }
    
    )

    if (basket) {
        return res.status(206).send('Basket updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}

async update_basket_ (req, res) {
    const {id} = req.params 

    const basket =  await Basket.update(
    {
        adress:req.body.adress,
        adress1:req.body.adress1,
    },
    {
        where :{id}
    }
    
    )

    if (basket) {
        return res.status(206).send('Basket updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}
async getGlavStr(req, res) {
    const {id} = req.params
    const basketDevice = await Glav_str.findOne(
        {
            where : {id}
        }
    )

    return res.json(basketDevice)
}


async deleteBasketDevice (req, res) {
    try {
      const { id } = req.params;
      const deletedProduct1 = await BasketDevice.destroy({
        where: { id: id },
      });

  
      if (deletedProduct1) {
        return res.status(204).send('Product deleted successfully ');
      }
  
      throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
async getAllBasketDevice(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findAll(
        {
            where : {userId : id}
        }
    )

    return res.json(basketDevice)
}


async getAllBasketDevice_order(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findAll(
        {
            where : {orderId : id}
        }
    )

    return res.json(basketDevice)
}

async getAllBasketDevice_(req, res) {
    const basketDevice = await BasketDevice.findAll()
    return res.json(basketDevice)
}

async getOneBasketDevice(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findOne(
        {
            where : {id:id},
            
        }
    )
    return res.json(basketDevice)
}

async getOneBasketDeviceID(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findOne(
        {
            where : {
                deviceId:id,
                status:1,
              
            }
        }
    )
    return res.json(basketDevice)
}

async getOneBasketDeviceID_2(req, res) {
    const {id} = req.params
    const userId = req.body.basketId
    const basketDevice = await BasketDevice.findOne(
        {
            where : {
                userId:userId ,
                deviceId:id,
            }
        }
    )
    return res.json(basketDevice)
}
async getOneBasketDeviceID_3(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findOne(
        {
            where : {   
                basketId:req.query.basketId ,
                deviceId:id,
                status:1,
                color:req.query.color,
                sizeId:req.query.sizeId
            }
        }
    )
    return res.json(basketDevice)
}


async updateOneBasketDevice (req, res) {
    const {id} = req.params
    const basket =  await BasketDevice.update(
    {
        quantity: req.body.quantity,
        final_price:req.body.final_price,
        fin_price:req.body.fin_price
    },
    {
        where :{ 
            userId: req.body.basketId1 ,
                  deviceId: id,
               }
    }
    
    )

    if (basket) {
        return res.status(206).send('Basket updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}

async getOneBasket(req, res) {
    const {id} = req.params
    const basket = await Basket.findOne(
        {
            where :{ userId: id }
        }   
    )
    
    return res.json(basket)
}



async deleteOneBasketDevice (req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await BasketDevice.destroy({
        where :{ colorId: id }    
      });
  
      if (deletedProduct) {
        return res.status(204).send('Product deleted successfully ');
      }
  
      throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };


 async delOne (req, res) {
    try {
      const { id } = req.params;
  
      const deletedProduct = await Device.destroy({
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
    
}

module.exports = new deviceController()