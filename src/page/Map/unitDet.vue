<template>
    <div style="background: #f8f8f8">
        <div class="yhdet_tit">
            <img @click="back()" src="../../assets/img/back_left.png" alt="">
            <div>应急单位详情</div>
        </div>
        <div style="background: #Fff;padding:15px 20px 15px;font-size: 17px;">
            <div style="font-weight: bold;padding-bottom: 10px;">江苏江阴西区专职队消防站</div>
            <div style="display:flex;">
                <div style="color: #5293ff;background: #f4f8ff;writing-mode:tb-rl;padding: 15px 5px;margin-right: 6px;">联系人</div>
                <div style="padding: 0 20px; background: #f9f9f9;display:flex;justify-content: space-around;flex-direction: column;">
                    <div style="display:flex;">
                        <div style="color:#fff;background:#8fbaff;padding: 5px 8px;border-radius: 5px;">张</div>
                        <div style="color:#4b8ffd;line-height: 32px;padding-left: 13px;">张力</div>
                    </div>
                    <div style="color:#8c8c8c;font-size: 14px;font-weight:bold;"><img style="margin-right:8px; width: 15px;vertical-align: middle;" src="../../assets/img/dt_jb5.png" />15951267894</div>
                </div>
            </div>
            <div style="color: #aeaeae;line-height:34px;">企业地址</div>
            <div style="color: #626262;font-weight: bold;font-size: 16px;">江苏省江阴市临港经济开发区璜土镇石庄花港东路</div>
        </div>
        <!-- <div style="margin-top: 20px;">
            <div style="background: rgb(236, 241, 249);color: rgb(49, 126, 254);border-left: 3px solid rgb(53, 130, 254);padding: 4px 20px;font-weight: bold;">应急车辆</div>
            <table class="car_table" style="border-collapse: collapse;width:100%;text-align:center;background:#fff;">
                <thead style="color:#8d8d8d;">
                    <tr>
                        <td>序号</td>
                        <td>车牌号码</td>
                        <td>状态</td>
                    </tr>
                </thead>
                <tbody style="color:#444;">
                    <tr v-for="(item, index) in carList" :key="index">
                        <td>{{index + 1}}</td>
                        <td>{{item.car}}</td>
                        <td :class="item.state == 0 ? 'green' : 'red'">{{item.state == 0 ? "正常" : "异常"}}</td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      carList: [
        { car: "苏BL03X9", state: 0 },
        { car: "苏BL03X9", state: 0 },
        { car: "苏BL03X9", state: 1 }
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scope>
.green {
  color: #5ace8b;
}
.red {
  color: #f47d56;
}
.car_table td {
  border-bottom: 1px solid #f8f8f8;
  padding: 10px 0;
}
</style>
