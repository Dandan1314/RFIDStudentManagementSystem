<template>
  <div>
    <el-dialog title="考试成绩" :visible.sync="studentScoreManageModel" width="800px">
      <el-form :inline="true" :model="addExamRes">
        <el-form-item>
          <el-select
            v-model="addExamRes.subject"
            filterable
            placeholder="学科名"
            style="width: 188px;"
          >
            <el-option
              v-for="(item, key) in subjectOpt"
              :key="key"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
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
        <el-table-column property="result_name" label="考试结果" align="center" width="100px;"></el-table-column>
        <el-table-column property="exam_category_name" label="考试类型" align="center" width="100px;"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="delScore(scope.row)" type="danger" size="medium">删除</el-button>
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
  data() {
    return {
      chooseSid: null,
      studentScoreManageModel: false,
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
      gridData: [],
      addExamRes: {
        subject: "",
        dailyScroll: null,
        examScroll: null,
        resScroll: null,
        result: null,
        exam_category: null
      },
      subjectOpt: []
    };
  },
  methods: {
    showScoreManageModel(sid) {
      this.chooseSid = sid;
      this.studentScoreManageModel = true;
      this.gridData = [];
      // 初始化学科列表
      this.initSubjectList();
      // 初始化学生数据
      this.initStudentScore();
    },
    async delScore(scoreInfo) {
      try {
        const deleteScoreRes = await this.$api.score.delScore(scoreInfo.id)
        this.$message.success(deleteScoreRes.msg || '删除成功！')
        this.initStudentScore();
      } catch (error) {
        this.$message.error(error.msg || '删除失败！')
      }
    },
    async addExamResInfo() {
      const vm = this;
      const addInfoObj = {
        student_ID: vm.chooseSid,
        subject_ID: vm.addExamRes.subject,
        dailyScroll: vm.addExamRes.dailyScroll,
        examScroll: vm.addExamRes.examScroll,
        resScroll: vm.addExamRes.resScroll,
        result: vm.addExamRes.result,
        exam_Category: vm.addExamRes.exam_category
      };
      try {
        const addScoreRes = await this.$api.score.addScore(addInfoObj);
        this.addExamRes = {
          subject: "",
          dailyScroll: null,
          examScroll: null,
          resScroll: null,
          result: "",
          exam_category: ""
        };
        this.initStudentScore();
      } catch (error) {
        this.$message.error(error.msg || "添加失败！");
      }
    },
    async initStudentScore() {
      try {
        const vm = this
        const getStudentScoreRes = await this.$api.score.getScoreInfo(
          this.chooseSid
        );
        this.gridData = getStudentScoreRes.getScoreInfo.map(item => {
          return {
            id: item._id,
            subject: item.subjectName,
            dailyScroll: item.dailyScroll,
            examScroll: item.examScroll,
            resScroll: item.resScroll,
            result_name: vm.resultOpt.filter(ArrObjItem => {
              return ArrObjItem.value == item.result
            })[0].label,
            exam_category_name: vm.examOpt.filter(ArrObjItem => {
              return ArrObjItem.value == item.exam_Category
            })[0].label,
          };
        });
      } catch (error) {
        this.$message.error("学生分数加载失败！");
      }
    },
    async initSubjectList() {
      try {
        const getSubjectListRes = await this.$api.subject.getSubjectList();
        this.subjectOpt = getSubjectListRes.subjectList;
      } catch (error) {
        this.$message.error("学科列表加载失败！");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>