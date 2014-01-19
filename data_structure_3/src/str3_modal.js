function Bidding(name, phone) {
    this.name = name;
    this.phone = phone;
}


Bidding.render_biddings = function (current_activity, current_bid) {
    var bids = JSON.parse(localStorage.bids);
    var current = _.find(bids, function (num) {
        return (num.activity_id == current_activity && num.name == current_bid)
    })
    return Bidding.get_bid__price_statistic(current, current_activity, current_bid)
}

Bidding.get_bid__price_statistic = function (current, current_activity, current_bid) {
    var price = _.groupBy(current.biddings, function (list) {
        return list.price;
    })
    var price_array = [];
    _.map(price, function (value, key) {
        price_array.unshift({'price': key, 'number': value.length})
        localStorage.setItem('price_array', JSON.stringify(price_array));
        return JSON.parse(localStorage.getItem('price_array'));
    })
    return Bidding.get_biddings(Bidding.get_price_array(), current_activity, current_bid)


}

Bidding.get_price_array = function () {
    return JSON.parse(localStorage.getItem('price_array'));
}


Bidding.get_biddings = function (pricees, current_activity, current_bid) {
    var biddings = [];
    biddings.unshift({'name': Bidding.sign_up_bid_name(pricees, current_activity, current_bid),
        'phone': Bidding.get_bid_phone(pricees, current_activity, current_bid),
        'price': Bidding.get_bid_price(pricees, current_activity, current_bid)})
    return biddings;
}


Bidding.sign_up_bid_name = function (pricees, current_activity, current_bid) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var bid_person = _.find(sign_ups, function (num) {
        return num.phone == Bidding.get_bid_phone(pricees, current_activity, current_bid);
    })
    if (bid_person != undefined) {
        return bid_person.name;
    }
}


Bidding.get_bid_phone = function (pricees, current_activity, current_bid) {
    var bids = JSON.parse(localStorage.bids);
    var current_bids = _.find(bids, function (list) {
        return (list.activity_id == current_activity && list.name == current_bid)
    })
    var bid = _.find(current_bids.biddings, function (bidding) {
        return bidding.price == Bidding.get_bid_price(pricees);
    })
    return bid.phone;
}

Bidding.get_bid_price = function (pricees) {
    var bid_person = _.find(pricees, function (num) {
        return num.number == 1;
    })
    return bid_person.price;
}






