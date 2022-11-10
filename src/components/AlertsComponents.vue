<template>
    <div
        class="alert" 
        role="alert"
        v-for="alerts in alertas" 
        :key="alerts.txt"
        :class="alerts.class"> 
            {{ alerts.txt }}
    </div>
</template>

<script>
export default {
    name: 'AlertsComponents',
    props: ['alertas'],
}
</script>

