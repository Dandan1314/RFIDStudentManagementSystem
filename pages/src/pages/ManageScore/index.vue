<template>
  <ui-container>
    <div slot="header">
      <div slot="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div>manageScore</div>
  </ui-container>
</template>

<script>
export default {
  name: "manageScore"
};
</script>

<style lang="scss" scoped>
</style>