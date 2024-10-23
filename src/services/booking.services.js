const {booking} = require('../models')

const getAllServices = async() => {
     return await booking.findAll()
} 


const createServices = async(body) => {
    return  await booking.create(body)
} 


const getOneServices = async(id) => {
    return await booking.findByPk(id)
} 


const updateServices = async(body, id) => {
    return await booking.update(
        body,
        { where: {id}, returning: true }
    );
} 


const deleteServices = async(id) => {
    return await booking.destroy({ where: {id} })
} 

const getUserServices = async (email) => {
    return await booking.findOne({ where: { email } });
  }

module.exports = {
    getAllServices,
    createServices,
    getOneServices,
    updateServices,
    deleteServices,
    getUserServices
}