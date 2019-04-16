<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>成绩查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table :data="scoreData" stripe :height="dataHeight">
        <el-table-column prop="subject" label="学科"></el-table-column>
        <el-table-column prop="dailyScroll" label="平时成绩"></el-table-column>
        <el-table-column prop="examScroll" label="考试成绩"></el-table-column>
        <el-table-column prop="resScroll" label="总分"></el-table-column>
        <el-table-column prop="result" label="考试结果"></el-table-column>
        <el-table-column prop="exam_category" label="考试类型"></el-table-column>
      </el-table>
    </div>
  </ui-container>
</template>

<script>
export default {
  name: "ShowStudentScore",
  data() {
    return {
      dataHeight: 0,
      scoreData: [
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 30,
          examScroll: 30,
          resScroll: 30,
          result: 0,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 10,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        }
      ]
    };
  },
  mounted () {
    this.dataHeight = document.querySelectorAll('.el-main')[0].offsetHeight - 135;
  },
};
</script>

<style lang="scss" scoped>
</style>
