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
      },
      {
        type: 'modify',
        path: 'src/resources/index.ts',
        pattern: /(\/\/ appendHere)/,
        template: "export * as {{ camelCase name }} from './{{~ pascalCase name }}.resources'\n$1"
      }
    ]
  })
}
