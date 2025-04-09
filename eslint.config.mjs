// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports'

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            ecmaVersion: 5,
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },
        ignores: ['src/common/models/generated/**/*'],
        rules: {
            'no-console': 'error',
            'linebreak-style': ['error', 'unix'],
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-unused-vars': 0,
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 0,
            '@typescript-eslint/no-unsafe-assignment': 0,
            '@typescript-eslint/no-unsafe-return': 0,
            '@typescript-eslint/no-unsafe-call': 0,
            '@typescript-eslint/no-unsafe-member-access': 0,
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        // 1. Side effect imports at the start. For me this is important because I want to import reset.css and global styles at the top of my main file.
                        ['^\\u0000'],
                        // 2. `react` and packages: Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                        ['^@?\\w'],
                        // 3. Absolute imports and other imports such as Vue-style `@/foo`.
                        // Anything not matched in another group. (also relative imports starting with "../")
                        ['^@', '^'],
                        // 4. relative imports from same folder "./" (I like to have them grouped together)
                        ['^\\./'],
                        // 6. media imports
                        ['^.+\\.(gif|png|svg|jpg)$'],
                    ],
                },
            ],
        },
    },
)
