module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Add an component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/components/{{pascalCase name}}',
        base: 'templates/component',
        templateFiles: 'templates/component/*.hbs'
      }
    ]
  })

  plop.setGenerator('input', {
    description: 'Add an input',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Input name:'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/components/Form/{{pascalCase name}}',
        base: 'templates/component',
        templateFiles: 'templates/component/*.hbs'
      }
    ]
  })
}
