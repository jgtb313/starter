module.exports = function (plop) {
  plop.setGenerator('store', {
    description: 'Add an store',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Store name:',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/{{kebabCase name}}',
        base: 'templates/store',
        templateFiles: 'templates/store/*.hbs',
      },
    ],
  })
}
