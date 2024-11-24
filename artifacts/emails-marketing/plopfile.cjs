module.exports = function (plop) {
  plop.setGenerator('email', {
    description: 'Add an email',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Email name:',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/{{kebabCase name}}',
        base: 'templates/hook',
        templateFiles: 'templates/hook/*.hbs',
      },
    ],
  })
}
