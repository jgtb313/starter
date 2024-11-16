module.exports = function (plop) {
  plop.setHelper('join', (text) => {
    return text.split(' ').join('')
  })

  plop.setHelper('lowerSentenceCase', (text) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (char) => char.toLowerCase())
      .trim()
  })

  plop.setHelper('upperSentenceCase', (text) => {
    return text.replace(/([A-Z])/g, ' $1').trim()
  })

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
        type: 'add',
        path: 'src/ports/http/modules/{{pascalCase name}}.http.ts',
        templateFile: 'templates/module/ports/http/port.http.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/ports/http/modules/index.ts',
        pattern: /(\/\/ appendHere)/,
        template: "export * from './{{ pascalCase name }}.http'\n$1",
      },

      {
        type: 'add',
        path: 'src/adapters/mongodb/modules/{{pascalCase name}}.mongodb.ts',
        templateFile: 'templates/module/adapters/mongodb/adapter.mongodb.ts.hbs',
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
        template: '{{ camelCase name }}: {{ camelCase name }}(Collections)(),\n$1',
      },
      {
        type: 'modify',
        path: 'src/adapters/mongodb/MongoDB.collections.ts',
        pattern: /(\/\/ appendCollectionImportHere)/,
        template: "import { {{ pascalCase name }} } from '@/core/{{ kebabCase name }}/domain'\n$1",
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
          "Collections.{{ camelCase name }} = await createCollectionMongoDB<ICollections['{{ camelCase name }}']>(database, '{{ camelCase namePlural }}')\n$1",
      },
      {
        type: 'modify',
        path: 'src/adapters/mongodb-in-memory/MongoDB.in-memory.mock.ts',
        pattern: /(\/\/ appendSearchImportHere)/,
        template: "import { {{ pascalCase name }}Search } from '@/adapters/mongodb/modules/{{ pascalCase name }}.mongodb'\n$1",
      },
      {
        type: 'modify',
        path: 'src/adapters/mongodb-in-memory/MongoDB.in-memory.mock.ts',
        pattern: /(\/\/ appendMockImportHere)/,
        template: "import { {{ camelCase name }}Mocks } from '@/core/{{ kebabCase name }}/{{ pascalCase name }}.mock'\n$1",
      },
      {
        type: 'modify',
        path: 'src/adapters/mongodb-in-memory/MongoDB.in-memory.mock.ts',
        pattern: /(\/\/ appendMockHere)/,
        template: "{ name: '{{ camelCase namePlural }}', data: {{ camelCase name }}Mocks, search: {{ pascalCase name }}Search, },\n$1",
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
        path: 'src/core/{{kebabCase name}}/{{pascalCase name}}.mock.ts',
        templateFile: 'templates/module/core/domain.mock.ts.hbs',
      },
    ],
  })

  plop.setGenerator('use-case', {
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
        type: 'addMany',
        destination: 'src/core/{{kebabCase moduleName}}/use-cases',
        base: 'templates/use-case',
        templateFiles: 'templates/use-case/*.hbs',
      },
    ],
  })

  plop.setGenerator('adapter', {
    description: 'Add an adapter',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Adapter name:',
      },
      {
        type: 'input',
        name: 'port',
        message: 'Port name:',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/adapters/{{kebabCase name}}',
        base: 'templates/adapter/core',
        templateFiles: 'templates/adapter/core/*.hbs',
      },
      {
        type: 'addMany',
        destination: 'src/adapters/{{kebabCase name}}-in-memory',
        base: 'templates/adapter/in-memory',
        templateFiles: 'templates/adapter/in-memory/*.hbs',
      },
    ],
  })

  plop.setGenerator('port', {
    description: 'Add an port',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Port name:',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/ports/{{kebabCase name}}',
        base: 'templates/port',
        templateFiles: 'templates/port/*.hbs',
      },
    ],
  })
}
