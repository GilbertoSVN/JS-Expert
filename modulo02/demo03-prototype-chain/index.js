const assert = require('assert');

const obj = {};
const arr = [];
const fn = () => {};

//internamente, objetos literais viram funções explicitas
assert.deepStrictEqual(new Object().__proto__, obj.__proto__);

//__proto__ é a referência do objeto que possui as propriedades dele
assert.deepStrictEqual(obj.__proto__, Object.prototype);
assert.deepStrictEqual(arr.__proto__, Array.prototype);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

//o __proto__ de Object.prototype é null
assert.deepStrictEqual(obj.__proto__.__proto__, null);

function Employee() {}
Employee.prototype.salary = () => 'salary**';
//herda a instância de Employee
function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => 'profitShare**';

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**';

//Podemos chamar via prototype, mas chamar direto dá erro.
//Se não chamar o 'new', o primeiro __proto__ vai ser sempre
//a instância de Function, sem herdar nossas classes
//Para acessar as classes sem o new, pode acessar direto via prototype
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

//Quando chamamos com o 'new', o __proto__ recebe o prototype atual
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);

const manager = new Manager();
assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__,
  Employee.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);

class T1 {
  ping() {
    return 'ping';
  }
}

class T2 extends T1 {
  pong() {
    return 'pong';
  }
}

class T3 extends T2 {
  shoot() {
    return 'shoot';
  }
}

const t3 = new T3();
assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);
