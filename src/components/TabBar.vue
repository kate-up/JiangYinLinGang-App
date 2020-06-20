<template>
    <div class="bott_bar">
        <div @click="toPage(item.push, item.name)" v-for="(item, index) in bars" :key="index" style="text-align:center;width: 25%;">
            <img :src="index == idx ? item.icon : item.seledicon" alt="" style="width: 22px;height:22px;margin-top:3px">
            <div style="font-size:12px;line-height: 13px;" :class="index == idx ? 'seledcol' : ''">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["idx"],
  data() {
    return {
      job: "",
      bars: [
        {
          name: "地图",
          push: "/areaMap",
          icon: require("../assets/img/tab_dt.png"),
          seledicon: require("../assets/img/map.png")
        },
        {
          name: "工作",
          push: "/work/",
          icon: require("../assets/img/tab_work.png"),
          seledicon: require("../assets/img/work.png")
        },
        {
          name: "消息",
          push: "/message",
          icon: require("../assets/img/tab_mesg.png"),
          seledicon: require("../assets/img/message.png")
        },
        {
          name: "我的",
          push: "/mine",
          icon: require("../assets/img/tab_mine.png"),
          seledicon: require("../assets/img/mine.png")
        }
      ]
    };
  },
  created() {
    this.job = this.$root.job;
  },
  methods: {
    toPage(path, name) {
      if (name == "工作") {
        if (this.job == 0) {
          this.$router.push({
            path: path + "worker"
          });
        } else if (this.job == 1) {
          this.$router.push({
            path: path + "leader"
          });
        }
      } else {
        this.$router.push({
          path: path
        });
      }
    }
  }
};
</script>

<style scope>
.bott_bar {
  width: 100%;
  height: 46px;
  position: fixed;
  bottom: 0;
  font-size: 12px;
  background: #fff;
  color: #777;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ddd;
}
.seledcol {
  color: #3396fc;
}
</style>
