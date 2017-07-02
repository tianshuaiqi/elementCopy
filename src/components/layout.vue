<template>
      <div class="layout" style="padding-left: 20px;">
        <p class="cc-title">基础布局</p>
        <div class="cc-code-container">
            <p class="cc-code-introduce">
                使用单一分栏创建基础的栅格布局。
            </p>
            <div class="cc-code-content">
                <cc-row :gutter="20" style="height: 40px;">
                    <cc-col :span="8" style="background: #99a9bf;">八栏</cc-col>
                    <cc-col :span="10" style="background: #d3dce6;">十一栏</cc-col>
                </cc-row>
            </div>
        </div>
        
      </div>
</template>

<script>
export default {
  
    name: 'hello',
      data () {
        return {
          msg: 'Welcome to Your Vue.js App'
        }
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
