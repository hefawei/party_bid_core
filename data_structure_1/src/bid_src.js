function bid(name) {
    this.name = name;
    this.biddings = [];
}

bid.create_new_bid = function (activity_name) {
    var activities = JSON.parse(localStorage.activities);
    var bids = _.map(activities,function(num){
        if(num.name == activity_name){
            var counter = num.bids.length + 1;
            var name = '竞价' + counter;
            num.bids.unshift({'name':name,'biddings':[]})
        }
        return num;
    })
        localStorage.setItem('activities',JSON.stringify(bids));
}

get_bids_name = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var activity = _.find(activities, function (list) {
        return list.name == Activity.get_current_activity();
    })
    var bids_name = _.find(activity.sign_ups, function (num) {
        return num.phone == Message.save_phone(sms_json);
    })
    if (bids_name != undefined) {
        return bids_name.name;
    }
}

save_bid_to_activities = function (bid) {
    localStorage.setItem("activities", JSON.stringify(bid))
}