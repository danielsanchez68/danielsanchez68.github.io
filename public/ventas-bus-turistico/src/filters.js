import Vue from 'vue'

Vue.filter('uppercase', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase()
})

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('reverse', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.split('').reverse().join('-')
})

Vue.filter('wrap', function (value, begin, end) {
    if (!value) return ''
    value = value.toString()
    return begin + value + end
})
