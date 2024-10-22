const {hotel,city} = require('../models')

const getAllServices = async() => {
     return await hotel.findAll({include:[city]})
} 


const createServices = async(body) => {
    return  await hotel.create(body)
} 


const getOneServices = async(id) => {
    return await hotel.findByPk(id)
} 


const updateServices = async(body, id) => {
    return await hotel.update(
        body,
        { where: {id}, returning: true }
    );
} 


const deleteServices = async(id) => {
    return await hotel.destroy({ where: {id} })
} 

const getUserServices = async (email) => {
    return await hotel.findOne({ where: { email } });
  }

module.exports = {
    getAllServices,
    createServices,
    getOneServices,
    updateServices,
    deleteServices,
    getUserServices
}