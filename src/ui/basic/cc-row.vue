<template>
    <div class="cc-row">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            gutter: {
                type: Number,
                default: 0
            }
        },
        mounted(){
            this.$children && this.$children.map(item => {
                item.$el.style.paddingLeft = this.gutter + 'px';
                item.$el.style.paddingRight = this.gutter + 'px';
            });
        }
    }
</script>
<style scoped>

    .cc-row {
        position: relative;
        box-sizing: border-box;
        border-radius: 4px;
    }
    
    .cc-row:after, .cc-row::before {
        display: table;
        content: ''
    }
    .cc-row:after {
        clear: both;
    }
</style>