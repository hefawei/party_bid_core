function Message(name, phone) {
    this.name = name;
    this.phone = phone;
}

Message.save_name = function (sms_json) {
    return  sms_json.messages[0].message.substring(2).replace(/^\s+|\s+$/g, '');
}

Message.save_phone = function (sms_json) {
    return sms_json.messages[0].phone;
}

Message.save_price = function (sms_json) {
    return sms_json.messages[0].message.substring(2);
}

notify_sms_received = function (sms_json) {
    if (Message.check_activity_BM_or_JJ(sms_json) == 'BM') {
        Message.judge_activity_start_or_end(sms_json);
    }
    if (Message.check_activity_BM_or_JJ(sms_json) == 'JJ') {
        Message.judge_bid_start_or_end(sms_json);
    }
}


Message.judge_activity_start_or_end = function (sms_json) {
    if (localStorage.is_signing_up == 'true') {
        Message.judge_is_signing_up_or_has_signed(sms_json);
    }

}

Message.judge_is_signing_up_or_has_signed = function (sms_json) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var current_activity = Activity.get_current_activity();
    if (Message.judge_sign_up_repeat(sms_json) == false) {
        sign_ups.push({'name': Message.save_name(sms_json), 'phone': Message.save_phone(sms_json),
            'activity_id': current_activity})
    }
    localStorage.setItem('sign_ups', JSON.stringify(sign_ups));
}

Message.judge_sign_up_repeat = function (sms_json) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var activity = _.find(sign_ups, function (num) {
        return num.activity_id == Activity.get_current_activity();
    })
    var sign_up_repeat = _.some(activity, function (value, key) {
        return key == 'phone' ? value == Message.save_phone(sms_json) : ''
    })
    return sign_up_repeat;
}


Message.judge_bid_start_or_end = function (sms_json) {
    if (localStorage.is_bidding == 'true') {
        Message.judge_bid_sign_up(sms_json);
    }
}

Message.judge_bid_sign_up = function (sms_json) {
    if (Message.judge_sign_up_repeat(sms_json) == true) {
        Message.judge_is_bidding_or_has_bid(sms_json);
    }
}

Message.judge_is_bidding_or_has_bid = function (sms_json) {
    var bids = JSON.parse(localStorage.bids);
    var bid = _.filter(bids, function (num) {
        return (num.activity_id == Activity.get_current_activity() && num.name == Activity.get_current_bid())
    })
    if (Message.check_bid_phone_repeat(sms_json) == false) {
        bid[0].biddings.push({'phone': Message.save_phone(sms_json), 'price': Message.save_price(sms_json)})
    }
    localStorage.setItem('bids', JSON.stringify(bid));
}


Message.check_bid_phone_repeat = function (sms_json) {
    var bids = JSON.parse(localStorage.bids);
    var current_bids = _.find(bids, function (num) {
        return (num.activity_id == Activity.get_current_activity() && num.name == Activity.get_current_bid())
    })
    var bid_repeat = _.some(current_bids.biddings, function (list) {
        return list.phone == Message.save_phone(sms_json)
    })
    return bid_repeat;
}


Message.check_activity_BM_or_JJ = function (sms_json) {
    var message_start = sms_json.messages[0].message.substring(0, 2).toUpperCase();
    var message_end = sms_json.messages[0].message.substring(2).replace(/^\s+|\s+$/g, '');
    var message_middle = isNaN(sms_json.messages[0].message.substring(2));
    if (message_start == "BM" && message_end) {
        return "BM";
    }
    if (message_start == "JJ" && message_end != '' && message_middle == false) {
        return "JJ";
    }
}