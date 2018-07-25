<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconClass"></use>
    </svg>
</template>

<script>
export default {
    name: 'svg-icon',
    props: {
        svgName: {
            type: String,
            required: true
        },
        className: {
            type: String
        }
    },
    computed: {
        iconClass() {
            return `#${this.svgName}`;
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className;
            } else {
                return 'svg-icon';
            }
        }
    }
};
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
