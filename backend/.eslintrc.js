module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        '@stylistic/js'
    ],
    'rules': {
        'quotes': ['error', 'single'],
        '@stylistic/js/indent': ['error', 4],
        '@stylistic/js/linebreak-style': ['error', 'windows'],
        '@stylistic/js/semi': ['error', 'never'],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'no-console': 'off',
        'no-unused-vars': ['error', {
            'args': 'all',
            'argsIgnorePattern': '^_',
            'caughtErrors': 'all',
            'caughtErrorsIgnorePattern': '^_',
            'destructuredArrayIgnorePattern': '^_',
            'varsIgnorePattern': '^_',
            'ignoreRestSiblings': true
        }]
    }
}
