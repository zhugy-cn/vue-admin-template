<template>
    <countTo :startVal='startVal' :endVal='endVal'></countTo>
</template>

<script>
import countTo from 'vue-count-to';
export default {
    components: { countTo },
    data() {
        return {
            startVal: 0,
            endVal: 5650
        };
    }
};
</script>