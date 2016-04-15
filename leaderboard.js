process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';



function getItemsEbay(result) {
  const items = result.findItemsByKeywords[0].searchResult[0].item

  return items.map(item => {
    return {
      name: item.title,
      pictureURL: item.galleryURL,
    }
  })
}
function getItemsRapid(result) {
  const items = result

  return items.map(item => {
    return {
      name: item.title,
      pictureURL: item.galleryURL,
      price: item.sellingStatus.currentPrice
    }
  })
}

if (Meteor.isClient) {

  // function getAPIURL(keyword) {
  //   return `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=DanielKh-BuyGood-PRD-4e805b337-9ea4cc33&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${keyword}`
  // }

  Template.buygood.onCreated(function() {
    this.products = new ReactiveVar([])
  });

  Template.buygood.helpers({
    products:function() { return Template.instance().products.get() },
    adjustLength: str => { return str.slice(0,8) + '...';}
  });

  Template.buygood.events({
    // 'click .searchit': function (e, self) {
    //   e.preventDefault()
    //   const keyword = self.find('.searchbox').value
    //   Meteor.callPromise('products', keyword).then(error, result) => {
    //     self.products.set(products)
    //   })
    // }
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
  Meteor.methods({
    products: Meteor.wrapAsync((keyword, doneFn) => {
      const res = HTTP.post('https://gifted-beaver-k69b.rapidapi.io/ebay-find-items', {data:{keyword}})
      const products = getItemsRapid(res.data)

      doneFn(null, products)
    })
  })
}
