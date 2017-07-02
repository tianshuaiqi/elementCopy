<template>
    <div class="cc-col" ref="cc_col">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            span: {
                type: Number,
                default: 24
            }
        },
        mounted(){
            this.$refs.cc_col.className += ' cc-col-' + this.span;
        }
    }
</script>
<style scoped>
    .cc-col {
        float: left;
        height: inherit;
        border-radius: 4px;
    }
</style>