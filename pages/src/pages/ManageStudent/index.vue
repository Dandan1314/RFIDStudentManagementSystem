<template>
  <ui-container>
    <OBJECT
      id="LotusCardDriver"
      Visible="false"
      width="0"
      height="0"
      classid="CLSID:BD1874A5-3810-4639-8B70-3DDD607BAADB"
    ></OBJECT>
    <div slot="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-button type="primary" @click="addStudentModel = true">添加学生</el-button>
      <el-input
        v-model="search"
        clearable
        placeholder="输入学生号搜索"
        style="width: 400px;margin-left: 10px;"
      />
      <el-table
        :data="tableData.filter(data => !search || data.num.includes(search.toLowerCase()))"
        border
        style="width: 100%;margin-top: 20px;"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="num" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="manageScore(scope.row)" type="primary" size="small">成绩管理</el-button>
            <el-button @click="changeCard(scope.row)" type="warning" size="small">换卡</el-button>
            <el-button @click="delStudent(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="itemTotal"
        style="margin-top: 16px;"
        v-show="!search"
      ></el-pagination>
    </div>
    <!-- 添加学生 -->
    <el-dialog title="添加学生" :visible.sync="addStudentModel" width="500px" center>
      <el-form :model="addStudentModelForm">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input autocomplete="off" placeholder="请输入学号" v-model="addStudentModelForm.StudentId"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            placeholder="请输入学生姓名"
            v-model="addStudentModelForm.StudentName"
          ></el-input>
        </el-form-item>
        <el-form-item label="专业班级" :label-width="formLabelWidth">
          <el-cascader :options="CMList" style="width: 380px;" v-model="CMListSelect"></el-cascader>
        </el-form-item>
      </el-form>
      <div>
        卡片状态：
        <span
          :style="cardControl ? 'color: green;' : 'color: red;'"
        >{{ cardControl ? '获取成功！' : '未获取！' }} {{ cardControl }}</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="() => {addStudentModel = false; cardControl = '';}">取 消</el-button>
        <el-button type="warning" @click="addStudentReadCard">读 卡</el-button>
        <el-button type="primary" @click="addStudentOk" :disabled="!cardControl">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除学生 -->
    <el-dialog title="提示" :visible.sync="delStudentModel" width="350px" center>
      <div style="text-align:center;">
        <p>正在进行删除学生的操作</p>
        <p>
          将要删除:
          <span style="color:red">{{delStudentInfo.name}}</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delStudentModel = false">取 消</el-button>
        <el-button type="danger" @click="delStudentOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 换卡 -->
    <el-dialog title="提示" :visible.sync="changeCardModel" width="350px" center>
      <div style="text-align:center;">
        <p>正在进行换卡操作</p>
        <p>
          将要换卡的学生是:
          <span style="color:red">{{changeCardInfo.name}}</span>
        </p>卡片状态：
        <span
          :style="cardControl ? 'color: green;' : 'color: red;'"
        >{{ cardControl ? '获取成功！' : '未获取！' }} {{ cardControl }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeCardModel = false">取 消</el-button>
        <el-button type="warning" @click="changeCardRead">读 卡</el-button>
        <el-button type="primary" @click="changeCardOk" :disabled="!cardControl">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 学生成绩管理 -->
    <manageScore ref="studentScoreManageModel"></manageScore>
  </ui-container>
</template>

<script>
import { cardId } from "src/common/cardControl";
import manageScore from "./manageScore";
export default {
  name: "manageStudent",
  components: {
    manageScore
  },
  data() {
    return {
      formLabelWidth: "70px",
      addStudentModel: false,
      addStudentModelForm: {
        StudentId: null,
        StudentName: ""
      },
      search: null,
      itemTotal: 100,
      tableData: [],
      delStudentModel: false,
      delStudentInfo: {
        id: null,
        name: "",
        num: null
      },
      changeCardModel: false,
      changeCardInfo: {
        id: null,
        name: "",
        num: null
      },
      cardControl: "",
      CMList: [],
      CMListSelect: ["", ""]
    };
  },
  methods: {
    addStudentReadCard() {
      this.cardControl = cardId();
    },
    async addStudentOk() {
      const vm = this;
      if (
        !(
          vm.cardControl &&
          vm.addStudentModelForm.StudentId &&
          vm.addStudentModelForm.StudentName &&
          vm.CMListSelect[0] &&
          vm.CMListSelect[1]
        )
      ) {
        vm.$message.error("信息填写不完整！");
        return false;
      }
      const addStudentObj = {
        card_ID: vm.cardControl,
        student_Num: vm.addStudentModelForm.StudentId,
        name: vm.addStudentModelForm.StudentName,
        collage_ID: vm.CMListSelect[0],
        majorClass_ID: vm.CMListSelect[1]
      };
      try {
        const addStudentRes = await this.$api.student.addStudent(addStudentObj);
        vm.$message.success("添加成功！");
        vm.cardControl = "";
        vm.addStudentModelForm = {};
        vm.CMListSelect = ["", ""];
        vm.addStudentModel = false;
        vm.getStudentList();
      } catch (error) {
        vm.$message.error(error.msg || "添加学生出错！");
      }
    },
    delStudent(info) {
      this.delStudentModel = true;
      this.delStudentInfo = Object.assign(this.delStudentInfo, info);
    },
    async delStudentOk() {
      try {
        const deleteStudentRes = await this.$api.student.delStudent(
          this.delStudentInfo._id
        );
        this.delStudentModel = false;
        this.$message.success("学生删除成功！");
        this.getStudentList();
      } catch (error) {
        this.$message.error("学生删除失败！");
      }
    },
    changeCard(info) {
      this.changeCardModel = true;
      this.changeCardInfo = Object.assign(this.changeCardInfo, info);
    },
    changeCardRead() {
      this.cardControl = cardId();
    },
    async changeCardOk() {
      try {
        const vm = this;
        const editInfo = {
          _id: vm.changeCardInfo._id,
          card_ID: vm.cardControl
        };
        const changeCardRes = await this.$api.student.editStudent(editInfo);
        this.$message.success("换卡成功！");
        this.cardControl = "";
        this.changeCardModel = false;
      } catch (error) {
        this.$message.error("换卡失败！");
      }
    },
    manageScore(row) {
      this.$refs["studentScoreManageModel"].showScoreManageModel(row.id);
    },
    async getCM() {
      try {
        const getCMCListRes = await this.$api.collageMajorClass.getCMCList();
        this.CMList = getCMCListRes.getCListRes.map(item => {
          return {
            value: item._id,
            label: item.name,
            children: item.children
              ? item.children.map(cItem => {
                  return {
                    value: cItem._id,
                    label: cItem.name
                  };
                })
              : []
          };
        });
      } catch (error) {
        this.$message.error("班级专业列表获取失败");
      }
    },
    async getStudentList() {
      try {
        const getStudentList = await this.$api.student.getStudentList();
        this.tableData = getStudentList.getStudentList.map(item => {
          item.id = item._id;
          item.num = item.student_Num;
          delete item.student_Num;
          return item;
        });
      } catch (error) {
        this.$message.error("学生列表获取失败");
      }
    }
  },
  mounted() {
    this.getCM();
    this.getStudentList();
  }
};
</script>

<style lang="scss" scoped>
</style>