describe("DayTime factory static function fromString", function() {

    it("should create new object for valid time", function() {
        expect(function(){DayTime.fromString("21:30")}).not.toThrow();
        expect(function(){DayTime.fromString("00:00")}).not.toThrow();
        expect(function(){DayTime.fromString("23:59")}).not.toThrow();
    });

    it("should throw Error if the time has invalid structure", function() {
        expect(function(){DayTime.fromString("Aa:30")}).toThrow(jasmine.any(Error));
        expect(function(){DayTime.fromString("1546")}).toThrow(jasmine.any(Error));
        expect(function(){DayTime.fromString("112:54")}).toThrow(jasmine.any(Error));
    });

    it("should throw RangeError if the hour is over 23", function() {
        expect(function(){DayTime.fromString("24:30")}).toThrow(jasmine.any(RangeError));
        expect(function(){DayTime.fromString("46:00")}).toThrow(jasmine.any(RangeError));
    });

    it("should throw RangeError if the minute is over 59", function() {
        expect(function(){DayTime.fromString("20:60")}).toThrow(jasmine.any(RangeError));
        expect(function(){DayTime.fromString("05:84")}).toThrow(jasmine.any(RangeError));
    });

});

describe("DayTime isAfter function", function() {

    it("should return true if the given argument is after", function() {
        expect(DayTime.fromString("20:30").isAfter(DayTime.fromString("20:00"))).toBe(true);
    });

    it("should return false if the given argument is before", function() {
        expect(DayTime.fromString("15:00").isAfter(DayTime.fromString("20:00"))).toBe(false);
    });

    it("should return false if the given argument is the same time", function() {
        expect(DayTime.fromString("20:30").isAfter(DayTime.fromString("20:30"))).toBe(false);
    });

});

describe("isNumberInOpenInterval", function() {

    it("should return true if the given argument is inside the interval", function() {
        expect(isNumberInOpenInterval(10, 0, 20)).toBe(true);
    });

    it("should return true if the given argument is the same as one of the interval endpoints", function() {
        expect(isNumberInOpenInterval(0, 0, 20)).toBe(true);
        expect(isNumberInOpenInterval(20, 0, 20)).toBe(true);
    });

    it("should return false if the given argument is outside the interval", function() {
        expect(isNumberInOpenInterval(-10, 0, 20)).toBe(false);
    });

});

describe("NightMode isNight function", function() {

    var nightMode;

    beforeEach(function() {
        nightMode = new NightMode({
            evening: new DayTime(22, 0),
            morning: new DayTime(6, 30),
            autoSwitch: false
        });
    });

    it("should return true if current time is after the evening", function() {
        DayTime.fromCurrentTime = function() {
            return new DayTime(23,30);
        };
        expect(nightMode.isNight()).toBe(true);
    });

    it("should return false if current time is before the morning", function() {
        DayTime.fromCurrentTime = function() {
            return new DayTime(6,20);
        };
        expect(nightMode.isNight()).toBe(true);
    });

    it("should return false if current time is between the morning and the evening", function() {
        DayTime.fromCurrentTime = function() {
            return new DayTime(15,20);
        };
        expect(nightMode.isNight()).toBe(false);
    });

});