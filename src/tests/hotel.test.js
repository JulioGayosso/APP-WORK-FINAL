const request = require('supertest')
require('../models')
const app = require('../app')


let userId
let TOKEN
let hotelId
let cityId

const BASE_URL = '/api/v1/hotels'



beforeAll(async () => {
    const user = await request(app)
      .post('/api/v1/users')
      .send({
        firstName: "Gabriel",
        lastName: "Martinez",
        email: "gabriel@gmail.com",
        password: "gabriel1234",
        gender: "male"
      })
    userId= user.body.id
  
    const credentials = {
      email: "gabriel@gmail.com",
      password: "gabriel1234"
    }
  
    const resToken = await request(app)
      .post('/api/v1/users/login')
      .send(credentials)
  
    TOKEN = resToken.body.token

    const city = {
        name:"villahermosa",
        country:"Mexico",
        countryId:'MX'
    }
   
    
    const res = await request(app)
        .post('/api/v1/cities')
        .send(city)
        .set('Authorization', `Bearer ${TOKEN}`)
        cityId = res.body.id

  })
  
  afterAll(async () => {
    await request(app)
      .delete(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
    await request(app)
      .delete(`/api/v1/cities/${cityId}`)
  })
  

  const hotel = {
    name:"Hotel La Venta Inn Villahermosa",
    description:"La Venta Inn goza de una ubicación céntrica en Villahermosa, justo enfrente de las exclusivas estatuas olmecas del Parque Museo La Venta y a 300 metros de la Torre Pirámide Pemex.",
    price:"996",
    address:"enfrente de las exclusivas estatuas olmecas del Parque Museo La Venta ",
    lat:40.748817,
    lon: 73.985428,
    rating: 4.5,
    cityId: cityId
}

test("POST -> 'BASE_URL', should return status code 201, and res.body.name === city.name", async () => {

    const res = await request(app)
      .post(BASE_URL)
      .send(hotel)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    hotelId = res.body.id
  
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(hotel.name)
  })

  test("Get -> 'BASE_URL', should return statusCode 200, and res.body.lentgth === 1", async () => {
    const res = await request(app)
      .get(BASE_URL)
     
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  })

  test("Get -> 'BASE_URL/:id', should return statusCode 200, and res.body.email === user.email", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/${hotelId}`)
      
  console.log(res.body)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(hotel.name)
  })

  test("PUT -> 'BASE_URL/:id', should return statusCode 200, and res.body.firstName === user.firstName", async () => {
    const res = await request(app)
      .put(`${BASE_URL}/${hotelId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ name: "fakeHotel" })

      console.log(hotelId)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe('fakeHotel')
  })

  test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${hotelId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.statusCode).toBe(204)
  })