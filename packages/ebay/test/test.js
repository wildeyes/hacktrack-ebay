import assert from 'assert'
import {ebay} from '../index'

describe('ebay', function () {
// 	let server = null 

// 	before(function() {
// 		server = Server(port)
// 	})
 
// 	const tibbo = Tibbo({host, port}) 

	it('should retrieve items', function () {

		const res = ebay.getItemsByKey('yoyo')

		assert.equal(res.length, 100)
	})
// 	it('should set wake up time', function (done) {
// 		const hours = 23
// 		const minutes = 12

// 		tibbo
// 			.setTime(Cmds.setCurrentTime, {hours, minutes})
// 			.then(success => {
// 				assert.equal(true, success)

// 				const currentTime = Server.storage.time.current
// 				assert.equal(currentTime[0], hours)
// 				assert.equal(currentTime[1], minutes)
// 				done()
// 			})
// 	})
// 	it('should turn on automode', function (done) {
// 		const hours = 23
// 		const minutes = 12

// 		tibbo
// 			.send(Cmds.toggleAutoMode)
// 			.then(success => {
// 				assert.equal(true, success)
// 				assert.equal(true, Server.storage.automode)
// 				done()
// 			})
// 	})
 
// 	// TODO doesnt work
// 	after(function() {
// 		server.stop(_ => console.log('server stopped'))
// 	})
})

