<template>
  <div class="page-module login-container backgroundCover flex width_100 height_100">
    <OBJECT
      id="LotusCardDriver"
      Visible="false"
      width="0"
      height="0"
      classid="CLSID:BD1874A5-3810-4639-8B70-3DDD607BAADB"
    ></OBJECT>
    <div class="login-panel">
      <div class="head-text align_center">
        <img src="./images/card.jpg">
      </div>
      <div style="text-align:center;">请刷卡进入成绩管理系统</div>
    </div>
  </div>
</template>
<script type="text/javascript" layout="full" meta="{auth:false}">
import { homePage } from "src/common/setting";
import { cardId } from "src/common/cardControl";
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    getCardId() {
      return cardId();
    },
    async login(cardId) {
      try {
        const vm = this;
        const data = await vm.$api.user.login({ card_ID: cardId });
        let auth = data['data']['role'] ? '教师' : '学生';
        if(data['data']['role'] == 1) {
          auth = '管理员'
        }
        if(!data['data']['role']) {
          data['data']['role'] = 3
        }
        localStorage.setItem('loginInfo', `{ "name": "${data.data.name}", "role": "${data.data.role}", "_id": "${data.data._id}" }`)
        vm.$message.success(`${data.msg}, 欢迎${data.data.name}登录系统，身份${auth} 。`)
        setTimeout(() => {
          vm.$router.replace(homePage)
        }, 1500)
      } catch (error) {
        this.$message.error("登录出错，请检查卡片，如有疑问请联系管理员！")
        var Timer = setInterval(() => {
          const cardId = this.getCardId();
          cardId ? (clearInterval(Timer), this.login(cardId)) : "";
        }, 1200);
      }
    }
  },
  mounted() {
    //通过一个定时器循环获取数据，直到获取到数据之后，停止
    var Timer = setInterval(() => {
      const cardId = this.getCardId();
      cardId ? (clearInterval(Timer), this.login(cardId)) : "";
    }, 1200);
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.login-container {
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: url(./images/login_body.jpg);

  .login-panel {
    padding: 25px 15px;
    width: 350px;
    border-radius: 3px;
    background-color: #fff;
  }

  .head-text {
    margin-bottom: 25px;
  }
}
</style>
