module.exports = function (plop) {
  plop.setGenerator('schema', {
    description: 'Add an schema',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Schema name:'
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
        destination: 'src/{{kebabCase name}}',
        base: 'templates/schema',
        templateFiles: 'templates/schema/*.hbs'
      },
      {
        type: 'modify',
        path: 'src/index.ts',
        pattern: /(\/\/ appendHere)/,
        template: "export * from './{{~ kebabCase name }}'\n$1"
      }
    ]
  })
}
