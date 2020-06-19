<template>
  <div id="app" :style="{height: (screenHeight ) + 'px'}">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    };
  },
  name: "App"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
  background: rgb(242, 242, 242);
}

.fanhui {
  position: absolute;
  left: 0;
  width: 26px;
  padding: 7px;
  margin-left: 10px;
  padding: 7px 11px;
}

input {
  border: none;
  outline: none;
}

.tijioa {
  color: #fff;
  background: #2176ff;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  width: 80%;
  margin-left: 10%;
  position: absolute;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
}
ul {
  list-style: none;
}
.upload_but {
  width: 100%;
  background: #2076ff;
  color: #fff;
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  position: absolute;
  bottom: 0;
}
/* 每个页面的头部标题 */
.yhdet_tit {
  background: #3982f6;
  height: 45px;
  color: #fff;
  line-height: 45px;
  font-size: 16px;
  text-align: center;
}
.yhdet_tit img {
  position: absolute;
  left: 0;
  width: 25px;
  height: 25px;
  margin: 10px;
}

/* 列表的左右间距文字样式 */
.each_zg_tit {
  color: #999;
  flex-basis: 42%;
}
.each_zg_con {
  color: #333;
  flex: 1;
  width: 58%;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* 小星星 着重 */
.each_cont {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 8.59px 0;
  color: #777;
  font-size: 14px;
}
.each_cont img {
  width: 7px;
  height: 7px;
  padding: 2px 5px 2px 10px;
}

.cube-btn {
  font-size: 14px !important;
  padding: 0px !important;
  color: #999 !important;
  width: fit-content !important;
  max-width: 200px !important;
  height: fit-content !important;
  background: transparent !important;
  background-size: 20% 40% !important;
  background-position: center right !important;
  text-overflow: ellipsis !important; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
  white-space: nowrap !important; /*让文字不换行*/
  overflow: hidden !important; /*超出要隐藏*/
}
</style>
