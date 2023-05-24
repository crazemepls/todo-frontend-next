module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/helper/(.*)$': '<rootDir>/src/helper/$1',
    },
    testEnvironment:'jsdom',

};