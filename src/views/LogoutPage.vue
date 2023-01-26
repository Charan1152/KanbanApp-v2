<template>
    <div>
        
    </div>
</template>

<script>

export default {
    name: "LogoutPage",
    mounted() {
        this.$store.dispatch('logoutUser')
    }
}
</script>