export default {
    created() {
        console.log('Mixin created')
    },
    mounted() {
        console.log('Mixin mounted')
    },
    methods: {
        incrementar() {
            this.contador += 2
        }
    }
}