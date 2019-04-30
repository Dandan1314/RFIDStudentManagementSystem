<template>
  <div>
    <el-dialog title="考试成绩" :visible.sync="studentScoreManageModel" width="800px">
      <el-form :inline="true" :model="addExamRes">
        <el-form-item>
          <el-input v-model="addExamRes.subject" placeholder="学科名" style="width: 188px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addExamRes.dailyScroll" placeholder="平时" style="width: 68px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addExamRes.examScroll" placeholder="考试" style="width: 68px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addExamRes.resScroll" placeholder="总分" style="width: 70px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="addExamRes.result" placeholder="考试结果" style="width: 102px;">
            <el-option
              v-for="item in resultOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="addExamRes.exam_category" placeholder="类型" style="width: 80px;">
            <el-option
              v-for="item in examOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="addExamResInfo"></el-button>
        </el-form-item>
      </el-form>
      <el-table :data="gridData">
        <el-table-column property="subject" label="学科名" align="center" width="200px"></el-table-column>
        <el-table-column property="dailyScroll" label="平时成绩" align="center" width="80px;"></el-table-column>
        <el-table-column property="examScroll" label="考试成绩" align="center" width="80px;"></el-table-column>
        <el-table-column property="resScroll" label="总分" align="center" width="80px;"></el-table-column>
        <el-table-column property="result" label="考试结果" align="center" width="100px;"></el-table-column>
        <el-table-column property="exam_category" label="考试类型" align="center" width="100px;"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="delScroll(scope.row)" type="danger" size="medium">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top:20px;"></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "manageScore",
  props: ["chooseSid"],
  data() {
    return {
      studentScoreManageModel: false,
      resultOpt: [
        {
          label: "通过",
          value: 1
        },
        {
          label: "未通过",
          value: 2
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
        },
        {
          label: "缺考",
          value: 4
        }
      ],
      gridData: [
        {
          id: 1,
          subject: "高等数学1",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 2,
          subject: "高等数学3",
          dailyScroll: 50,
          examScroll: 30,
          resScroll: 45,
          result: 2,
          exam_category: "普通",
          addBy: 1
        },
        {
          id: 3,
          subject: "高等数学3",
          dailyScroll: 70,
          examScroll: 70,
          resScroll: 70,
          result: 1,
          exam_category: "补考",
          addBy: 1
        },
        {
          id: 4,
          subject: "大学英语2",
          dailyScroll: 60,
          examScroll: 60,
          resScroll: 60,
          result: 1,
          exam_category: "普通",
          addBy: 1
        }
      ],
      addExamRes: {
        id: null,
        subject: "",
        dailyScroll: null,
        examScroll: null,
        resScroll: null,
        result: "",
        exam_category: ""
      }
    };
  },
  methods: {
    showScoreManageModel() {
      this.studentScoreManageModel = true;
      this.gridData = []
      // 初始化学生数据
      this.initStudentScore()
    },
    delScroll(scrollInfo) {
      console.log("scrollInfo => ", scrollInfo);
    },
    addExamResInfo() {},
    async initStudentScore() {
      try {
        const getStudentScoreRes = await this.$api.score.getScoreInfo(this.chooseSid)
        console.log(getStudentScoreRes)
      } catch (error) {
        
      }
      console.log('init')
    }
  }
};
</script>

<style lang="scss" scoped>
</style>