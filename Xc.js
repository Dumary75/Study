var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.greeting = function () {
        console.log("Hello from ".concat(this.name));
    };
    return Person;
}());
;
var pI = new Person('THomy', 23);
pI.greeting();
