const {city,hotel } = require('../models')


const getAllServices = async() => {
     return await city.findAll({include:[hotel]})
} 


const createServices = async(body) => {
    return  await city.create(body)
} 


const getOneServices = async(id) => {
    return await city.findByPk(id,{include:[hotel]})
} 


const updateServices = async(body, id) => {
    return await city.update(
        body,
        { where: {id}, returning: true }
    );
} 


const deleteServices = async(id) => {
    return await city.destroy({ where: {id} })
} 

const getUserServices = async (email) => {
    return await city.findOne({ where: { email } });
  }

module.exports = {
    getAllServices,
    createServices,
    getOneServices,
    updateServices,
    deleteServices,
    getUserServices
}