function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
}

Activity.prototype.create = function () {
    var activities = JSON.parse(localStorage.activities);
    activities.unshift(this);
    localStorage.activities = JSON.stringify(activities);
}

Activity.prototype.active = function () {
    localStorage.setItem('current_activity', this.name);
}

Activity.get_current_activity = function () {
    return localStorage.getItem('current_activity');
}

Activity.get_current_bid = function () {
    return localStorage.getItem('current_bid');
}

