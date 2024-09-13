module.exports = function (plop) {
  plop.setGenerator('resource', {
    description: 'Add an resource',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Resource name:'
      },
      {
        type: 'input',
        name: 'namePlural',
        message: 'Plural:'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/resources',
        base: 'templates/resource',
        templateFiles: 'templates/resource/*.hbs'
      }
    ]
  })
}
