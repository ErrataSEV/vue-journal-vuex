<template>
    <button class="btn btn-primary" @click="handleClick">
        <i class="fa fa-2x" :class="icon"></i>
    </button>
</template>

<script>
// fa-plus
export default {
    props: {
        icon: {
            type: String,
            required: false,
            default: 'fa-plus'
        }
    },
    methods: {
        handleClick() {
            this.$emit('on:click')
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    border-radius: 100%; 
    bottom: 20px;
    height: 80px;
    position: fixed;
    right: 20px;
    width: 80px;
}
</style>