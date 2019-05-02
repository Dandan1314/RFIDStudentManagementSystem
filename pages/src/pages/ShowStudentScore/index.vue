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
        <el-table-column prop="result_name" label="考试结果"></el-table-column>
        <el-table-column prop="exam_category_name" label="考试类型"></el-table-column>
      </el-table>
    </div>
  </ui-container>
</template>

<script>
export default {
  name: "ShowStudentScore",
  data() {
    return {
      resultOpt: [
        {
          label: "通过",
          value: 1
        },
        {
          label: "未通过",
          value: 2
        },
        {
          label: "缺考",
          value: 3
        }
      ],
      examOpt: [
        {
          label: "普通",
          value: 1
        },
        {
          label: "补考",
          value: 2
        },
        {
          label: "重修",
          value: 3
        }
      ],
      scoreData: []
    };
  },
  methods: {
    async getStudentScoreInfo() {
      try {
        const vm = this;
        const getStudentScoreInfoRes = await this.$api.score.getScoreInfo(
          JSON.parse(localStorage.getItem("loginInfo"))._id
        );
        this.scoreData = getStudentScoreInfoRes.getScoreInfo.map(item => {
          return {
            id: item._id,
            subject: item.subjectName,
            dailyScroll: item.dailyScroll,
            examScroll: item.examScroll,
            resScroll: item.resScroll,
            result_name: vm.resultOpt.filter(ArrObjItem => {
              return ArrObjItem.value == item.result;
            })[0].label,
            exam_category_name: vm.examOpt.filter(ArrObjItem => {
              return ArrObjItem.value == item.exam_Category;
            })[0].label
          };
        });
      } catch (error) {
        this.$message.error("获取成绩失败！");
      }
    }
  },
  mounted() {
    this.getStudentScoreInfo();
  }
};
</script>

<style lang="scss" scoped>
</style>
