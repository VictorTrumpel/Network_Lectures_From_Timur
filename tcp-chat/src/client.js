'use strict'

const inquirer = require('inquirer')

const net = require('node:net');

const socket = new net.Socket();

const connection = () => {
  const prompt = inquirer.createPromptModule()

  prompt.
  const question = { type: 'input', name: '' }
}

socket.connect({ port: 8000 });

socket.on('connect', connection)

// socket.on('error', () => {
//   console.log('Сервер недоступен')
// })



const questions = [
  {
    type: 'input',
    name: 'first_name',
    message: "What's your first name",
  },
  {
    type: 'input',
    name: 'last_name',
    message: "What's your last name",
    default() {
      return 'Doe';
    },
  },
];

prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, '  '));
});

  