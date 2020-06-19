<template>
    <div :style="{height: screenHeight + 'px'}" style="overflow:hidden;">
        <div id="yhdet_tit" class="yhdet_tit">消息</div>
        <div id="msg_tuidong">
          <img style="width: 50px;" src="../../assets/img/img_message@3x.png" alt="">
          <div class="tuisong_msg">
            <div class="msg_tit">允许推送通知</div>
            <div class="msg_smtit">第一时间接受服务和活动提醒</div>
          </div>
          <img @click="closeTS()" class="msg_close" src="../../assets/img/close@3x.png" alt="">
          <div @click="openMsg()" class="kaiqi">开启</div>
        </div>
        <div id="msg_lists" class="msg_lists" :style="{height: scrernHeight + 'px'}">
          <div class="msg_listfor" v-for="(item, index) in msgList" :key="index">
              <div class="msg_each_box">
                <div style="width:15%">
                  <img class="iconimg" v-if="item.type == 0" src="../../assets/img/yujing@3x.png" />
                  <img class="iconimg" v-else src="../../assets/img/yingji@3x.png" />
                </div>
                <div style="width:60%;">
                  <div class="msg_tit">{{item.title ? item.title : "标题"}}</div>
                  <div class="msg_smtit">{{item.content}}</div>
                </div>
                <div class="msg_smtit" style="width:25%;line-height: 45px;font-size: 13px;text-align: right;">{{item.time}}</div>
              </div>
          </div>
        </div>
        <TabBar :idx = 2 />
    </div>
</template>

<script>
import TabBar from "@/components/TabBar";
import notice from "@/assets/img/notice.png";
import warning from "@/assets/img/warning.png";
import api from "@/api/api.js";
export default {
  components: { TabBar },
  data() {
    return {
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      msgList: [],
      titHeig: "",
      isopen: "",
      scrernHeight: ""
    };
  },
  created() {
    var that = this;
    api
      .findMsgList()
      .then(function(res) {
        if (res.data.result == "SUCESS") {
          that.msgList = res.data.msgList;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  mounted() {
    var that = this;
    that.$nextTick(function() {
      that.titHeig = document.getElementById("yhdet_tit").clientHeight;
      that.isopen = document.getElementById("msg_tuidong").clientHeight;
      that.scrernHeight = that.screenHeight - that.titHeig - that.isopen - 47;
    });
  },
  methods: {
    closeTS() {
      document.getElementById("msg_tuidong").style.display = "none";
      document.getElementById("msg_lists").style.paddingTop = "45";
      this.scrernHeight = this.screenHeight - this.titHeig - 47;
    },
    openMsg() {
      this.$message({
        message: "您已经开启消息推送",
        type: "success"
      });
    }
  }
};
</script>

<style scope>
.iconimg {
  width: 25px;
  padding: 10px;
}
.kaiqi {
  background: rgb(33, 118, 255);
  border-radius: 11px;
  color: rgb(255, 255, 255);
  width: 62px;
  height: 22px;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  position: absolute;
  right: 30px;
  top: 80px;
}
.msg_close {
  position: absolute;
  right: 10px;
  width: 15px;
  height: 15px;
  top: 50px;
}
.msg_tit {
  font-size: 15px;
  font-weight: bold;
  line-height: 29px;
}
.msg_smtit {
  font-size: 12px;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#msg_tuidong {
  height: fit-content;
  background: #fff;
  /* padding: 50px 13px 15px 0; */
  padding: 5px 13px 15px 0;
  display: flex;
  margin-bottom: 8px;
}
.tuisong_msg {
  padding: 10px 0 0 15px;
  line-height: 22px;
}
.msg_lists {
  /* margin: 0 0 47px 0; */
  padding-bottom: 47px;
  background: #fff;
  overflow-y: scroll;
}
.msg_listfor {
  padding: 0 20px;
  border-bottom: 1px solid #eee;
}
.msg_each_box {
  height: 45px;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
}
/* .yhdet_tit {
  position: fixed;
  width: 100%;
} */
</style>
