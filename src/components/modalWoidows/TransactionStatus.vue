<template>
    <div>
        <div v-if='showSuccess'>
        Success 
        </div>
        <div v-if='showPending'>
        Pending 
        </div>
        <div v-if='showFail'>
        Fail
        </div>
    </div>
</template>
<script>
export default{
    props: ['showSuccess', "showPending", "showFail"]
}
</script>