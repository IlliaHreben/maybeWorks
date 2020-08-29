const LIVR = require('livr')
LIVR.Validator.defaultAutoTrim(true)

LIVR.Validator.registerAliasedDefaultRule({
    name: 'page_number',
    rules: ['not_empty', 'positive_integer', {default: 1}],
    error: 'WRONG_PAGE'
})

LIVR.Validator.registerAliasedDefaultRule({
    name: 'page_size',
    rules: ['not_empty', { 'number_between': [10, 100] }, {default: 10}],
    error: 'WRONG_PAGE_SIZE'
})

LIVR.Validator.registerAliasedDefaultRule({
    name: 'task_status',
    rules: [ 'not_empty', {'one_of': ['active', 'inactive', 'declined', 'completed']}, {default: 'active'}],
    error: 'WRONG_STATUS'
})

LIVR.Validator.registerAliasedDefaultRule({
    name: 'task_statuses',
    rules: [ 'not_empty', { 'list_of': 'task_status'}],
    error: 'WRONG_STATUSES'
})

LIVR.Validator.registerAliasedDefaultRule({
    name: 'task_mark',
    rules: [ 'not_empty', { 'number_between': [0, 5] } ],
    error: 'WRONG_MARK'
})

LIVR.Validator.registerAliasedDefaultRule({
    name: 'user_ids',
    rules: [ { 'list_of': 'positive_integer' }, { default: [] } ],
    error: 'WRONG_ID'
})

module.exports = LIVR
