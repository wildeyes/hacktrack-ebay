if (Meteor.isClient) {

  Template.buygood.helpers({
    products: function () {
      return []; //buygood.find({}, { sort: { score: -1, name: 1 } });
    }
  });

  // Template.buygood.events({
  //   'click .inc': function () {
  //     buygood.update(Session.get("selectedPlayer"), {$inc: {score: 5}});
  //   }
  // });

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
  Meteor.startup(function () {

    // if (buygood.find().count() === 0) {
    //   var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
    //                "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];
    //   _.each(names, function (name) {
    //     buygood.insert({
    //       name: name,
    //       score: Math.floor(Random.fraction() * 10) * 5
    //     });
    //   });
    // }

  });
}
