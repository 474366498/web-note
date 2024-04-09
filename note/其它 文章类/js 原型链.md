

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

1. assign 复制
``` javascript 
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true

``` 

``` javascript 

const obj = {
  foo : 1 ,
  get bar () {
    return 2
  }
} ,
obj1 = {
  a : 10 ,
  log : ()=>{

  }
}
let copy = Object.assign({},obj,obj1) 
console.log(copy)
/*
Object { foo: 1, bar: Getter, a: 10, log: log() }
  a: 10
  bar: 
  foo: 1
  log: function log()
  length: 0
  name: "log"
  <prototype>: function ()
  <get bar()>: function bar()
  <prototype>: Object { … }
*/
// 这是一个将完整描述符复制的赋值函数
function completeAssign(target,...sources) {
  sources.forEach(source => {
    const descriptors = Object.keys(source).reduce((descriptors,key)=>{
      descriptors[key] = Object.getOwnPropertyDescriptor(source,key)
      return descriptors
    },{})

    Object.getOwnPropertySymbols(source).forEach(s=>{
      const descriptor = Object.getOwnPropertyDescriptor(source,s) 
      if(descriptor.enumerable) {
        descriptors[s] = descriptor
      }
    })
    Object.defineProperties(target,descriptors)
  })
  return target 
}

copy = completeAssign({},obj,obj1)
console.log(copy)

```


2. create 创建
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

``` javascript 

function Shape () {
  this.x = 0 
  this.y = 0 
}

Shape.prototype.move = function (x,y)  {
  this.x += x 
  this.y += y 
  console.info('shape moved')
}

function Rectangle () {
  Shape.call(this)
}

Rectangle.prototype = Object.create(Shape.prototype,{
  constructor : {
    value : Rectangle , 
    enumerable:false ,
    writable:true ,
    configurable:true
  }
})

const rect = new Rectangle() 
console.log("rect 是 Rectangle 类的实例吗？", rect instanceof Rectangle); // true
console.log("rect 是 Shape 类的实例吗？", rect instanceof Shape); // true
rect.move(1, 1); // 打印 'Shape moved.'

```



3. defineProperties 编辑或新建属性(多个)
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

``` javascript 
Object.defineProperties(obj, {
	a: {
		value: 1,
		writable: true,
		enumerable: true
	},
	b: {
		// value: true,
		enumerable: true,
		get  () {
			console.log('get obj.b')
			return this.value
		},
		set: function (v) {
			console.log('set obj.b', v)
			this.value = v
			return true
		}
	}
})
obj.b = false
console.log(1376, obj, obj.b)

```

4. defineProperty 编辑或新建属性(一个)
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

``` javascript  
// 默认
const o = {}; // 创建一个新对象

// 通过 defineProperty 使用数据描述符添加对象属性的示例
Object.defineProperty(o, "a", {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true,
});
// 'a' 属性存在于对象 o 中，其值为 37

// 通过 defineProperty 使用访问器属性描述符添加对象属性的示例
let bValue = 38;
Object.defineProperty(o, "b", {
  get() {
    return bValue;
  },
  set(newValue) {
    bValue = newValue;
  },
  enumerable: true,
  configurable: true,
});
o.b; // 38
// 'b' 属性存在于对象 o 中，其值为 38。
// o.b 的值现在始终与 bValue 相同，除非重新定义了 o.b。

// 数据描述符和访问器描述符不能混合使用
Object.defineProperty(o, "conflict", {
  value: 0x9f91102,
  get() {
    return 0xdeadbeef;
  },
});
// 抛出错误 TypeError: value appears only in data descriptors, get appears only in accessor descriptors

```

```javascript 
// enumerable 

const o = {};
Object.defineProperty(o, "a", {
  value: 1,
  enumerable: true,
});
Object.defineProperty(o, "b", {
  value: 2,
  enumerable: false,
});
Object.defineProperty(o, "c", {
  value: 3,
}); // enumerable 默认为 false
o.d = 4; // 通过赋值创建属性时 enumerable 默认为 true
Object.defineProperty(o, Symbol.for("e"), {
  value: 5,
  enumerable: true,
});
Object.defineProperty(o, Symbol.for("f"), {
  value: 6,
  enumerable: false,
});

for (const i in o) {
  console.log(i);
}
// 打印 'a' 和 'd'（总是按这个顺序）

Object.keys(o); // ['a', 'd']

o.propertyIsEnumerable("a"); // true
o.propertyIsEnumerable("b"); // false
o.propertyIsEnumerable("c"); // false
o.propertyIsEnumerable("d"); // true
o.propertyIsEnumerable(Symbol.for("e")); // true
o.propertyIsEnumerable(Symbol.for("f")); // false

const p = { ...o };
p.a; // 1
p.b; // undefined
p.c; // undefined
p.d; // 4
p[Symbol.for("e")]; // 5
p[Symbol.for("f")]; // undefined


```

``` javascript 
// configurable 
const o = {};
Object.defineProperty(o, "a", {
  get() {
    return 1;
  },
  configurable: false,
});

Object.defineProperty(o, "a", {
  configurable: true,
}); // 抛出 TypeError
Object.defineProperty(o, "a", {
  enumerable: true,
}); // 抛出 TypeError
Object.defineProperty(o, "a", {
  set() {},
}); // 抛出 TypeError（set 在之前未定义）
Object.defineProperty(o, "a", {
  get() {
    return 1;
  },
}); // 抛出 TypeError
// （即使新的 get 做的事情完全相同）
Object.defineProperty(o, "a", {
  value: 12,
}); // 抛出 TypeError
// ‘value’只有在 writable 为 true 时才可以被修改

console.log(o.a); // 1
delete o.a; // 无法删除；严格模式下会抛出错误
console.log(o.a); // 1

```

``` javascript 
//set get 
function Archiver() {
  let temperature = null;
  const archive = [];

  Object.defineProperty(this, "temperature", {
    get() {
      console.log("get!");
      return temperature;
    },
    set(value) {
      temperature = value;
      archive.push({ val: temperature });
    },
  });

  this.getArchive = () => archive;
}

const arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]


```

5. entries key value 键值对
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

``` javascript 
// entries 示例

const obj = { foo: "bar", baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

// 类数组对象
const obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

// 具有随机键排序的类数组对象
const anObj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

// getFoo 是一个不可枚举的属性
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
    },
  },
);
myObj.foo = "bar";
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]


``` 

6. freeze 冻结对象
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

``` javascript 
// 冻结对象
const obj = {
  prop() {},
  foo: "bar",
};

// 冻结前：可以添加新属性，也可以更改或删除现有属性
obj.foo = "baz";
obj.lumpy = "woof";
delete obj.prop;

// 冻结。
const o = Object.freeze(obj);

// 返回值和我们传入的对象相同。
o === obj; // true

// 对象已冻结。
Object.isFrozen(obj); // === true

// 现在任何更改都会失败。
obj.foo = "quux"; // 静默但什么都没做
// 静默且没有添加属性
obj.quaxxor = "the friendly duck";

// 严格模式下，这样的尝试会抛出 TypeError
function fail() {
  "use strict";
  obj.foo = "sparky"; // 抛出 TypeError
  delete obj.foo; // 抛出 TypeError
  delete obj.quaxxor; // 返回 true，因为属性‘quaxxor’从未被添加过。
  obj.sparky = "arf"; // 抛出 TypeError
}

fail();

// 尝试通过 Object.defineProperty 更改；
// 下面的两个语句都会抛出 TypeError。
Object.defineProperty(obj, "ohai", { value: 17 });
Object.defineProperty(obj, "foo", { value: "eit" });

// 同样无法更改原型
// 下面的两个语句都会抛出 TypeError。
Object.setPrototypeOf(obj, { x: 20 });
obj.__proto__ = { x: 20 };


```




7. fromEntries 键值对列表转为一个对象
``` javascript 
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42],
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// Expected output: Object { foo: "bar", baz: 42 }

```

``` javascript 
let o, d;

o = {
  get foo() {
    return 17;
  },
};
d = Object.getOwnPropertyDescriptor(o, "foo");
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   get: [Function: get foo],
//   set: undefined
// }

o = { bar: 42 };
d = Object.getOwnPropertyDescriptor(o, "bar");
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   value: 42,
//   writable: true
// }

o = { [Symbol.for("baz")]: 73 };
d = Object.getOwnPropertyDescriptor(o, Symbol.for("baz"));
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   value: 73,
//   writable: true
// }

o = {};
Object.defineProperty(o, "qux", {
  value: 8675309,
  writable: false,
  enumerable: false,
});
d = Object.getOwnPropertyDescriptor(o, "qux");
console.log(d);
// {
//   value: 8675309,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }


```




8. getOwnPropertyDescriptor 该对象描述给定对象上特定属性（即直接存在于对象上而不在对象的原型链中的属性）的配置。返回的对象是可变的，但对其进行更改不会影响原始属性的配置。
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




9. getOwnPropertyDescriptors 返回给定对象的所有自有属性

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

``` javascript 
let o, d
o = {
	get foo() {
		return 1
	},
	set foo(v) {
		this.foo = v
	},
	b: {
		get() {
			this.b = 12
			return
		},
		set(v) {
			this.b = v
		},
		enumerable: true
	}
}
d = Object.getOwnPropertyDescriptors(o)
/*
{
  foo: {
    get: [Function: get foo],
    set: [Function: set foo],
    enumerable: true,
    configurable: true
  },
  b: {
    value: { get: [Function: get], set: [Function: set], enumerable: true },
    writable: true,
    enumerable: true,
    configurable: true
  }
}
*/


```


10. getOwnPropertyNames 返回一个数组(包含给定对象中所有自有属性（包括不可枚举属性 但不包含使用symbol的属性）)
```javascript 
const object1 = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.getOwnPropertyNames(object1));
// Expected output: Array ["a", "b", "c"]

```
``` javascript 
const arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort());
// ["0", "1", "2", "length"]

// 类数组对象
const obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.getOwnPropertyNames(obj).sort());
// ["0", "1", "2"]

Object.getOwnPropertyNames(obj).forEach((val, idx, array) => {
  console.log(`${val} -> ${obj[val]}`);
});
// 0 -> a
// 1 -> b
// 2 -> c

// 不可枚举属性
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
      enumerable: false,
    },
  },
);
myObj.foo = 1;

console.log(Object.getOwnPropertyNames(myObj).sort()); // ["foo", "getFoo"]


```

``` javascript 
// 原型链上的属性不会被列出
function ParentClass() {}
ParentClass.prototype.inheritedMethod = function () {};

function ChildClass() {
  this.prop = 5;
  this.method = function () {};
}
ChildClass.prototype = new ParentClass();
ChildClass.prototype.prototypeMethod = function () {};

console.log(Object.getOwnPropertyNames(new ChildClass()));
// ["prop", "method"]


```


11. getOwnPropertySymbols 返回一个包含给定对象所有自有 Symbol 属性的数组
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
``` javascript
const obj = { a: 123 }
let a = Symbol('a'), b = Symbol.for('b')
obj[a] = 'localSymbol'
obj[b] = 'globalSymbol'

console.log(Object.getOwnPropertyNames(obj), Object.getOwnPropertySymbols(obj))
// [ 'a' ] [ Symbol(a), Symbol(b) ]

```


12. getPrototypeOf 返回指定对象的原型（即内部 [[Prototype]] 属性的值）
``` javascript 
const prototype1 = {};
const object1 = Object.create(prototype1);

console.log(Object.getPrototypeOf(object1) === prototype1);
// Expected output: true

```
13. groupBy  Object.groupBy() 静态方法根据提供的回调函数返回的字符串值对给定可迭代对象中的元素进行分组。返回的对象具有每个组的单独属性，其中包含组中的元素的数组
*** 有些浏览器不支持 groupBy *** 
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

``` javascript 
const inventory = [
	{ name: "芦笋", type: "蔬菜", quantity: 5 },
	{ name: "香蕉", type: "水果", quantity: 0 },
	{ name: "山羊", type: "肉", quantity: 23 },
	{ name: "樱桃", type: "水果", quantity: 5 },
	{ name: "鱼", type: "肉", quantity: 22 },
];
const result = Object.groupBy(inventory, (item) => {
	console.log(item)
	return item.quantity > 5 ? "ok" : "restock"
})

console.log(1308, result)
/* 结果是：
{
  restock: [
    { name: "芦笋", type: "蔬菜", quantity: 5 },
    { name: "香蕉", type: "水果", quantity: 0 },
    { name: "樱桃", type: "水果", quantity: 5 }
  ],
  ok: [
    { name: "山羊", type: "肉", quantity: 23 },
    { name: "鱼", type: "肉", quantity: 22 }
  ]
}
*/

```

14. hasOwn 指定的对象中直接定义了指定的属性，则返回 true；否则返回 false
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
15. prototype.hasOwnProperty hasOwnProperty() 方法返回一个布尔值，表示对象 __自有属性（而不是继承来的属性）__ 中是否具有指定的属性。
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
15. is 确定两个值是否为相同值。
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
``` javascript 
// 案例 1：评估结果和使用 === 相同
Object.is(25, 25); // true
Object.is("foo", "foo"); // true
Object.is("foo", "bar"); // false
Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(window, window); // true
Object.is([], []); // false
const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true

// 案例 2: 带符号的 0
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// 案例 3: NaN
Object.is(NaN, 0 / 0); // true
Object.is(NaN, Number.NaN); // true


```


16. isExtensible  Object.isExtensible() 静态方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
```javascript 
const object1 = {};

console.log(Object.isExtensible(object1));
// Expected output: true

Object.preventExtensions(object1);

console.log(Object.isExtensible(object1));
// Expected output: false


```

``` javascript 

// 新对象是可拓展的。
const empty = {};
Object.isExtensible(empty); // true

// 它们可以变为不可拓展的
Object.preventExtensions(empty);
Object.isExtensible(empty); // false

// 根据定义，密封对象是不可拓展的。
const sealed = Object.seal({});
Object.isExtensible(sealed); // false

// 根据定义，冻结对象同样也是不可拓展的。
const frozen = Object.freeze({});
Object.isExtensible(frozen); // false

```


17. isFrozen   Object.isFrozen() 静态方法判断一个对象是否被冻结。
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

``` javascript 
// 一个新对象是默认是可扩展的，所以它也是非冻结的。
Object.isFrozen({}); // false

// 一个不可扩展的空对象同时也是一个冻结对象。
const vacuouslyFrozen = Object.preventExtensions({});
Object.isFrozen(vacuouslyFrozen); // true

// 一个非空对象默认也是非冻结的。
const oneProp = { p: 42 };
Object.isFrozen(oneProp); // false

// 即使令对象不可扩展，它也不会被冻结，因为属性仍然是可配置的（而且可写的）。
Object.preventExtensions(oneProp);
Object.isFrozen(oneProp); // false

// 此时，如果删除了这个属性，则它会成为一个冻结对象。
delete oneProp.p;
Object.isFrozen(oneProp); // true

// 一个不可扩展的对象，拥有一个不可写但可配置的属性，则它仍然是非冻结的。
const nonWritable = { e: "plep" };
Object.preventExtensions(nonWritable);
Object.defineProperty(nonWritable, "e", {
  writable: false,
}); // 令其不可写
Object.isFrozen(nonWritable); // false

// 把这个属性改为不可配置，会让这个对象成为冻结对象。
Object.defineProperty(nonWritable, "e", {
  configurable: false,
}); // 令其不可配置
Object.isFrozen(nonWritable); // true

// 一个不可扩展的对象，拥有一个不可配置但可写的属性，则它也是非冻结的。
const nonConfigurable = { release: "the kraken!" };
Object.preventExtensions(nonConfigurable);
Object.defineProperty(nonConfigurable, "release", {
  configurable: false,
});
Object.isFrozen(nonConfigurable); // false

// 把这个属性改为不可写，会让这个对象成为冻结对象。
Object.defineProperty(nonConfigurable, "release", {
  writable: false,
});
Object.isFrozen(nonConfigurable); // true

// 一个不可扩展的对象，拥有一个访问器属性，则它仍然是非冻结的。
const accessor = {
  get food() {
    return "yum";
  },
};
Object.preventExtensions(accessor);
Object.isFrozen(accessor); // false

// 把这个属性改为不可配置，会让这个对象成为冻结对象。
Object.defineProperty(accessor, "food", {
  configurable: false,
});
Object.isFrozen(accessor); // true

// 使用 Object.freeze 是冻结一个对象最方便的方法。
const frozen = { 1: 81 };
Object.isFrozen(frozen); // false
Object.freeze(frozen);
Object.isFrozen(frozen); // true

// 根据定义，一个冻结对象是不可拓展的。
Object.isExtensible(frozen); // false

// 同样，根据定义，一个冻结对象也是密封对象。
Object.isSealed(frozen); // true

```


18. prototype.isPrototypeOf 用于检查一个对象是否存在于另一个对象的原型链中
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

``` javascript 
class Foo {}
class Bar extends Foo {}
class Baz extends Bar {}

const foo = new Foo();
const bar = new Bar();
const baz = new Baz();

// 原型链：
// foo: Foo --> Object
// bar: Bar --> Foo --> Object
// baz: Baz --> Bar --> Foo --> Object
console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Baz.prototype.isPrototypeOf(bar)); // false
console.log(Baz.prototype.isPrototypeOf(foo)); // false
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(foo)); // false
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(bar)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true


```



19. isSealed  判断一个对象是否被密封
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

``` javascript 
// 新建的对象默认不是密封的。
const empty = {};
Object.isSealed(empty); // false

// 如果你令一个空对象不可扩展，则它同时也会变成个密封对象。
Object.preventExtensions(empty);
Object.isSealed(empty); // true

// 但如果这个对象不是空对象，则它不会变成密封对象，因为密封对象的所有自身属性必须是不可配置的。
const hasProp = { fee: "fie foe fum" };
Object.preventExtensions(hasProp);
Object.isSealed(hasProp); // false

// 如果把这个属性变的不可配置，则这个属性也就成了密封对象。
Object.defineProperty(hasProp, "fee", {
  configurable: false,
});
Object.isSealed(hasProp); // true

// 密封一个对象最简单的方法当然是 Object.seal。
const sealed = {};
Object.seal(sealed);
Object.isSealed(sealed); // true

// 根据定义，密封对象是不可扩展的。
Object.isExtensible(sealed); // false

// 一个密封对象可能被冻结，但不一定。
Object.isFrozen(sealed); // true
//（所有属性也是不可写的）

const s2 = Object.seal({ p: 3 });
Object.isFrozen(s2); // false
//（'p' 仍然可写）

const s3 = Object.seal({
  get p() {
    return 0;
  },
});
Object.isFrozen(s3); // true
//（对于访问器属性，只有可配置性才有影响）


```

20. keys  返回一个由给定对象自身的可枚举的字符串键属性名组成的数组
```javascript
const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};

console.log(Object.keys(object1));
// Expected output: Array ["a", "b", "c"]
```

``` javascript 
// 简单数组
const arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // ['0', '1', '2']

// 类数组对象
const obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.keys(obj)); // ['0', '1', '2']

// 键的顺序随机的类数组对象
const anObj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.keys(anObj)); // ['2', '7', '100']

// getFoo 是一个不可枚举的属性
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
    },
  },
);
myObj.foo = 1;
console.log(Object.keys(myObj)); // ['foo']

```


21. preventExtensions  可以防止新属性被添加到对象中（即防止该对象被扩展）。它还可以防止对象的原型被重新指定。
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

``` javascript 
// Object.preventExtensions 将原对象变的不可扩展，并且返回原对象。
const obj = {};
const obj2 = Object.preventExtensions(obj);
obj === obj2; // true

// 字面量方式定义的对象默认是可扩展的。
const empty = {};
Object.isExtensible(empty); // true

// 可以将其改变为不可扩展的。
Object.preventExtensions(empty);
Object.isExtensible(empty); // false

// 使用 Object.defineProperty 方法为一个不可扩展的对象添加新属性会抛出异常。
const nonExtensible = { removable: true };
Object.preventExtensions(nonExtensible);
Object.defineProperty(nonExtensible, "new", {
  value: 8675309,
}); // 抛出 TypeError

// 在严格模式中，为一个不可扩展对象的新属性赋值会抛出 TypeError 异常。
function fail() {
  "use strict";
  // 抛出 TypeError
  nonExtensible.newProperty = "FAIL";
}
fail();



```


22. prototype.PropertyIsEnumerable  propertyIsEnumerable() 方法返回一个布尔值，表示指定的属性是否是对象的可枚举自有属性
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
``` javascript 
// 使用 propertyIsEnumerable()
const o = {};
const a = [];
o.prop = "是可枚举的";
a[0] = "是可枚举的";

o.propertyIsEnumerable("prop"); // true
a.propertyIsEnumerable(0); // true

```

``` javascript 
// 用户自定义对象和内置对象
const a = ["是可枚举的"];

a.propertyIsEnumerable(0); // true
a.propertyIsEnumerable("length"); // false

Math.propertyIsEnumerable("random"); // false
globalThis.propertyIsEnumerable("Math"); // false

```

``` javascript 
// 自有属性和继承属性
const o1 = {
  enumerableInherited: "是可枚举的",
};
Object.defineProperty(o1, "nonEnumerableInherited", {
  value: "是不可枚举的",
  enumerable: false,
});
const o2 = {
  // o1 是 o2 的原型
  __proto__: o1,
  enumerableOwn: "是可枚举的",
};
Object.defineProperty(o2, "nonEnumerableOwn", {
  value: "是不可枚举的",
  enumerable: false,
});

o2.propertyIsEnumerable("enumerableInherited"); // false
o2.propertyIsEnumerable("nonEnumerableInherited"); // false
o2.propertyIsEnumerable("enumerableOwn"); // true
o2.propertyIsEnumerable("nonEnumerableOwn"); // false


```

``` javascript 
// 测试 Symbol 属性
const sym = Symbol("可枚举的");
const sym2 = Symbol("不可枚举的");
const o = {
  [sym]: "是可枚举的",
};
Object.defineProperty(o, sym2, {
  value: "是不可枚举的",
  enumerable: false,
});

o.propertyIsEnumerable(sym); // true
o.propertyIsEnumerable(sym2); // false

```


23. seal   密封一个对象。密封一个对象会阻止其扩展并且使得现有属性不可配置。密封对象有一组固定的属性：不能添加新属性、不能删除现有属性或更改其可枚举性和可配置性、不能重新分配其原型。只要现有属性的值是可写的，它们仍然可以更改。seal() 返回传入的同一对象
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

``` javascript 
const obj = {
  prop() {},
  foo: "bar",
};

// 可以添加新属性，可以更改或删除现有属性。
obj.foo = "baz";
obj.lumpy = "woof";
delete obj.prop;

const o = Object.seal(obj);

o === obj; // true
Object.isSealed(obj); // true

// 更改密封对象的属性值仍然有效。
obj.foo = "quux";

// 但不能将数据属性转换成访问者属性，反之亦然。
Object.defineProperty(obj, "foo", {
  get() {
    return "g";
  },
}); // 抛出 TypeError

// 现在，除了属性值之外的任何更改都将失败。
obj.quaxxor = "the friendly duck";
// 静默不添加属性
delete obj.foo;
// 静默不添删除属性

// ...且严格模式下，这种尝试将会抛出 TypeError。
function fail() {
  "use strict";
  delete obj.foo; // 抛出一个 TypeError
  obj.sparky = "arf"; // 抛出一个 TypeError
}
fail();

// 尝试通过 Object.defineProperty 添加属性也会抛出错误。
Object.defineProperty(obj, "ohai", {
  value: 17,
}); // 抛出 TypeError
Object.defineProperty(obj, "foo", {
  value: "eit",
}); // 更改现有属性值


```

24. setPrototypeOf  Object.setPrototypeOf() 静态方法可以将一个指定对象的原型（即内部的 [[Prototype]] 属性）设置为另一个对象或者 null
```javascript
const obj = {};
const parent = { foo: 'bar' };

console.log(obj.foo);
// Expected output: undefined

Object.setPrototypeOf(obj, parent);

console.log(obj.foo);
// Expected output: "bar"
```
25. prototype.toLocaleString  toLocaleString() 方法返回一个表示对象的字符串。该方法旨在由派生对象重写，以达到其特定于语言环境的目的。
```javascript
 const date1 = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

console.log(date1.toLocaleString('ar-EG'));
// Expected output: "٢٠‏/١٢‏/٢٠١٢ ٤:٠٠:٠٠ ص"

const number1 = 123456.789;

console.log(number1.toLocaleString('de-DE'));
// Expected output: "123.456,789"
```
26. prototype.toString toString() 方法返回一个表示该对象的字符串。该方法旨在重写（自定义）派生类对象的类型转换的逻辑
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

27. prototype.valueOf  Object 实例的 valueOf() 方法将 this 值转换成对象。该方法旨在被派生对象重写，以实现自定义类型转换逻辑。
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
28. values  Object.values() 静态方法返回一个给定对象的自有可枚举字符串键属性值组成的数组
```javascript 
const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};

console.log(Object.values(object1));
// Expected output: Array ["somestring", 42, false]
```


