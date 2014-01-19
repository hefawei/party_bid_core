function Bid(name, current_bid) {
    this.name = name;
    this.activity_id = current_bid;
    this.biddings = [];
}


Bid.create_new_bid = function (current_activity) {
    var bids = JSON.parse(localStorage.bids);
    var name = get_bids_name(current_activity);
    bids.push({'name': name, 'activity_id': current_activity, 'biddings': []});
    localStorage.setItem('bids', JSON.stringify(bids));

}

get_bids_name = function (current_activity) {
    var bids = JSON.parse(localStorage.bids);
    var bid = _.filter(bids, function (num) {
        return num.activity_id == current_activity;
    })
    var counter = bid.length + 1;
    return '竞价' + counter;
}

Bid.render_bids = function (current_activity) {
    var bids = JSON.parse(localStorage.bids);
    var bid = _.filter(bids, function (num) {
        return num.activity_id == current_activity;
    })
    return bid;

}