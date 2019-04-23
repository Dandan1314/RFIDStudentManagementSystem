<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>班级学院管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-button type="primary" @click="addCollageModel = true">添加学院</el-button>
      <el-tree
        :data="listData"
        :props="defaultProps"
        :render-content="renderContent"
        :expand-on-click-node="false"
        :style="{marginTop: '20px'}"
      ></el-tree>
    </div>

    <!-- 添加学院模态框 -->
    <el-dialog title="添加学院" :visible.sync="addCollageModel" width="30%" center>
      <el-form :model="addCollageModelForm" @submit.native.prevent>
        <el-form-item label="学院名" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            placeholder="请输入要新建的学院名"
            v-model="addCollageModelForm.collageName"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCollageModel = false">取 消</el-button>
        <el-button type="primary" @click="addCollageOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加班级专业 -->
    <el-dialog title="添加班级专业" :visible.sync="addMajorClassModel" width="30%" center>
      <el-form :model="addMajorClassModelForm" @submit.native.prevent>
        <el-form-item label="班级专业" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            placeholder="请输入要新建的班级专业名"
            v-model="addMajorClassModelForm.MajorClassName"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>
        <span>所在学院：</span>
        <span>{{addMajorClassModelForm.parent_name}}</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addMajorClassModel = false">取 消</el-button>
        <el-button type="primary" @click="addMajorClassOk">确 定</el-button>
      </div>
    </el-dialog>
  </ui-container>
</template>

<script>
export default {
  name: "manageCollageMajorClass",
  data() {
    return {
      formLabelWidth: "70px",
      addCollageModel: false,
      addCollageModelForm: {
        collageName: ""
      },
      addMajorClassModel: false,
      addMajorClassModelForm: {
        MajorClassName: "",
        pid: 0,
        parent_name: ""
      },
      listData: [
        {
          label: "计算机",
          id: 1,
          children: [
            {
              label: "2015计算机科学与技术1班",
              id: 2,
              pid: 1
            },
            {
              label: "2015计算机科学与技术2班",
              id: 3,
              pid: 1
            }
          ]
        },
        {
          label: "一级 2",
          id: 4,
          children: [
            {
              label: "二级 2-1",
              id: 5,
              pid: 4
            },
            {
              label: "二级 2-2",
              id: 6,
              pid: 4
            }
          ]
        },
        {
          label: "一级 3",
          id: 7,
          children: [
            {
              label: "二级 3-1",
              id: 8,
              pid: 7
            },
            {
              label: "二级 3-2",
              id: 9,
              pid: 7
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    async addCollageOk() {
      const vm = this;
      if (!vm.addCollageModelForm.collageName) {
        vm.$message.error("信息填写错误");
        return false;
      }
      try {
        const data = await vm.$api.collageMajorClass.addCMC({
          name: vm.addCollageModelForm.collageName
        });
        // 添加之后就重新获取一下列表
        vm.getCMCList()
        vm.$message.success(data.msg);
        vm.addCollageModelForm.collageName = "";
        vm.addCollageModel = false;
      } catch (error) {
        vm.$message.success("添加失败，请联系管理员！");
      }
    },
    addMajorClassOk() {
      console.log("添加班级学院 => ");
    },
    renderContent(h, { node, data, store }) {
      const vm = this;
      var addBtn = (
        <el-button
          size="mini"
          type="text"
          style="color: blue;margin-left: 10px;"
          on-click={() => {
            vm.addMajorClassModel = true;
            vm.addMajorClassModelForm.pid = data.id;
            vm.addMajorClassModelForm.parent_name = data.label;
          }}
        >
          添加
        </el-button>
      );
      var delBtn = (
        <el-button
          size="mini"
          type="text"
          style="color: red;margin-left: 10px;"
          on-click={() => this.remove(node, data)}
        >
          删除
        </el-button>
      );
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>{data.pid ? "" : addBtn}</span>
          <span>{delBtn}</span>
        </span>
      );
    },
    remove(node, data) {
      console.log("node => ", node);
      console.log("data => ", data);
    },
    async getCMCList() {
      const getCMCListRes = await this.$api.collageMajorClass.getCMCList();
      this.listData = await getCMCListRes.getCListRes.map(item => {
        item.label = item.name;
        item.id = item._id;
        if (item.children.length) {
          item.children.map(childrenItem => {
            childrenItem.pid = item.id;
            childrenItem.label = childrenItem.name;
            childrenItem.id = childrenItem._id;
            delete childrenItem.name;
            delete childrenItem._id;
            return childrenItem
          });
        }
        delete item.name;
        delete item._id;
        return item
      });
    }
  },
  mounted() {
    this.getCMCList()
  }
};
</script>

<style lang="scss" scoped>
</style>