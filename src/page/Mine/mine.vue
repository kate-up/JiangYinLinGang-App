<template>
    <div style="height: 100%;background: #fff;">
      <div class="my_titcont">
        <div class="my_icon"><img src="../../assets/img/touxiang.png" alt=""></div>
        <div class="my_name">{{username}}</div>
        <div class="my_position">{{job}}</div>
      </div>
      <div style="text-align: center;">
        <div style="margin-top: 10px;">
          <div class="minelist">
            <div>
              <img v-show="value" class="my_bef_icon" src="../../assets/img/message_normal@2x.png" alt="">
              <img v-show="!value" class="my_bef_icon" src="../../assets/img/message@2x.png" alt="">
            消息免打扰</div>
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            <!-- <img class="my_rig_jt" src="../../assets/img/gz_right_jt.png" alt=""> -->
          </div>
          <div @click="toChangePasswd()" class="minelist">
            <div><img class="my_bef_icon" src="../../assets/img/my_password@2x.png" alt="">
            修改密码</div>
            <img class="my_rig_jt" src="../../assets/img/gz_right_jt.png" alt="">
          </div>
        </div>
      </div>
      <div @click="toLogin()" class="tijioa" style="bottom: 245px;">退出</div>
      <TabBar :idx = 3 />
    </div>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  components: { TabBar },
  data() {
    return {
      value: true,
      username: "",
      job: "",
      actions: [{ type: "button", checked: false }],
      mycontlist: [{ tit: "我的代办", val: "" }, { tit: "我的记录", val: "" }]
    };
  },
  created() {
    this.username = this.$root.username;
    this.job = this.$root.job;
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal) {
        this.$message({
          message: "您已经开启消息提示",
          type: "success"
        });
      } else {
        this.$message({
          message: "您已经关闭消息提示",
          type: "warning"
        });
      }
    }
  },
  methods: {
    clickHandler() {
      if (this.actions) {
        this.actions = false;
      } else {
        this.actions = true;
      }
    },
    toChangePasswd() {
      this.$router.push({
        path: "/changePasswd"
      });
    },
    toLogin() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style scope>
.el-switch {
  margin-right: 10px;
}
.tijioa {
  border-radius: 21px;
  height: 42px;
  line-height: 42px;
  width: 74%;
  margin-left: 13%;
  font-size: 14px;
}

.minelist {
  display: flex;
  justify-content: space-between;
  /* margin: 0 20px; */
  padding: 12px 0 12px 15px;
  border-bottom: 1px solid #eee;
}
.my_bef_icon {
  width: 20px;
  vertical-align: middle;
}
.my_titcont {
  height: 220px;
  background: url("../../assets/img/my_top@2x.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.my_icon {
  width: 80px;
  height: 80px;
}
.my_icon img {
  width: 100%;
  height: 100%;
}
.my_name {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-top: 0.18rem;
}
.my_position {
  font-size: 0.86rem;
  color: #fff;
  margin-top: 0.1rem;
}
.my_content {
  padding-left: 0.2rem;
}
.my_cont_list {
  background: url("../../assets/img/dt_yinji_danwei.png") center left no-repeat;
  background-size: 0.34rem auto;
  display: flex;
  justify-content: space-between;
}
.my_rig_jt {
  width: 10px;
  height: 24px;
  margin: 0 16px;
}
</style>
