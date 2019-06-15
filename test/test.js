// 'use strict'

// const request = require('request-promise')
// const errors = require('request-promise/errors')
// const chai = require('chai')
// const expect = chai.expect

// describe('applicant-backend-test', () => {
//   const url = 'http://localhost:3000'
//   const email = 'jane.doe@axis.com'
//   const password = 'test'
//   let token = ''

//   it('should be able to connect to the server', () => {
//     return request(url)
//       .catch(errors.StatusCodeError, (err) => {})
//   })

//   it('should be able to login', () => {
//     return request({
//       method: 'POST',
//       uri: url + '/login',
//       body: { email: email, password: password },
//       headers: {
//         'ContentType': 'application/json'
//       },
//       json: true
//     }).then((res) => {
//       expect(res).to.be.an('object')
//       expect(res.email).to.equal(email)
//       expect(res.token.length).to.be.at.least(1)
//       token = res.token
//     })
//   })

//   it('should be able to fetch a list of devices', () => {
//     return request({
//       uri: url + '/devices',
//       headers: { 'Authorization': 'Bearer ' + token },
//       json: true
//     }).then((res) => { 
//       expect(res.length).to.equal(3)

//       res.forEach((device) => {
//         expect(device).to.have.property('id')
//         expect(device).to.have.property('type')
//         expect(device).to.have.property('model')
//         expect(device).to.have.property('firmware')
//         expect(device).to.have.property('site')

//         expect(device.type).to.equal('device')
//         expect(device.id).to.be.a('string')
//         expect(device.model).to.be.a('string')
//         expect(device.firmware).to.be.a('string')
//         expect(device.site).to.equal('Axis Lund')
//       })
//     })
//   })

// })
