
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket,BasketDevice, Promo, love_item, Skidka} = require('../models/models')
const ApiError = require('../error/ApiError');
const nodemailer = require('nodemailer');
const e = require('express');


let transporter = nodemailer.createTransport({
     
  host: 'smtp.mail.ru',
  port:465,
  secure : true,
  auth: {
      user: 'the_same_baze@mail.ru',
      pass: 'CKeS7rA7DFD0ahsTFTdZ'
  }
});

const sendSMS = async(email,tema,kod) => {
  await transporter.sendMail({
    from: 'the_same_baze@mail.ru',
    to: email,
    subject : tema,
    text: "Ваш код подтверждения: " + kod,
  })
}

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}

const generateJwt_0 = (id,ip,date) => {
    return jwt.sign(
        {id,ip, date},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}
const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() 
            * (max - min + 1)) + min;
};
class userController {




    async registration_0(req, res, next) {
        const {ip} = req.body
        const user_0 = await User.create({ip})
        const basket = await Basket.create({userId: user_0.id})
        const token = generateJwt_0(user_0.id,user_0.ip, user_0.date)
        return res.json({token})
    }


    async auth_0(req, res, next) {
        const {id} = req.body

        const token = generateJwt_0(id,'none', 'none')
        const order =  await User.update(
            {
                status: 'подтверждён',
            },
            {
                where: {id} 
            }
            
            )
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
    async check1() {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwNTk4MjY2NDMwIiwiZW1haWwiOiJhbWlnb3NAZ21haWwucnUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY4OTQ4NTYzOCwiZXhwIjoxNjg5NTcyMDM4fQ.Zp4b-wwSHCauJ_vpv4YvjB9ElXfFUo9wNWKYlPxXyXc'
        const token1 = jwt.verify(token, process.env.SECRET_KEY)
        return (token1)
    }
        async check_admin(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }


    async create_promo(req, res) {
        const {quantity, skidka, identific } = req.body
        const user = await Promo.create(
            {
                quantity, skidka, identific
            }
        )
        return res.json(user)
    }

    async postMessage(req, res) {
        const {email,tema,kod} = req.body
        try{
            const sms = await sendSMS(email,tema,kod)
            return res.json(sms)
        }catch{
            return res.json(0)
        }
     
    }

    async get_promo(req, res) {
        const promo = await Promo.findAll()
        return res.json(promo)
    }

    async del_promo(req, res) {
        const {id} = req.params
        const promo = await Promo.destroy(
            {
                where:{id:id},
            },
        )
        return res.json(promo)
    }
    

    async getOne(req, res) {
        const {id} = req.params
        const user = await User.findOne(
            {
                where: {id},
            },
        )
        return res.json(user)
    }


    async getBasket(req, res) {
        const {id} = req.params
        const user = await Basket.findOne(
            {
                where: {id},
            },
        )
        return res.json(user)
    }

    async delOne (req, res) {
        try {
          const { id } = req.params;
          const deletedProduct1 = await Basket.destroy({
            where: { userId: id },
          });
          const deletedProduct = await User.destroy({
            where: { id: id },
          });
      
          if (deletedProduct,deletedProduct1) {
            return res.status(204).send('Product deleted successfully ');
          }
      
          throw new Error('Product not found');
        } catch (error) {
          return res.status(500).send(error.message);
        }
      };

      async createBasketDevice(req, res) {
        
        let {count} = req.body
        const basketDevice = await BasketDevice.create({count})

        return res.json(basketDevice)
    }
    async get_user(req, res) {
        const {id} = req.params
        const user = await User.findOne(
            {
              where:{id}
            }
        )
        return res.json(user)
    }
  
    async get_skidka(req, res) {
        const {userId} = req.body
        const user = await Skidka.findAll(
            {
              where:{userId:userId}
            }
        )
        return res.json(user)
    }

    async create_skidka(req, res) {
        const {description, info, userId } = req.body
        const user = await Skidka.create(
            {
                description, info, userId
            }
        )
        return res.json(user)
    }

    
    async update_user (req, res) {
        const {id} = req.params
        const order =  await User.update(
        {
  
            phone: req.body.phone,
            email: req.body.email,
            FIO: req.body.FIO,
            adress: req.body.adress,
            pol: req.body.pol,
            data_rozd: req.body.data_rozd,
        },
        {
            where: {id} 
        }
        
        )
        const basket =  await Basket.update(
            {
                adress: req.body.adress,
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
    async update_code (req, res) {
        const {id} = req.params
        const order =  await User.update(
        {
            code: req.body.code,
            FIO: req.body.FIO,
            email: req.body.email,
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
    async get_user_by_email(req, res) {
        const {email} = req.body
       try{
        const user = await User.findOne(
            {
              where:{email:email}
            }
        )
        return res.json(user)
       }catch{
        return res.json(0)
       } 
  
    }
    
    async update_code_auth (req, res) {
        const {id} = req.params
        const order =  await User.update(
        {
            cod_auth: req.body.cod_auth,
            email: req.body.email,
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
}

module.exports = new userController()