process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// function getItemsRapid(result) {
//   const items = result

//   return items.map(item => {
//     return {
//       name: item.title,
//       pictureURL: item.galleryURL,
//       price: item.sellingStatus.currentPrice
//     }
//   })
// }

if (Meteor.isClient) {

  Template.buygood.onCreated(function() {
    this.products = new ReactiveVar([])

    // this.autorun(t => {
    //   if(t.firstRun)
    //     this.products.set(Session.get('products'))
    //   if( ! Session.equals('products', this.products.get()))
    //     Session.set('products', this.products.get())
    // })
  });

  Template.buygood.helpers({
    products: _ => Template.instance().products.get(),
    adjustLength: str => str.slice(0,8) + '...',
    price:item => item.sellingStatus[0].currentPrice[0]['__value__'],
    currency:item => item.sellingStatus[0].currentPrice[0]['@currencyId']
  });

  Template.buygood.events({
    'click .searchit': function (e, self) {
      e.preventDefault()

      const keyword = self.find('.searchbox').value
      Meteor.callPromise('products', keyword).then(products => {
        self.products.set(products)
      })
    }
  });

  // Template.player.helpers({
  //   selected: function () {
  //     return Session.equals("selectedPlayer", this._id) ? "selected" : '';
  //   }
  // });

  // Template.player.events({
  //   'click': function () {
  //     Session.set("selectedPlayer", this._id);
  //   }
  // });
}
  
// On server startup, create some buygood if the database is empty.
if (Meteor.isServer) {

  function extractPrice(item) {
    const val = item.sellingStatus[0].currentPrice[0]
    return {
      price: val['__value__'],
      currency: val['@currencyId'],
    }
  }

  function getItemsEbay(result) {
    // const items = result.findItemsByKeywords[0].searchResult[0].item
    return result.findItemsByKeywordsResponse[0].searchResult[0].item
  }

  function Item(item) {
    return Object.assign({
        name: item.title[0],
        pictureURL: item.galleryURL[0],
      }, extractPrice(item))
  }

  function lowestPriceURL(keyword, minPrice) {
    return (`http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=DanielKh-BuyGood-PRD-4e805b337-9ea4cc33&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${keyword}&itemFilter.name=MinPrice&itemFilter.value=${minPrice}&sortOrder=PricePlusShippingLowest`) //&paginationInput.entriesPerPage=1000&paginationInput.pageNumber=1
  }
  function reasonablePriceURL(keyword) {
    return `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=DanielKh-BuyGood-PRD-4e805b337-9ea4cc33&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${keyword}`
  }

  function APICall(url) {
    const res = HTTP.get(url)
    return JSON.parse(res.content)
  }

  function getReasonablePrice(keyword) {
    const data = APICall(reasonablePriceURL(keyword))
    const items = getItemsEbay(data)

    return Item(items[0]).price * 0.25
  }

  function getLowestPriceItems(keyword) {
    // const res = HTTP.post('https://gifted-beaver-k69b.rapidapi.io/ebay-find-items', {data:{keyword}})
    const reasonablePrice = getReasonablePrice(keyword)
    const data = APICall(lowestPriceURL(keyword, reasonablePrice))
    // console.log(JSON.stringify(data.findItemsByKeywordsResponse[0].errorMessage))
    // return console.log(res)
    return getItemsEbay(data)
  }

  Meteor.methods({
    // products: Meteor.wrapAsync((keyword, doneFn) => {
    //   // const res = HTTP.post('https://gifted-beaver-k69b.rapidapi.io/ebay-find-items', {data:{keyword}})
    //   const res = HTTP.get(getAPIURL(keyword))
    //   const products = getItemsRapid(res.data)

    //   doneFn(null, products)
    // }),
    products: keyword => getLowestPriceItems(keyword)
  })
}
