const express = require('express')
const bodyParser = require('body-parser')
var SSLCommerzPayment = require('sslcommerz-lts')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {

	let data = {
		total_amount: 100,
		currency: 'BDT',
		tran_id: 'tran_id_111',
		success_url: 'http://localhost:3000/dump',
		fail_url: 'http://localhost:3000/dump',
		cancel_url: 'http://localhost:3000/dump',
		ipn_url: 'http://your_public_server_address/ipn', // IPN does not work in local PC
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

	let sslcz = new SSLCommerzPayment('testbox', 'qwerty', false)
	sslcz.init(data).then(function (apiResponse) {
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

let port = 3000
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
