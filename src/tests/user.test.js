//!1 post    🏥
//!2 login   🏥
//!3 getAll  🔒
//!4 getOne  🔒
//!5 logged  🔒
//!6 put     🔒
//!7 delete  🔒

const app = require('../app')
const request = require('supertest')

let token
let userId

const BASE_URL = '/api/v1/users'

const user = {
  firstName: "Julio",
  lastName: "Herrera",
  email: "julio@yahoo.com.ar",
  password: "julio1234",
  gender: "male"
}

// console.log(user);

test("POST -> 'BASE_URL', should responde status code 201, and res.body.email === user.email", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(user)

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.id).toBeDefined()
  expect(res.body.email).toBe(user.email)
})



test("POST -> 'BASE_URL/login', should return statusCode 200,  res.body.user and res.body.token to be defined", async () => {

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send({
      email: "julio@yahoo.com.ar",
      password: "julio1234",
    })


  token = res.body.token
  // console.log(token);
  

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.user).toBeDefined()
  expect(res.body.token).toBeDefined()

  expect(res.body.user.email).toBe(user.email)

})

test("POST -> 'BASE_URL/login', should return statusCode 401", async () => {

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send({
      email: "email@false.com",
      password: "julio1234",
    })

   console.log(res.body.error)

  expect(res.status).toBe(401)
  expect(res.body).toBeDefined()
  expect(res.body.error).toBe('Invalid credentials')
})

test("Get -> 'BASE_URL', should return statusCode 200, and res.body.lentgth === 1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${token}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("Get -> 'BASE_URL', should return statusCode 200, and res.body.email === user.email", async () => {
  const res = await request(app)
    .get(`BASE_URL/${userId}` )
    .set('Authorization', `Bearer ${token}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(user.email)
})