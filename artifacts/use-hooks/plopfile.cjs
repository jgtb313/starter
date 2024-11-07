module.exports = function (plop) {
  plop.setGenerator('hook', {
    description: 'Add an hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name:',
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
