'use strict';

const {
  watch,
  promises: { readFile },
} = require('fs');

class File {
  watch(event, filename) {
    console.log('this', this);
    console.log('arguments', Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

// watch(__filename, async (event, filename) => {
//
// });

const file = new File();
//Dessa forma, ignora o 'this' da classe File
//watch(__filename, file.watch);

//Alternativa para não herdar o this da função
//watch(__filename, (event, filename) => file.watch(event, filename));

//Podemos deixar explicito qual é o contexto que a função deve seguir
//o bind retorna uma função com o 'this' que se mantém de file, ignorando o watch
//watch(__filename, file.watch.bind(file));

file.watch.call(
  { showContent: () => console.log('call: hey gil!') },
  null,
  __filename
);

file.watch.apply({ showContent: () => console.log('apply: hey gil!') }, [
  null,
  __filename,
]);
