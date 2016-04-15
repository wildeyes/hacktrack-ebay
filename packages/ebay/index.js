import request from 'request'
import bluebird from 'bluebird'

const request = 

function getItems(result) {
	const items = result.findItemsByKeywords[0].searchResult[0].item

	return items.map(item => {
	  return {
	    name: item.title,
	    pictureURL: item.galleryURL,
	    price: item.sellingStatus.currentAmount,
	  }
	})
}

function getItemsByKey(key) {

}

export const ebay = {

}
