function isNumberInOpenInterval(number: number, min: number, max: number) {
    return number >= min
        && number <= max;
}

class DayTime {

    hour: number;
    minute: number;

    private static hasValidStructure(text: string): boolean {
        return /^\d{1,2}:\d{2}$/.test(text);
    }

    constructor(hour: number, minute: number) {
        if (isNumberInOpenInterval(hour, 0, 23)
            && isNumberInOpenInterval(minute, 0, 59)) {
            this.hour = hour;
            this.minute = minute;
        } else {
            throw new RangeError("Incorrect time set: " + hour + ":" + minute);
        }
    }

    static fromString(time: string): DayTime {
        if (DayTime.hasValidStructure(time)) {
            let splitTime = time.split(":");
            return new DayTime(Number(splitTime[0]), Number(splitTime[1]));
        } else {
            throw new Error("Given value " + time + " didn't match expected format HH:mm");
        }
    }

    isAfter(dayTime: DayTime): boolean {
        return (this.hour > dayTime.hour
        || (this.hour === dayTime.hour && this.minute > dayTime.minute));
    }

}

class NightMode {

    evening: DayTime;
    morning: DayTime;
    refreshIntervalInSeconds: number;
    nightClass: string;
    shouldAutoswitch: boolean;
    isOn: boolean;

    constructor(options) {
        this.evening = (typeof options.evening !== 'undefined') ? DayTime.fromString(options.evening) : new DayTime(21, 0);
        this.morning = (typeof options.morning !== 'undefined') ? DayTime.fromString(options.morning) : new DayTime(6, 0);
        this.refreshIntervalInSeconds = (typeof options.refreshIntervalInSeconds !== 'undefined') ? options.refreshIntervalInSeconds : 20;
        this.nightClass = (typeof options.nightClass !== 'undefined') ? options.nightClass : 'night';
        this.shouldAutoswitch = (typeof options.shouldAutoswitch !== 'undefined') ? true : options.shouldAutoswitch;
    }

}