<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教师管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-button type="primary" @click="addTeacherModel = true">添加教师</el-button>
      <el-input
        v-model="search"
        clearable
        placeholder="输入教师号搜索"
        style="width: 400px;margin-left: 10px;"
      />
      <el-table
        :data="tableData.filter(data => !search || data.num.includes(search.toLowerCase()))"
        border
        style="width: 100%;margin-top: 20px;"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="num" label="教师编号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="changeCard(scope.row)" type="warning" size="small">换卡</el-button>
            <el-button @click="delTeacher(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="itemTotal"
        style="margin-top: 16px;"
      ></el-pagination>
    </div>
    <!-- 添加教师 -->
    <el-dialog title="添加教师" :visible.sync="addTeacherModel" width="30%" center>
      <el-form :model="addTeacherModelForm">
        <el-form-item label="教师编号" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            placeholder="请输入教师编号"
            v-model="addTeacherModelForm.TeacherId"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            placeholder="请输入教师姓名"
            v-model="addTeacherModelForm.TeacherName"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>
        卡片状态：
        <span style="color: green;">获取成功！</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTeacherModel = false">取 消</el-button>
        <el-button type="warning" @click="addTeacherReadCard">读 卡</el-button>
        <el-button type="primary" @click="addTeacherOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除教师 -->
    <el-dialog title="提示" :visible.sync="delTeacherModel" width="300px" center>
      <div style="text-align:center;">
        <p>正在进行删除教师的操作</p>
        <p>
          将要删除:
          <span style="color:red">{{delTeacherInfo.name}}</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delTeacherModel = false">取 消</el-button>
        <el-button type="danger" @click="delTeacherOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 换卡 -->
    <el-dialog title="提示" :visible.sync="changeCardModel" width="300px" center>
      <div style="text-align:center;">
        <p>正在进行换卡操作</p>
        <p>
          将要换卡的教师是:
          <span style="color:red">{{changeCardInfo.name}}</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeCardModel = false">取 消</el-button>
        <el-button type="warning" @click="changeCardRead">读 卡</el-button>
        <el-button type="primary" @click="changeCardOk">确 定</el-button>
      </span>
    </el-dialog>
  </ui-container>
</template>

<script>
export default {
  name: "manageTeacher",
  data() {
    return {
      formLabelWidth: "70px",
      addTeacherModel: false,
      addTeacherModelForm: {
        TeacherId: null,
        TeacherName: ""
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
      delTeacherModel: false,
      delTeacherInfo: {
        id: null,
        name: "",
        num: null
      },
      changeCardModel: false,
      changeCardInfo: {
        id: null,
        name: "",
        num: null
      }
    };
  },
  methods: {
    addTeacherReadCard() {
      console.log("添加教师时的读卡操作！");
    },
    addTeacherOk() {
      console.log("添加教师");
    },
    delTeacher(info) {
      this.delTeacherModel = true;
      this.delTeacherInfo = Object.assign(this.delTeacherInfo, info);
      console.log("删除教师 => ", info);
    },
    delTeacherOk() {
      console.log("确认删除教师！");
    },
    changeCard(info) {
      this.changeCardModel = true;
      this.changeCardInfo = Object.assign(this.changeCardInfo, info);
      console.log("换卡教师 => ", info);
    },
    changeCardRead() {
      console.log("换卡时进行读卡操作！")
    }, 
    changeCardOk() {
      console.log("换卡操作");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>