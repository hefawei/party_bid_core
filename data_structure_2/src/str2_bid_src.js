function bidding(name){
    this.name = name;
}

bidding.create_new_bid = function(activity_name){
    var activities = JSON.parse(localStorage.activities);
    var counter = activities[activity_name].bids.length+1;
    var bid_name = '竞价'+counter;
    activities[activity_name].bids.unshift({'name':bid_name});
    activities[activity_name].biddings[bid_name] = [];
    localStorage.setItem('activities',JSON.stringify(activities));
}



get_bids_name = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity = Activity.get_current_activity()
    var bid_name = _.find(activities[current_activity].sign_ups, function (bid) {
        return bid.phone == Message.save_phone(sms_json)
    })
    if (bid_name != undefined) {
        return bid_name.name;
    }
}
