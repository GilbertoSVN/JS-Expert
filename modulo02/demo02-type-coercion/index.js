//9999999999999999
//0.1 + 0.2 === 0.3 -> false
//3 > 2 > 1 -> false
//3 > 2 >= 1 -> true
//'21' - - 1 -> 22
//'B' + 'a' + + 'a' + 'a'

console.assert(String(123) === '123', 'explicit convertion to string');
console.assert(123 + '' === '123', 'implicit convertion to string');

console.assert(
  ('hello' || 123) === 'hello',
  '|| returs the first element if both are true!'
);
console.assert(('hello' && 123) === 123, '&& returs the last element!');

const item = {
  name: 'Gilberto',
  age: 50,
  //string: chama primeiro se for primitivo, se não for chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  //number: chama primeiro, se não chama o toString
  valueOf() {
    return 100;
  },
  //esse tem prioridade!
  [Symbol.toPrimitive](coercionType) {
    const types = {
      string: JSON.stringify(this),
      number: '100',
    };

    return types[coercionType] || types.string;
  },
};

//antes do toPrimitive
//console.log('toString', String(item));
//console.log('valueOf', Number(item));

//depois do toPrimitive
//console.log('String', String(item));
//console.log('Number', Number(item));
//chama a conversão default;
//console.log('Date', new Date(item));

console.assert(item + 0 === '{"name":"Gilberto","age":50}0');
console.assert(!!item);
console.assert('Ae'.concat(item) === 'Ae{"name":"Gilberto","age":50}');
console.assert(item == String(item));

const item2 = { ...item, name: 'Zezin', age: 20 };
console.assert(item2.name === 'Zezin' && item2.age === 20);
