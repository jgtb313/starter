module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Add an module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Module name:'
      },
      {
        type: 'input',
        name: 'namePlural',
        message: 'Plural:'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/ports/database/modules/{{pascalCase name}}.repository.ts',
        templateFile: 'templates/module/ports/database/port.database.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/ports/http/modules/{{pascalCase name}}.http.ts',
        templateFile: 'templates/module/ports/http/port.http.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/adapters/mongodb/modules/{{pascalCase name}}.mongodb.ts',
        templateFile: 'templates/module/adapters/mongodb/adapter.mongodb.ts.hbs'
      },
      {
        type: 'addMany',
        destination: 'src/core/{{kebabCase name}}/domain',
        base: 'templates/module/core/domain',
        templateFiles: 'templates/module/core/domain/*.hbs'
      },
      {
        type: 'addMany',
        destination: 'src/core/{{kebabCase name}}/use-cases',
        base: 'templates/module/core/use-cases',
        templateFiles: 'templates/module/core/use-cases/*.hbs'
      }
    ]
  })

  plop.setGenerator('module:useCase', {
    description: 'Add an useCase',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: 'Module name:'
      },
      {
        type: 'input',
        name: 'name',
        message: 'UseCase name:'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/core/{{kebabCase moduleName}}/use-cases/{{kebabCase name}}.ts',
        templateFile: 'templates/module/core/custom-use-case.ts.hbs'
      }
    ]
  })
}
