transform_bids_to_view_model = function (current_activity) {
    var activities = JSON.parse(localStorage.activities);
    var activity = _.find(activities, function (num) {
        return num.name == current_activity;
    })
    if (activity != undefined) {
        return activity.bids;
    }
}

transform_biddings_to_view_model = function (current_activity, current_bid) {
    var activities = JSON.parse(localStorage.activities);
    var activity = _.find(activities, function (num) {
        return num.name == current_activity;
    })
    var bid = _.find(activity.bids, function (list) {
        return list.name == current_bid;
    })
    if (bid != undefined) {
        return get_bid_price(bid.biddings, current_activity, current_bid);
    }
    return;


}

get_bid_price = function (array, current_activity, current_bid) {
    var price_array = [];
    var price = _.groupBy(array, function (num) {
        return num.price;
    })
    _.map(price, function (value, key) {
        price_array.unshift({'price': key, 'number': value.length});
        save_price_array(price_array);
        return get_price_array();
    })
    return get_bid_person_information(get_price_array(), current_activity, current_bid);
}

save_price_array = function (price_array) {
    localStorage.setItem("price_array", JSON.stringify(price_array));
}

get_price_array = function () {
    return JSON.parse(localStorage.getItem('price_array'));
}

get_bid_person_information = function (price_array, current_activity, current_bid) {
    var bid_person = _.filter(price_array, function (num) {
        return num.number == 1;
    })
    var bid_biddings = get_bid_biddings(current_activity, current_bid);
    var bid_person_information = _.filter(bid_biddings, function (list) {
        return list.price == bid_person[0].price;
    })
    return bid_person_information;
}


get_bid_biddings = function (current_activity, current_bid) {
    var activities = JSON.parse(localStorage.activities);
    var activity = _.find(activities, function (num) {
        return num.name == current_activity;
    })
    var bid = _.find(activity.bids, function (list) {
        return list.name == current_bid;
    })
    if (bid != undefined) {
        return bid.biddings;
    }
}


