<template>
  <ui-container>
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
          <el-cascader :options="CMList"  style="width: 380px;" v-model="CMListSelect"></el-cascader>
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
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeCardModel = false">取 消</el-button>
        <el-button type="warning" @click="changeCardRead">读 卡</el-button>
        <el-button type="primary" @click="changeCardOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 学生成绩管理 -->
    <manageScore :chooseSid="chooseSid" ref="studentScoreManageModel"></manageScore>
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
      tableData: [
        {
          id: 1,
          num: "100001",
          name: "张三"
        },
        {
          id: 2,
          num: "100002",
          name: "李四"
        },
        {
          id: 3,
          num: "100003",
          name: "王五"
        },
        {
          id: 4,
          num: "100004",
          name: "赵六"
        },
        {
          id: 5,
          num: "100005",
          name: "孙七"
        }
      ],
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
      chooseSid: 0,
      cardControl: "",
      CMList: [],
      CMListSelect: ['', '']
    };
  },
  methods: {
    addStudentReadCard() {
      this.cardControl = cardId();
    },
    addStudentOk() {
      console.log(this.cardControl)
      console.log(this.addStudentModelForm)
      console.log(this.CMListSelect)
      console.log("添加学生");
      this.$api.student.addStudent()
    },
    delStudent(info) {
      this.delStudentModel = true;
      this.delStudentInfo = Object.assign(this.delStudentInfo, info);
      console.log("删除学生 => ", info);
    },
    delStudentOk() {
      console.log("确认删除学生！");
    },
    changeCard(info) {
      this.changeCardModel = true;
      this.changeCardInfo = Object.assign(this.changeCardInfo, info);
      console.log("换卡学生 => ", info);
    },
    changeCardRead() {
      console.log("换卡时进行读卡操作！");
    },
    changeCardOk() {
      console.log("换卡操作");
    },
    manageScore(row) {
      this.$refs["studentScoreManageModel"].showScoreManageModel();
      this.chooseSid = row.id;
    },
    async getCM() {
      try {
        const getCMCListRes = await this.$api.collageMajorClass.getCMCList();
        console.log(getCMCListRes.getCListRes);
        this.CMList = getCMCListRes.getCListRes.map(item => {
          return {
            value: item._id,
            label: item.name,
            children: item.children
                    ? item.children.map(cItem => {
                      return {
                        value: cItem._id,
                        label: cItem.name
                      }
                    })
                    : []
          }
        })
        console.log(this.CMList)
      } catch (error) {
        this.$message.error("班级专业列表获取失败");
      }
    }
  },
  mounted() {
    this.getCM();
  }
};
</script>

<style lang="scss" scoped>
</style>