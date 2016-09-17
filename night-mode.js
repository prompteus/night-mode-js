function isNumberInOpenInterval(number, min, max) {
    return number >= min
        && number <= max;
}
var DayTime = (function () {
    function DayTime(hour, minute) {
        if (isNumberInOpenInterval(hour, 0, 23)
            && isNumberInOpenInterval(minute, 0, 59)) {
            this.hour = hour;
            this.minute = minute;
        }
        else {
            throw new RangeError("Incorrect time set: " + hour + ":" + minute);
        }
    }
    DayTime.hasValidStructure = function (text) {
        return /^\d{1,2}:\d{2}$/.test(text);
    };
    DayTime.fromString = function (time) {
        if (DayTime.hasValidStructure(time)) {
            var splitTime = time.split(":");
            return new DayTime(Number(splitTime[0]), Number(splitTime[1]));
        }
        else {
            throw new Error("Given value " + time + " didn't match expected format HH:mm");
        }
    };
    DayTime.prototype.isAfter = function (dayTime) {
        return (this.hour > dayTime.hour
            || (this.hour === dayTime.hour && this.minute > dayTime.minute));
    };
    return DayTime;
}());
var NightMode = (function () {
    function NightMode(options) {
        this.evening = (typeof options.evening !== 'undefined') ? DayTime.fromString(options.evening) : new DayTime(21, 0);
        this.morning = (typeof options.morning !== 'undefined') ? DayTime.fromString(options.morning) : new DayTime(6, 0);
        this.refreshIntervalInSeconds = (typeof options.refreshIntervalInSeconds !== 'undefined') ? options.refreshIntervalInSeconds : 20;
        this.nightClass = (typeof options.nightClass !== 'undefined') ? options.nightClass : 'night';
        this.shouldAutoswitch = (typeof options.shouldAutoswitch !== 'undefined') ? true : options.shouldAutoswitch;
    }
    return NightMode;
}());
//# sourceMappingURL=night-mode.js.map