import path from 'node:path'

export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    setupFiles: [path.resolve(__dirname, 'jest.setup.ts')],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/../src/$1',
    },
}
