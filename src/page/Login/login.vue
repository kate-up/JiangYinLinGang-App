<template>
    <div class="loginpg" >
        <div class="shuru_box">
          <!-- 输入 -->
          <div class="input_cont">
              <input v-model="usename" class="inp_sty" placeholder="请输入用户名" />
              <input v-model="password" class="inp_sty" placeholder="请输入您的密码" />
              <div class="wrap">
                <input  type="checkbox" id="checkbox">记住密码
                <label for="checkbox"></label>
              </div>
          </div>
          <!-- 登陆 -->
          <div @click="toMap()" class="login_but">登录</div>
        </div>
    </div>
</template>

<script>
import api from "@/api/api.js";
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      usename: "admin",
      password: ""
    };
  },
  created() {},
  methods: {
    toMap() {
      var that = this;
      if (that.usename == "") {
        alert("请输入用户名");
        return;
      } else if (that.password == "") {
        alert("请输入您的密码");
        return;
      } else {
        api
          .login({
            username: that.usename,
            password: "MTIzNDU2"
          })
          .then(function(res) {
            console.log(res);
            if (res.data.value == 1) {
              that.$router.push({
                path: "/areaMap"
              });
            }
            that.$root.username = res.data.username;
            localStorage["username"] = res.data.username;
            // that.$root.job = res.data.job;
            // localStorage["job"] = res.data.job;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scope>
.touxiang {
  margin: 20px 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.minechange {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  padding: 15px 0;
  border-bottom: 1px solid #999;
}
.inp_sty {
  width: 90%;
  border: 1px solid #eee !important;
  font-size: 18px;
  color: #ccc !important;
  border-radius: 6px;
  padding: 11px 14px;
  margin: 5px 0;
}
.loginpg {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login_bg.png") no-repeat;
  background-size: 100% 100%;
}
.shuru_box {
  text-align: center;
  position: absolute;
  width: 92%;
  background: #fff;
  margin-left: 4%;
  border-radius: 7px;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.06);
  top: 37.5%;
  height: 53.6%;
}
.login_but {
  width: 85%;
  background: url("../../assets/img/login_dl.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 8px;
  text-align: center;
  color: #fff;
  margin: auto;
  height: 45px;
  line-height: 45px;
  margin-top: 5px;
}
.input_cont {
  width: 85%;
  margin: auto;
  padding-top: 28px;
}
.wrap {
  position: relative;
  text-align: left;
  padding-left: 40px;
  font-size: 17px;
  line-height: 33px;
  cursor: pointer;
  margin-top: 12px;
}
.wrap input {
  width: 27px;
  height: 27px;
  position: absolute;
  left: 4px;
}
.inp_sty::-webkit-input-placeholder {
  color: #ccc !important;
}
.inp_sty::-moz-placeholder {
  color: #ccc !important;
}
.inp_sty:-ms-input-placeholder {
  color: #ccc !important;
}
.inp_sty:-moz-placeholder {
  color: #ccc !important;
}
.wrap label {
  position: absolute;
  width: 24px;
  height: 24px;
  border: #999;
  top: 1px;
  left: 5px;
  background: #fff;
}

.wrap input:checked + label {
  background-image: url("../../assets/img/gou@3x.png");
  background-size: 95% 95%;
  background-repeat: no-repeat;
  background-position: center center;
  /* margin-left: 3px; */
}
</style>
