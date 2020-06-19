<template>
    <div style="background:#f8f8f8;">
        <div class="yhdet_tit">
            <img @click="back()" src="../../assets/img/back_left.png" alt="">
            <div>应急事件详情</div>
        </div>
        <div class="bodydiv">
            <div style="background: #Fff;padding:15px 20px;font-size: 17px;">
                <div style="font-weight: bold;padding-bottom: 10px;">江苏江阴西区专职队消防站</div>
                <div style="display:flex;">
                    <div style="color: #4ed3dc;background: #ecfafb;writing-mode:tb-rl;padding: 15px 5px;margin-right: 6px;font-size:13px;">上报人</div>
                    <div style="padding: 0 15px; background: #f9f9f9;display:flex;justify-content: space-around;flex-direction: column;">
                        <div style="display:flex;">
                            <div style="color:#fff;background:#8fbaff;padding: 5px 8px;border-radius: 5px;font-size: 14px;">张</div>
                            <div style="color:#4b8ffd;line-height: 32px;padding-left: 13px;font-size: 15px;">张力</div>
                        </div>
                        <div style="color:#8c8c8c;font-size: 13px;"><img style="margin-right:8px; width: 15px;vertical-align: middle;" src="../../assets/img/dt_jb5.png" />15951267894</div>
                    </div>
                    <div style="color: #5293ff;background: #f4f8ff;writing-mode:tb-rl;padding: 15px 3px;margin: 0 6px;font-size:13px;">事故概况</div>
                    <div style="padding: 0 10px; background: #f9f9f9;display:flex;justify-content: space-around;flex-direction: column;font-size:13px;">
                        <div>事故类型：火灾</div>
                        <div>事故类型：火灾</div>
                        <div>事故类型：火灾</div>
                    </div>
                </div>
                <div style="color: #aeaeae;line-height:30px;font-size: 15px;">发生时间</div>
                <div style="color: #626262;font-size: 14px;">2020-04-09 12:20</div>
                <div style="color: #aeaeae;line-height:30px;font-size: 15px;">事故地点</div>
                <div style="color: #626262;font-size: 14px;">江苏省江阴市临港经济开发区璜土镇石庄花港东路1号</div>
            </div>
            <div style="background:#fff;border-top:1px solid #f1f1f1;padding: 5px 20px;">
                <div style="color: #aeaeae;line-height:30px;font-size: 15px;">情况描述</div>
                <div style="color: #626262;font-size: 14px;">xxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                <div style="color: #aeaeae;line-height:30px;font-size: 15px;">影响范围</div>
                <div style="color: #626262;font-size: 14px;">xxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
            </div>
            <div style="margin-top: 13px;">
                <div style="background: rgb(236, 241, 249);color: rgb(49, 126, 254);border-left: 3px solid rgb(53, 130, 254);padding: 4px 20px;font-weight: bold;">应急处理</div>
                <div style="background:#fff;">
                    <div class="yjcl_list" >
                        <div><img class="redstar" src="../../assets/img/redstar.png" />事故状态</div>
                        <div>受理中<img class="right_jt" src="../../assets/img/right_jt.png" /></div>
                    </div>
                    <div class="yjcl_list">
                        <div><img class="redstar" src="../../assets/img/redstar.png" />处置状态</div>
                        <div>已处置<img class="right_jt" src="../../assets/img/right_jt.png" /></div>
                    </div>
                    <div class="ycqcs">
                        <div><img class="redstar" src="../../assets/img/redstar.png" />已采取措施</div>
                        <textarea v-model="values" name="" id="" rows="3" placeholder="请简述下已采取的措施"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="upload_but">提交并通知</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      values: ""
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
.redstar {
  width: 10px;
  vertical-align: middle;
}
.right_jt {
  width: 17px;
  vertical-align: middle;
}
.yjcl_list {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
}
.ycqcs {
  padding: 10px;
}
textarea {
  border: none;
  width: 94%;
  padding: 3% 0;
  margin: 3%;
  border-top: 1px solid #f1f1f1;
}
textarea:focus {
  outline: none;
}

.bodydiv {
  overflow: scroll;
}
</style>
