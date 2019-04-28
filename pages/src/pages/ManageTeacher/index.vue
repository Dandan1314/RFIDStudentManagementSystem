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
        v-show="!search"
      ></el-pagination>
    </div>
    <!-- 添加教师 -->
    <el-dialog title="添加教师" :visible.sync="addTeacherModel" width="350px" center>
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
        <span
          :style="cardControl ? 'color: green;' : 'color: red;'"
        >{{ cardControl ? '获取成功！' : '未获取！' }} {{ cardControl }}</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="() => {addTeacherModel = false; cardControl = '';}">取 消</el-button>
        <el-button type="warning" @click="addTeacherReadCard">读 卡</el-button>
        <el-button type="primary" @click="addTeacherOk" :disabled="!cardControl">确 定</el-button>
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
    <el-dialog title="提示" :visible.sync="changeCardModel" width="350px" center>
      <div style="text-align:center;">
        <p>正在进行换卡操作</p>
        <p>
          将要换卡的教师是:
          <span style="color:red">{{changeCardInfo.name}}</span>
        </p>
      </div>
      <div style="text-align:center;">
        卡片状态：
        <span
          :style="cardControl ? 'color: green;' : 'color: red;'"
        >{{ cardControl ? '获取成功！' : '未获取！' }} {{ cardControl }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="() => {changeCardModel = false; cardControl = '';}">取 消</el-button>
        <el-button type="warning" @click="changeCardRead">读 卡</el-button>
        <el-button type="primary" @click="changeCardOk" :disabled="!cardControl">确 定</el-button>
      </span>
    </el-dialog>
  </ui-container>
</template>

<script>
import { cardId } from "src/common/cardControl";
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
      tableData: [],
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
      },
      cardControl: ""
    };
  },
  methods: {
    async getTeacherList() {
      try {
        const TeacherListRes = await this.$api.ManageTeacher.getTeacherList();
        this.tableData = TeacherListRes.TeacherList;
      } catch (error) {
        console.log(error);
      }
    },
    addTeacherReadCard() {
      this.cardControl = cardId();
    },
    async addTeacherOk() {
      const vm = this;
      try {
        const addTeacherRes = await this.$api.ManageTeacher.addTeacher({
          card_ID: vm.cardControl,
          teacher_Num: vm.addTeacherModelForm.TeacherId,
          name: vm.addTeacherModelForm.TeacherName
        });
        vm.getTeacherList();
        vm.$message.success(addTeacherRes.msg);
        vm.addTeacherModelForm = {
          TeacherId: null,
          TeacherName: ""
        };
        vm.cardControl = "";
        vm.addTeacherModel = false;
      } catch (error) {
        vm.$message.error("添加失败！");
      }
    },
    delTeacher(info) {
      this.delTeacherModel = true;
      this.delTeacherInfo = Object.assign(this.delTeacherInfo, info);
    },
    async delTeacherOk() {
      console.log("确认删除教师！", this.delTeacherInfo);
      try {
        const delTeacherRes = await this.$api.ManageTeacher.delTeacher(
          this.delTeacherInfo.serverID
        );
        this.$message.success(delTeacherRes.msg);
        this.delTeacherModel = false;
        this.getTeacherList();
      } catch (error) {
        console.log(error);
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
      const vm = this;
      try {
        const changeCardRes = await vm.$api.ManageTeacher.editTeacher({
          _id: vm.changeCardInfo.serverID,
          card_ID: vm.cardControl
        });
        vm.$message.success(changeCardRes.msg);
        this.cardControl = "";
        this.changeCardModel = false;
      } catch (error) {
        vm.$message.error("换卡失败！");
      }
    }
  },
  mounted() {
    this.getTeacherList();
  }
};
</script>

<style lang="scss" scoped>
</style>