


 class Person{

    name: string;
    age: number;

    constructor(name: string, age:number){
        this.name = name;
        this.age = age;
    }

    greeting(): void {
        console.log(`Hello from ${this.name}`)
    }
 };

 let pI = new Person('THomy', 23);

 pI.greeting();

 // Interface test

 interface example{
    name: string,
    age: number
 };

 const p3: example = {
    name: 'test',
    age: 23
 }