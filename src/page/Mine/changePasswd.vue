<template>
    <div>
        <div class="yhdet_tit">
            <img @click="back()" src="../../assets/img/back_left.png" alt="">
            <div>修改密码</div>
        </div>
        <div class="paswd_bo">
          <div class="changemm">
            <div>原密码</div>
            <input placeholder="请输入原密码">
          </div>
          <div class="changemm">
              <div>新密码</div>
              <input placeholder="请输入新密码">
          </div>
          <div class="changemm">
              <div>确认密码</div>
              <input placeholder="请输入确认密码">
          </div>
        </div>
        <div class="tijioa" style="bottom: 30px;">提交</div>
    </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scope>
.changemm {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.changemm input {
  width: 70%;
  color: #999;
}
.changemm input::-webkit-input-placeholder,
.changemm input:-moz-placeholder,
.changemm input:-ms-input-placeholder {
  color: #999;
}
.paswd_bo {
  background: #fff;
}
.paswd_bo > div + div {
  border-top: 1px solid #eee;
}
</style>
