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
//# sourceMappingURL=night-mode.js.map