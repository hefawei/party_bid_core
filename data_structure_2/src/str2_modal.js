transform_bids_to_view_model = function(current_activity) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity = JSON.parse(localStorage.current_activity);
    return activities[current_activity].bids;
}

transform_biddings_to_view_model = function(current_activity, current_bid) {
    var activities = JSON.parse(localStorage.activities);
    var price = _.groupBy(activities[current_activity].biddings[current_bid], function (list) {
        return list.price
    })
    var price_array = []
    _.map(price, function (value, key) {
        price_array.push({"price": key, "number": value.length})
        return price_array
    })
    return get_biddings(price_array, current_activity, current_bid);
}


get_biddings = function(price_array, current_activity, current_bid) {
    var biddings = [];
    biddings.push({"name": get_sign_ups_name(price_array, current_activity, current_bid),
        "phone": get_bids_biddings(price_array, current_activity, current_bid),
        "price": get_bid_person_price(price_array, current_activity, current_bid)})
    return biddings;
}

get_sign_ups_name = function(price_array, current_activity, current_bid) {
    var activities = JSON.parse(localStorage.activities);
    var bid_person_name = _.find(activities[current_activity].sign_ups, function (bid) {
        return bid.phone == get_bids_biddings(price_array, current_activity, current_bid)
    })
    if (bid_person_name != undefined) {
        return bid_person_name.name
    }
}

get_bids_biddings = function(price_array, current_activity, current_bid) {
    var activities = JSON.parse(localStorage.activities);
    var bid = _.find(activities[current_activity].biddings[current_bid], function (num) {
        return num.price == get_bid_person_price(price_array)
    })
    return bid.phone;
}

get_bid_person_price = function(price_array, current_activity, current_bid) {
    var bid_person = _.find(price_array, function (list) {
        return list.number == 1
    })
    if (bid_person != undefined) {
        return bid_person.price
    }
}




