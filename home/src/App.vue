<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <h2>{{$store.state.message}}</h2>
        <hr>
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    data() {
        return {
            msg: "hello Vue",
        }
    },
}
</script>
<style lang="scss" scoped>
h1 {
    color: red;
}
</style>