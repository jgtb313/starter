module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Add an module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Module name:',
      },
      {
        type: 'input',
        name: 'namePlural',
        message: 'Plural:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/ports/database/modules/{{pascalCase name}}.repository.ts',
        templateFile: 'templates/module/ports/database/port.database.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/ports/http/modules/{{pascalCase name}}.http.ts',
        templateFile: 'templates/module/ports/http/port.http.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/adapters/mongodb/modules/{{pascalCase name}}.mongodb.ts',
        templateFile: 'templates/module/adapters/mongodb/adapter.mongodb.ts.hbs',
      },
      {
        type: 'addMany',
        destination: 'src/core/{{kebabCase name}}/domain',
        base: 'templates/module/core/domain',
        templateFiles: 'templates/module/core/domain/*.hbs',
      },
      {
        type: 'addMany',
        destination: 'src/core/{{kebabCase name}}/use-cases',
        base: 'templates/module/core/use-cases',
        templateFiles: 'templates/module/core/use-cases/*.hbs',
      },

      {
        type: 'add',
        path: 'src/config/tests/in-memory/repositories/{{pascalCase name}}.repository.in-memory.ts',
        templateFile: 'templates/config/tests/in-memory/repositories/in-memory.repository.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/config/tests/in-memory/repositories/index.ts',
        pattern: /(\/\/ appendRepositoryInMemoryImportHere)/,
        template:
          "import { clear{{ pascalCase name }}RepositoryInMemory, {{ pascalCase name }}RepositoryInMemory } from './{{ pascalCase name }}.repository.in-memory'\n$1",
      },
      {
        type: 'modify',
        path: 'src/config/tests/in-memory/repositories/index.ts',
        pattern: /(\/\/ appendRepositoryInMemoryHere)/,
        template: '{{ camelCase name }}: {{ pascalCase name }}RepositoryInMemory,\n$1',
      },
      {
        type: 'modify',
        path: 'src/config/tests/in-memory/repositories/index.ts',
        pattern: /(\/\/ appendClearRepositoryInMemoryImportHere)/,
        template: 'clear{{ pascalCase name }}RepositoryInMemory()\n$1',
      },

      {
        type: 'modify',
        path: 'src/adapters/mongodb/modules/index.ts',
        pattern: /(\/\/ appendAdapterImportHere)/,
        template: "import { {{ camelCase name }} } from './{{ pascalCase name }}.mongodb'\n$1",
      },
      {
        type: 'modify',
        path: 'src/adapters/mongodb/modules/index.ts',
        pattern: /(\/\/ appendAdapterRepositoryHere)/,
        template: '{{ camelCase name }}: {{ camelCase name }}(),\n$1',
      },

      {
        type: 'modify',
        path: 'src/adapters/mongodb/MongoDB.collections.ts',
        pattern: /(\/\/ appendCollectionImportHere)/,
        template: "import { {{ pascalCase name }} } from '@/core/{{ camelCase name }}/domain'\n$1",
      },
      {
        type: 'modify',
        path: 'src/adapters/mongodb/MongoDB.collections.ts',
        pattern: /(\/\/ appendCollectionTypeHere)/,
        template: "{{ camelCase name }}: Searchable<{{ pascalCase name }}['state']>\n$1",
      },
      {
        type: 'modify',
        path: 'src/adapters/mongodb/MongoDB.collections.ts',
        pattern: /(\/\/ appendCollectionHere)/,
        template:
          "Collections.{{ camelCase name }} = await createCollectionMongoDB<ICollections['{{ camelCase name }}']>(database, '{{ kebabCase namePlural }}')\n$1",
      },

      {
        type: 'modify',
        path: 'src/ports/database/modules/index.ts',
        pattern: /(\/\/ appendModuleImportHere)/,
        template: "import { I{{ pascalCase name }}Repository } from './{{ pascalCase name }}.repository'\n$1",
      },
      {
        type: 'modify',
        path: 'src/ports/database/modules/index.ts',
        pattern: /(\/\/ appendModuleTypeHere)/,
        template: '{{ camelCase name }}: ReturnType<I{{ pascalCase name }}Repository>\n$1',
      },

      {
        type: 'modify',
        path: 'src/ports/http/modules/index.ts',
        pattern: /(\/\/ appendHere)/,
        template: "export * from './{{ pascalCase name }}.http'\n$1",
      },
    ],
  })

  plop.setGenerator('module:useCase', {
    description: 'Add an useCase',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: 'Module name:',
      },
      {
        type: 'input',
        name: 'name',
        message: 'UseCase name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/core/{{kebabCase moduleName}}/use-cases/{{kebabCase name}}.ts',
        templateFile: 'templates/module/core/custom-use-case.ts.hbs',
      },
    ],
  })
}
