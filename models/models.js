const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    ip: {type: DataTypes.STRING},
    FIO: {type: DataTypes.STRING},
    adress: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    pol: {type: DataTypes.STRING},
    code: {type: DataTypes.STRING},
    cod_auth: {type: DataTypes.STRING},
    data_rozd: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING,defaultValue: "Не подтверждён "},
})



const Promo = sequelize.define('promocode', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    identific:{type: DataTypes.STRING, allowNull: false},
    skidka: {type: DataTypes.INTEGER,defaultValue: 0 },
    present: {type: DataTypes.INTEGER,defaultValue: 0 },
    quantity:{type: DataTypes.INTEGER,defaultValue: 0 },
})


const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    final_price: {type: DataTypes.INTEGER,defaultValue: 0 },
    adress:{type: DataTypes.STRING,defaultValue: 'Выберете ваш адрес'},
    adress1:{type: DataTypes.STRING,defaultValue: 'Выберете адрес'},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
    quantity:{type: DataTypes.INTEGER,defaultValue: 1},
    final_price:{type: DataTypes.INTEGER},
    status:{type: DataTypes.INTEGER,defaultValue: 0},
    deviceId:{type: DataTypes.INTEGER},
    img:{type: DataTypes.STRING},
    fin_price:{type: DataTypes.INTEGER},
    description:{type: DataTypes.STRING},
})



const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    title:{type: DataTypes.STRING},
    img1:{type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER, allowNull: false},
    title_desk:{type: DataTypes.STRING},

    title_ingrid:{type: DataTypes.STRING},
    title_keeping:{type: DataTypes.STRING},
    srok_godn:{type: DataTypes.STRING},
    temp:{type: DataTypes.STRING},
    lumus:{type: DataTypes.STRING},
    vlaga:{type: DataTypes.STRING},

    description1:{type: DataTypes.STRING},
    description2:{type: DataTypes.STRING},
    description3:{type: DataTypes.STRING},
    description4:{type: DataTypes.STRING},
    description5:{type: DataTypes.STRING},
    description6:{type: DataTypes.STRING},

    description7:{type: DataTypes.STRING},
})

const Actia = sequelize.define('actia', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
    info: {type: DataTypes.STRING, allowNull: false},
    
})
const Skidka = sequelize.define('skidka', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
    info: {type: DataTypes.STRING, allowNull: false},
})


const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
})


const Deviceingrid = sequelize.define('device_ingrid', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img:{type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})
const Deviceimg = sequelize.define('device_img', {      
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img:{type: DataTypes.STRING, allowNull: false},
})




const Order = sequelize.define('order', {

    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 

    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    address_real:{type: DataTypes.STRING, allowNull: false},
    pocht_index:{type: DataTypes.STRING, allowNull: false},


    track_number: {type: DataTypes.STRING},
    data: {type: DataTypes.STRING}, 
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: "Заказ оплачен и ожидает подтверждения"},
    address:{type: DataTypes.STRING, allowNull: false},

    punkt:{type: DataTypes.STRING, allowNull: false},
    FIO:{type: DataTypes.STRING},
    
})

const OrderDevice = sequelize.define('order_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: {type: DataTypes.STRING}, 
    img: {type: DataTypes.STRING}, 
    price: {type: DataTypes.INTEGER}, 
    quantity: {type: DataTypes.INTEGER}, 
    orderId:{type: DataTypes.INTEGER}, 
})



User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Promo)
Promo.belongsTo(User)

User.hasMany(BasketDevice)
BasketDevice.belongsTo(User)

User.hasMany(Actia)
Actia.belongsTo(User)

User.hasMany(Skidka)
Skidka.belongsTo(User)

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)

Device.hasMany(Deviceingrid, {as: 'ingrid'});
Deviceingrid.belongsTo(Device)

Device.hasMany(Deviceimg, {as: 'img'});
Deviceimg.belongsTo(Device)





module.exports = {
    Actia,
    Skidka,
    OrderDevice,
    Promo,
    Order,
    User,
    Basket,
    BasketDevice,
    Device,
    DeviceInfo,
    Deviceingrid,
    Deviceimg,

}
