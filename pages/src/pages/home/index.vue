<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>hello world</div>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: "Home",
  created() {}
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
