module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'react-app', 'react-app/jest', 'prettier', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        trailingComma: 'none',
        bracketSpacing: true,
        bracketSameLine: true,
        printWidth: 160,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto'
      }
    ]
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'no-unused-vars': [
          'warn',
          {
            ignoreRestSiblings: true,
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
          }
        ]
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'react-hooks/rules-of-hooks': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': [
          'warn',
          {
            fixToUnknown: false
          }
        ],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'after-used',
            ignoreRestSiblings: true,
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
          }
        ],
        'import/newline-after-import': 'warn',
        'import/no-duplicates': [
          'warn',
          {
            considerQueryString: false
          }
        ],
        'import/order': [
          'warn',
          {
            alphabetize: {
              caseInsensitive: true,
              order: 'asc'
            },
            groups: ['external', 'builtin', 'internal', 'index'],
            pathGroups: [
              {
                pattern: 'react*',
                group: 'external',
                position: 'before'
              },
              {
                pattern: '**/*.scss',
                group: 'object',
                position: 'after'
              },
              {
                pattern: 'fusion-common-ui/**',
                group: 'internal',
                position: 'after'
              }
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            'newlines-between': 'always'
          }
        ],
        'sort-imports': [
          'warn',
          {
            ignoreCase: true,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
          }
        ]
      }
    },
    {
      files: ['*en.ts'],
      rules: {
        'sort-keys': ['warn', 'asc', { caseSensitive: false, natural: false }]
      }
    }
  ]
};
