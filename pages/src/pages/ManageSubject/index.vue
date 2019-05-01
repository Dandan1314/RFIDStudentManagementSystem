<template>
  <div class="subjectList">
    <el-tag
      :key="tag.id"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{tag.name}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="inputVisible = false"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">添加新学科</el-button>
  </div>
</template>

<script>
export default {
  name: "ManageSubjectComponent",
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    async getSubjectList() {
      try {
        const getSubjectListRes = await this.$api.subject.getSubjectList();
        this.dynamicTags = getSubjectListRes.subjectList.map(item => {
          return {
            id: item._id,
            name: item.name
          };
        });
      } catch (error) {
        this.$message.error("学科列表获取失败！");
      }
    },
    async handleClose(tag) {
      try {
        const deleteSubjectRes = await this.$api.subject.delSubject(tag.id);
        this.$message.success("学科删除成功！");
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      } catch (error) {
        this.$message.error("学科删除失败！");
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async handleInputConfirm() {
      const inputValue = this.inputValue;

      // 判断是不是没填写东西
      if (!inputValue) {
        this.inputVisible = false;
        return false;
      }

      try {
        const addSubjectRes = await this.$api.subject.addSubject({
          name: inputValue
        });
        if (inputValue) {
          this.dynamicTags.push({
            id: addSubjectRes.addSubjectRes._id,
            name: addSubjectRes.addSubjectRes.name
          });
        }
        this.inputValue = "";
      } catch (error) {
        this.inputVisible = false;
        this.inputValue = "";
        this.$message.error("学科添加失败！");
      }
    }
  },
  mounted() {
    this.getSubjectList();
  }
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
  margin-top: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
