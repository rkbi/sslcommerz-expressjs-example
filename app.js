const express = require('express')
const bodyParser = require('body-parser')
var SSLCommerzPayment = require('sslcommerz')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = 3000

app.get('/', (req, res) => {

	let data = {
		store_id: 'testbox',
		store_passwd: 'qwerty',
		total_amount: 100,
		currency: 'BDT',
		tran_id: 'tran_no_111',
		success_url: 'http://localhost:3000/dump',
		fail_url: 'http://localhost:3000/dump',
		cancel_url: 'http://localhost:3000/dump',
		shipping_method: 'Courier',
		product_name: 'Computer.',
		product_category: 'Electronic',
		product_profile: 'general',
		cus_name: 'Customer Name',
		cus_email: 'cust@yahoo.com',
		cus_add1: 'Dhaka',
		cus_add2: 'Dhaka',
		cus_city: 'Dhaka',
		cus_state: 'Dhaka',
		cus_postcode: '1000',
		cus_country: 'Bangladesh',
		cus_phone: '01711111111',
		cus_fax: '01711111111',
		ship_name: 'Customer Name',
		ship_add1: 'Dhaka',
		ship_add2: 'Dhaka',
		ship_city: 'Dhaka',
		ship_state: 'Dhaka',
		ship_postcode: 1000,
		ship_country: 'Bangladesh',
	}

	new SSLCommerzPayment(data, false).then(function (apiResponse) {
		let GatewayPageURL = apiResponse.GatewayPageURL
		res.redirect(GatewayPageURL)
		console.log('Redirecting to: ', GatewayPageURL)
	}).catch(function (err) {
		console.err(err)
	})
})

app.post('/dump', (req, res) => {
	console.log('Got Response', req.body)
	res.send(req.body)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
