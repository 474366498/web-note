

![轻松理解JS 原型原型链](https://juejin.cn/post/6844903989088092174?searchId=202404081327135AEA671CBE894173787F)
![你不得不懂的 JS 原型和原型链 ](https://juejin.cn/post/6938590449674223624?searchId=202404081327135AEA671CBE894173787F)
![mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

![图片.awebp](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9afcd1172d340508d25c095b1103fac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)


 # 轻松理解JS 原型原型链 
    理解js中原型、原型链这个概念，绝对是帮助我们更深入学习js的必要一步，比如，如果js开发者想理解js继承，new关键字原理，甚至封装组件、优化代码，弄明白js中原型、原型链更是前提条件。本篇文章，用最简洁的文字，清楚明白讲解原型链相等关系和原型、原型链存在的意义，看完这篇文章，你会发现，原型、原型链原来如此简单！
    ![图片.awebp](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9afcd1172d340508d25c095b1103fac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 一 原型、原型链相关关系理解
  1. js分为函数对象和普通对象，每个对象都有__proto__属性，但是只有函数对象才有prototype属性
  2. Object Function 都是js内置的函数，类似的还有我们常用到的Array RegExp Date Boolean Number String
  3. 属性__proto__ 是一个对象，它有两个属性 constructor和__proto__ 
  4. 原型对象prototype有一个默认的constructor属性，用于记录实例是由哪个构造函数创建

``` javascript 
  function Person(name,age){
    this.name = name 
    this.age = age 
  }
  Person.prototype.motherland = 'China' 
  let person01 = new Person('小明',13)


  Person.prototype.constructor == Person // 准则1 原型对象（Person.prototype）的constructor指向构造函数本身
  person01.__proto__ == Person.prototype // 准则2 实例（person01）的__proto__和原型对象指向同一个地方

```

``` javascript 

  function Foo() 
  let f1 = new Foo() 
  let f2 = new Foo() 

  f1.__proto__ == Foo.prototype // 准则2
  f2.__proto__ === Foo.prototype // 准则2 
  Foo.prototype.__proto__ = Object.prototype // 准则2 Foo.prototype 本质也是普通对象
  Object.prototype.__proto__ == null // 原型链结束
  Foo.prototype.constructor = Foo // 准则1
  Foo.__proto__ = Function.prototype //准则2 
  Function.prototype.__proto__ = Object.prototype //准则2 Function.prototype本质也是普通对象
  Object.prototype.__proto__ = null // 原型链结束 


  function Object(){} 
  let o1 = new Object() 
  let o2 = new Object() 

  o1.__proto__ = Object.prototype // 准则2 
  o2.__proto__ = Object.prototype // 准则2 
  Object.prototype.__proto__ = null // 原型链结束
  Object.prototype.constructor = Object // 准则1 
  // 所有函数的__proto__ 都和Function.prototype指向同一个地方
  Object.__proto__ = Function.prototype //准则2(Object本质也是函数)

  Function.prototype.__proto__ = Object.prototype //准则2 Function.prototype本质也是普通对象
  Object.prototype.__proto__ = null // 原型链结束 


  function Function() 
  Function.__proto__ = Function.prototype //准则2
  Function.prototype.constructor = Function // 准则1

  ```
  由此可以得出结论 除了Object的原型对象(Object.prototype)的__proto__ 指向null , 其它内置函数对象的原型对象（例如 Array.prototype）和自定义构造函数的__proto__都指向Object.prototype 因为原型对象本身是普通对象 
  ``` javascript 
  Object.prototype.__proto__ = null 
  Array.prototype.__proto__ = Object.prototype 
  Foo.prototype.__proto__ = Object.prototype

```



# 你不得不懂的JS原型和原型链

## 一. 文本思维导图 
    ![思维导图.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc68a5ed9ff948e1a34f68cf1cbb75d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 二. 面向对象编程 OOP(Object Oriented Programming) 
  + 面向过程 *** 就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以 ***
  + 面向对象 *** 是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描述某个事物在整个解决问题的步骤中的行为 ***
  + 面向过程优点 ：性能比面向对象高，因为类调用时需要实例化，开销比较大，比较消耗资源； 比如单片机、嵌入式开发、Linux/Unix等一般采用 面向过程开发 性能是最重要的因素。 缺点：没有面向对象易维护、易复用、易扩展 
  + 面向对象优点 ：易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统更加灵活、更加易于维护 ； 缺点 ： 性能比面向过程低 

## 三. JS中一切都是对象 
  + 每一个数据类型底层的封装都是基于Object来创建的，引用类型Function() Array() Date() Math() String() Number() 等基本类型， nodeList节点集合 window等都是 
  + 基于构造函数 constructor 创建自定义类
    ``` javascript 
      // 字面量形式 
      function fn() {} 
      var obj = {} 

      // 构造函数模式 
      var f = new fn() 
      console.log(f) 

      var obj = new Object() 
      console.log(obj)

    ```
    > 使用 new 关键字就是利用构造函数创建一个实例，实例就是一个类，另一个就是字面量形式
  +  Object 是一个工厂方法能根据传入的类型，转换成相应的包装类型
  ``` javascript 
    var num = Object(12) 
    console.log(num instanceof Number) // true

    var str = Object('12')
    console.log(str instanceof String) // true 

    var b = Object(true)
    console.log(b instanceof Boolean) // true 

  ```
  + 基本类型值创建方式的区别 
  ``` javascript 
    var a = 12 
    console.log(typeof a) // number 
    a.toFixed(2) // '12.00' 

    var b = new Number(12) 
    console.log(typeof b) // object 
    b.toFixed(2)  // '12.00' 

    var c = new String('12') 
    console.log(typeof c) // object 

  ```
  __需要注意的是Symbol()不支持new语法，浏览器不认为Symbol是一个构造函数__
  
  ``` javascript 
    // 问：原始值为什么也可以使用属性或方法 a.toFixed ? 不是说原始值就是一个值没有属性嘛？因为使用 new 关键字创建出来的是一个实例，同时字面量形式创建出来的 a 也是一个实例，实例就有属性和方法。字面量形式的创建实际分为三个步骤，以上面代码为示例

    var a = 12 
    a.toFixed(2) 

    // 相当于
    /*
      * 1. 创建一个 Number 类型的实例
      *  var a = new Number(12)
      * 2. 调用实例上的方法或属性
      *  a.toFixed(2)
      * 3. 销毁实例 
    */
    a.myPro = '12' 
    console.log(a.myPro) // undefined 
    //需要注意的是原始值创建的实例，是只读的，所以不能向实例内添加任何属性或方法。如果添加了属性或方法那也是在当前行内创建一个临时的对象，当前行代码运行结束后这对象就已经被销毁了，例如上面的 a.myPro 是 undefined 《红宝书4 P114页》
  ``` 

## 四. 构造函数的运行机制  
  ``` javascript 
  function Person(name,age) {
    var a = 12 
    this.name = name 
    this.age = age 
  }
  var person = new Person('林一',14)
  console.log(person)

  ```
  1. new Person()这个过程中发生了什么
    + 同样开辟一个私有作用域栈内存，形参赋值和变量提升
    + *** JS代码执行之前，构造函数会在当前私有作用域内创建一个对象也就是开辟一个堆内存空间 但暂时不存储任何内容。浏览器会让函数中的主体this指向这个堆内存地址 ***
    + 代码自上而下执行
    + *** 最后代码执行结束后，浏览器会把创建的对象堆内存的对象默认返回，不需要写return 。返回的也就是一个实例 ***
  ![0.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/caba458271f041fabd67ac509c9b29a9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
  > 上面的 this 指向的就是 Person 这个对象，使用 this 的才会给实例创建属性，var a = 12 就不会给实例创建属性 console.log(person.a) ==> undefined，对比 ES6 中的 class。

  2. 在构造函数中强制return 返回值会怎么样
  ``` javascript 
  function Person (name,age) {
    var a = 12 
    this.name = name 
    this.age = age 
    return 'ss' 
  }
  var person = new Person('林一',12) 
  console.log(person)

  // 在构造函数中使用的 return 的意义会被剥夺，return '林一一' 的返回值还是一个实例 Person {name: "林一一", age: 18}，return {name: '林一一'} 的返回值就是 return {name: '林一一'}

  ```
  + 在构造函数中return 的返回值是原始值时，浏览器返回的还是实例
  + 强制返回一个创建对象时，返回的就是创建的对象。不符合我们想要得到一个类的实例。所以在构造函数中使用return 没有多大意义 


## 五. 原型和原型链
  *** JS中一切皆对象。基本类型，引用类型都是基于Object这个基类创建的。函数也是，prototype的值也是对象类型 ***
  + 原型Function.prototype是一个函数，但是普通函数具备的原型prototype是一个对象
  ``` javascript 
    typeof Function.prototype // 'function' 

    function fn(){} 
    typeof fn.prototype // 'object'

  ```  

  1. prototype 和 constructor和__proto__之间的关联 

    + 每一个函数类型都自带一个prototype的原型属性，原型是对象类型，浏览器会开辟一个堆内存空间
    + 浏览器会给这个堆内存空间中添加一个constructor的属性，属性值是构造函数本身。构造函数中并没有constructor属性，但是会从构造函数的prototype中查找，obj.constructor === obj.prototype.constructor 
    + 每一个对象都有一个__proto__的属性，这个属性指向所创建类的prototype,prototype也是对象同样也有__proto__这个属性。函数也是对象，所以函数也有__proto__这个属性。如果不能确定指定的类，那__proto__会指向Object 
    + object这个基类的本身也是一个函数，所以__proto__指向的是Function.prototype的原型，__proto__最终指向值是null 
    + 函数的__proto__指向的是Function.prototype和对象的__proto__不一样。Object.__proto_===Function.prototype =>true

    > but 过__proto__ 不是实例的属性，也不是构造函数的属性，在大多数的浏览器中都支持这种非正式的访问方式。实际上 __proto__来自 Object.prototype，当使用 obj.__proto__时，可以理解成返回了 Object.getPrototypeOf(obj)

    ![1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d05ecc2dd954e439683b361d4220849~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
    ``` javascript 
      // 一行代码解析上面的1，2句话
      String.prototype.constructor === String // true 

      function Fn(){}
      var fn = new Fn() 

      // 对应上面的第三句 
      fn.__proto__ === Fn.prototype // true 

      // 对应上面第四句
      fn.__proto__.__proto__.__proto__ === null // true 

    ```
  2. prototype 原型的作用
    + 每一个类都会把公共的属性和方法存储到原型上，给实例调用
    + 给所创建类的原型prototype添加属性和方法就是给实例添加共有方法
    ``` javascript 
      Object.prototype.myName ='林一'
      var obj = new Object() 
      console.log(obj.myName)

    ```

  3. 原型链机制的查找过程  
  *** 原型链就是基于 __proto__ 的向上查找机制。当实例操作某个属性或方法时会在当前自己的作用域中查找，找到了则查找结束。没有找到就基于所创建类的原型对象上的 __proto__  继续向上查找，直到找到基类的 Object.prototype 为止，如果还是没有找到则直接undefined ***

  ![查找.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfe0449e95cf4b9fa4237f17c04b5bed~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

  4. 
  ``` javascript 
      function Fn(){
          var a = 12
          this.getName = function(){
              console.log('private getName')
          }
      }

      Fn.prototype.getName = function (){
            console.log('public getName')
      }

      var fn = new Fn()
      var fn1 = new Fn()
      // 1，2
      console.log(fn.a)
      console.log(fn.getName())
      // 3，4，5
      console.log(fn.getName === fn1.getName)
      console.log(fn.__proto__.getName === fn1.__proto__.getName)
      console.log(fn.__proto__.getName === Fn.prototype.getName)
      //6，7
      console.log(fn.hasOwnProperty ===Object.prototype.hasOwnProperty)
      console.log(fn.constructor === Fn)
      /* 输出
      *   undefined
      *   private getName
      *   false
      *   true
      *   true
      *   true
      *   true
      */

     // 1中a 并没有使用 this 是不会写入构造函数内的，输出就是undefined，2中 fn.getName() 存在 fn 的私有作用域内输出就是 private getName
     // 3 fn 和 fn1引用堆内存地址不同为false，4中fn 和 fn1 这个实例上的 __proto__指向同一个原型 Fn.prototype 所以为 true。5、同理。
     // 6、fn 中不存在 hasOwnProperty，根据 __proto__向上一级原型Fn.prototype查找也没有，继续根据 __proto__ 向查找到 Object.prototype 找到了 hasOwnProperty，所以输出为true。7同理fn中没有constructor属性，但是会从fn.prototype中查找。

  ``` 
  5. constructor补充
  ``` javascript 
    function Fn(){

    }

    var fn = new Fn()
    console.log(fn.constructor === Fn.prototype.constructor)  // true
    console.log(fn.__proto__ === Fn.prototype)  // true
    console.log(fn.__proto__.constructor === Fn)    // true

  ```
  6. 
  ``` javascript 
      Number.prototype.constructor
      // Number() { [native code] }

      Number.constructor
      // Function() { [native code] }
  ``` 
  7. 





## 六. 构造函数的运行机制  
## 七. 构造函数的运行机制  

# object 方法 
![mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)

1. assign
``` javascript 
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true

``` 

2. create 
``` javascript 
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // Inherited properties can be overwritten

me.printIntroduction();
// Expected output: "My name is Matthew. Am I human? true"

``` 
3. defineProperties
``` javascript 
const object1 = {};

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: true,
  },
  property2: {},
});

console.log(object1.property1);
// Expected output: 42

```
4. defineProperty 
``` javascript 
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false,
});

object1.property1 = 77;
// Throws an error in strict mode

console.log(object1.property1);
// Expected output: 42

```
5. entries 
```javascript 
const object1 = {
  a: 'somestring',
  b: 42,
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// Expected output:
// "a: somestring"
// "b: 42"

```
6. freeze 
``` javascript 
const obj = {
  prop: 42,
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// Expected output: 42

```
7. fromEntries 
``` javascript 
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42],
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// Expected output: Object { foo: "bar", baz: 42 }

```
8. getOwnPropertyDescriptor
```javascript 
const object1 = {
  property1: 42,
};

const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(descriptor1.configurable);
// Expected output: true

console.log(descriptor1.value);
// Expected output: 42

```
9. getOwnPropertyDescriptors 
```javascript 
const object1 = {
  property1: 42,
};

const descriptors1 = Object.getOwnPropertyDescriptors(object1);

console.log(descriptors1.property1.writable);
// Expected output: true

console.log(descriptors1.property1.value);
// Expected output: 42

```

10. getOwnPropertyNames 
```javascript 
const object1 = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.getOwnPropertyNames(object1));
// Expected output: Array ["a", "b", "c"]

```
11. getOwnPropertySymbols
``` javascript 
const object1 = {};
const a = Symbol('a');
const b = Symbol.for('b');

object1[a] = 'localSymbol';
object1[b] = 'globalSymbol';

const objectSymbols = Object.getOwnPropertySymbols(object1);

console.log(objectSymbols.length);
// Expected output: 2

```
12. getPrototypeOf
``` javascript 
const prototype1 = {};
const object1 = Object.create(prototype1);

console.log(Object.getPrototypeOf(object1) === prototype1);
// Expected output: true

```
13. groupBy 
```javascript 
const inventory = [
  { name: "芦笋", type: "蔬菜", quantity: 5 },
  { name: "香蕉", type: "水果", quantity: 0 },
  { name: "山羊", type: "肉", quantity: 23 },
  { name: "樱桃", type: "水果", quantity: 5 },
  { name: "鱼", type: "肉", quantity: 22 },
];
const result = Object.groupBy(inventory, ({ type }) => type);

/* 结果是：
{
  蔬菜: [
    { name: "芦笋", type: "蔬菜", quantity: 5 },
  ],
  水果: [
    { name: "香蕉", type: "水果", quantity: 0 },
    { name: "樱桃", type: "水果", quantity: 5 }
  ],
  肉: [
    { name: "山羊", type: "肉", quantity: 23 },
    { name: "鱼", type: "肉", quantity: 22 }
  ]
}
*/

```

14. hasOwn 
```javascript 
const object1 = {
  prop: 'exists',
};

console.log(Object.hasOwn(object1, 'prop'));
// Expected output: true

console.log(Object.hasOwn(object1, 'toString'));
// Expected output: false

console.log(Object.hasOwn(object1, 'undeclaredPropertyValue'));
// Expected output: false
``` 
15. prototype.hasOwnProperty 
```javascript 

const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1'));
// Expected output: true

console.log(object1.hasOwnProperty('toString'));
// Expected output: false

console.log(object1.hasOwnProperty('hasOwnProperty'));
// Expected output: false
```
15. is 
```javascript 
console.log(Object.is('1', 1));
// Expected output: false

console.log(Object.is(NaN, NaN));
// Expected output: true

console.log(Object.is(-0, 0));
// Expected output: false

const obj = {};
console.log(Object.is(obj, {}));
// Expected output: false
```
16. isExtensible
```javascript 
const object1 = {};

console.log(Object.isExtensible(object1));
// Expected output: true

Object.preventExtensions(object1);

console.log(Object.isExtensible(object1));
// Expected output: false


```
17. isFrozen
```javascript 
const object1 = {
  property1: 42,
};

console.log(Object.isFrozen(object1));
// Expected output: false

Object.freeze(object1);

console.log(Object.isFrozen(object1));
// Expected output: true

``` 
18. prototype.isPrototypeOf
```javascript 
function Foo() {}
function Bar() {}

Bar.prototype = Object.create(Foo.prototype);

const bar = new Bar();

console.log(Foo.prototype.isPrototypeOf(bar));
// Expected output: true
console.log(Bar.prototype.isPrototypeOf(bar));
// Expected output: true
```
19. isSealed
```javascript
const object1 = {
  property1: 42,
};

console.log(Object.isSealed(object1));
// Expected output: false

Object.seal(object1);

console.log(Object.isSealed(object1));
// Expected output: true
``` 
20. keys
```javascript
const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};

console.log(Object.keys(object1));
// Expected output: Array ["a", "b", "c"]
```
21. preventExtensions
```javascript 
const object1 = {};

Object.preventExtensions(object1);

try {
  Object.defineProperty(object1, 'property1', {
    value: 42,
  });
} catch (e) {
  console.log(e);
  // Expected output: TypeError: Cannot define property property1, object is not extensible
}

```
22. prototype.PropertyIsEnumerable
```javascript 
const object1 = {};
const array1 = [];
object1.property1 = 42;
array1[0] = 42;

console.log(object1.propertyIsEnumerable('property1'));
// Expected output: true

console.log(array1.propertyIsEnumerable(0));
// Expected output: true

console.log(array1.propertyIsEnumerable('length'));
// Expected output: false
```
23. seal
```javascript 
const object1 = {
  property1: 42,
};

Object.seal(object1);
object1.property1 = 33;
console.log(object1.property1);
// Expected output: 33

delete object1.property1; // Cannot delete when sealed
console.log(object1.property1);
// Expected output: 33
```
24. setPrototypeOf 
```javascript
const obj = {};
const parent = { foo: 'bar' };

console.log(obj.foo);
// Expected output: undefined

Object.setPrototypeOf(obj, parent);

console.log(obj.foo);
// Expected output: "bar"
```
25. prototype.toLocaleString 
```javascript
 const date1 = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

console.log(date1.toLocaleString('ar-EG'));
// Expected output: "٢٠‏/١٢‏/٢٠١٢ ٤:٠٠:٠٠ ص"

const number1 = 123456.789;

console.log(number1.toLocaleString('de-DE'));
// Expected output: "123.456,789"
```
26. prototype.toString
```javascript
function Dog(name) {
  this.name = name;
}

const dog1 = new Dog('Gabby');

Dog.prototype.toString = function dogToString() {
  return `${this.name}`;
};

console.log(dog1.toString());
// Expected output: "Gabby"
```

27. prototype.valueOf
```javascript
function MyNumberType(n) {
  this.number = n;
}

MyNumberType.prototype.valueOf = function () {
  return this.number;
};

const object1 = new MyNumberType(4);

console.log(object1 + 3);
// Expected output: 7
```
28. values
```javascript 
const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};

console.log(Object.values(object1));
// Expected output: Array ["somestring", 42, false]
```


