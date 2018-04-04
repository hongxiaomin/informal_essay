// var Cat = {
//     name:'',
//     color:'',
//     eat:function(){}
// };
// function eat(){
//     console.log("i'm eat fish");
// }
// var cat1={name:'kitty',color:'white',eat:eat};
// var cat2 = {name:'Smokey',color:'black',eat:eat};
//
// function Cat(name,color){
//     this.name=name;
//     this.color=color;
//     this.eat=function(){
//         console.log('eat fish');
//     }
// }
// var cat1 = new Cat('Kitty','white');
// var cat2 = new Cat('Smokey','black');

// function Cat(name,color){
//     this.name=name;
//     this.color=color;
// }
// Cat.prototype.type='mammal';
// Cat.prototype.eat=function(){
//     console.log('eat fish');
// };
// var cat1 = new Cat('Kitty','white');
// var cat2 = new Cat('Smokey','black');
// console.log(cat1.eat===cat2.eat);//true
// console.log(cat1.constructor===Cat);//true
// console.log(cat1.type);//mammal

function Animal(){
    this.species = 'animal';
    this.sleep=function(){
        console.log("i'm sleep at night");
    }
}
// function Cat(name,color){
//     this.name=name;
//     this.colro=color;
// }
// //让Cat继承Animal的特性
// function Cat(name,color){
//     Animal.apply(this);
//     this.name=name;
//     this.color=color;
// }
// var cat1 = new Cat('Kitty','white');
// cat1.sleep();//i'm sleep at night

function Cat(name,color){
    this.name=name;
    this.color=color;
}
// Cat.prototype=new Animal();
// Cat.prototype.eat=function(){
//     console.log('fish is my delicious');
// };
// //他相当于完全删除了prototype对象原先的值，然后赋予一个新值
// //任何一个prototype对象都有一个constructor属性，指向它的构造函数
// Cat.prototype.constructor=Cat;
// var cat = new Cat('Kitty','white');
// cat.eat();//fish is my delicious
// cat.sleep();//i'm sleep at night
// console.log(cat instanceof Cat);//true
// console.log(cat instanceof Animal);//true
// //需要创建父类实例来实现prototype继承

var F = function(){};
F.prototype=Animal.prototype;
Cat.prototype=new F();
Cat.prototype.constructor=Cat;
// 我们将上面的方法，封装成一个函数，便于使用。
function extend(ctor, superctor, px) {
    if (!superctor || !ctor) throw Error('extend failed, verify dependencies');
    var F = function() {};
    F.prototype = superctor.prototype;
    ctor.prototype = new F();
    ctor.prototype.constructor = ctor;
    ctor.superclass = superctor.prototype; // cache super class proto reference.
    if (px) { // extend class implements
        for (var k in px) {
            if (px.hasOwnProperty(k)) ctor.prototype[k] = px[k];
        }
    }
    return ctor;
}
extend(Cat, Animal, {
    eat: function() {
        Cat.superclass.eat.call(this); // call super method
        console.log('Also i like some ofther food, such as beef and more.');
    }
});

var cat = new Cat('Smokey', 'black');
// cat.sleep();
cat.eat();
console.log(cat instanceof Animal);
console.log(cat instanceof Cat);