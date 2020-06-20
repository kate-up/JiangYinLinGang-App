import request from './http_dev'

export default {

  // 登录
  login(data) {
    return request({
      url: '/app/ssmlogin/checkLogin.ajax',
      method: 'post',
      title: '登录',
      params: data
    })
  },
  // 消息
  findMsgList(data) {
    return request({
      url: '/ssm/ssmAlarmMst/findMsgList.ajax',
      method: 'post',
      title: '消息',
      params: data
    })
  },
  // 加载企业边界 
  loadEntprBoundary(data) {
    return request({
      url: '/ssm/ssmEntprBasicInfo/boundaryGeo.ajax',
      method: 'post',
      title: '企业边界',
      params: data
    })
  },
  // 加载企业点
  geo(data) {
    return request({
      url: 'ssm/ssmEntprBasicInfo/geo.ajax',
      method: 'post',
      title: '企业点',
      params: data
    })
  },
  // 地图 - 企业 - 危险化学品
  findWxhxpList(data) {
    return request({
      url: '/ssm/ssmChemical/findWxhxpList.ajax',
      method: 'post',
      title: '危险化学品',
      params: data
    })
  },
  // 地图 - 企业 - 危险化工工艺信息
  findWxhggzList(data) {
    return request({
      url: '/ssm/ssmChemicalProcess/findWxhggzList.ajax',
      method: 'post',
      title: '危险化工工艺信息',
      params: data
    })
  },
  // 地图 - 企业 - 人员信息
  findRYXXLIST(data) {
    return request({
      url: '/ssm/ssmEnterprise/findRYXXLIST.ajax',
      method: 'post',
      title: '人员信息',
      params: data
    })
  },
  // 地图 - 企业 - 基本信息
  findJBXXLIST(data) {
    return request({
      url: '/ssm/ssmEntprBasicInfo/findJBXXLIST.ajax',
      method: 'post',
      title: '基本信息',
      params: data
    })
  },
  // 地图 - 企业 - 重大危险源
  findZDWXYLIST(data) {
    return request({
      url: '/ssm/ssmMajorHazard/findZDWXYLIST.ajax',
      method: 'post',
      title: '重大危险源',
      params: data
    })
  },
  // 地图 - 企业 - 特种作业
  findTzzyList(data) {
    return request({
      url: '/ssm/ssmSpecialOperation/findTzzyList.ajax',
      method: 'post',
      title: '特种作业',
      params: data
    })
  },
  // 工作 - leader - 隐患记录
  findYhjlLists(data) {
    return request({
      url: '/ssm/ssmHiddendangersModify/findYhjlLists.ajax',
      method: 'post',
      title: '隐患记录',
      params: data
    })
  },
  // 工作 - leader - 隐患记录详情
  findYhjlListsDet(data) {
    return request({
      url: '/ssm/ssmHiddendangersModify/findYhjlListsDet.ajax',
      method: 'post',
      title: '隐患记录详情',
      params: data
    })
  },
  // 工作 - leader - 隐患记录详情
  findyhjlleadListsDet(data) {
    return request({
      url: '/ssm/ssmHiddendangersModify/findWzgListsDet.ajax',
      method: 'post',
      title: '预警信息',
      params: data
    })
  },
  // 工作 - 本月预警信息统计
  findBYYJXX(data) {
    return request({
      url: '/ssm/ssmAlarmMst/findBYYJXX.ajax',
      method: 'post',
      title: '预警信息',
      params: data
    })
  },

  // 工作 - 本月预警信息详情
  findWzgListsDet(data) {
    return request({
      url: '/ssm/ssmAlarmMst/findWzgListsDet.ajax',
      method: 'post',
      title: '预警信息详情',
      params: data
    })
  },
  // 工作 - 本月预警信息详情-提交
  findYJTJ(data) {
    return request({
      url: '/ssm/ssmAlarmMst/findYJTJ.ajax',
      method: 'post',
      title: '预警信息详情提交',
      params: data
    })
  },
  // 工作 - leader - 应急事件详情
  findYjsjListsDet(data) {
    return request({
      url: '/ssm/ssmEvents/findWzgListsDet.ajax',
      method: 'post',
      title: '应急事件详情',
      params: data
    })
  },
  // 工作 - worker - 应急事件
  findYJSJSB(data) {
    return request({
      url: '/ssm/ssmEvents/findYJSJSB.ajax',
      method: 'post',
      title: '应急事件',
      params: data
    })
  },
  // 工作 - worker - 应急事件详情
  findYJXQ(data) {
    return request({
      url: '/ssm/ssmEvents/findYJXQ.ajax',
      method: 'post',
      title: '应急事件',
      params: data
    })
  },
  // 工作 - worker - 我的上报信息 - 隐患记录 - 列表
  findYHLIST(data) {
    return request({
      url: '/ssm/ssmHiddendangersModify/findYHLIST.ajax',
      method: 'post',
      title: '我的上报信息隐患记录列表',
      params: data
    })
  },
  // 工作 - worker - 我的上报信息 - 隐患记录 - 详情
  findYHXQ(data) {
    return request({
      url: '/ssm/ssmHiddendangersModify/findYHXQ.ajax',
      method: 'post',
      title: '我的上报信息隐患记录详情',
      params: data
    })
  },
  // 工作 - worker - 我的上报信息 - 应急事件 - 列表
  findYJSJLIST(data) {
    return request({
      url: '/ssm/ssmEvents/findYJSJLIST.ajax',
      method: 'post',
      title: '我的上报信息应急事件',
      params: data
    })
  },
  // 工作 - worker - 我的上报信息 - 应急事件 - 详情 提交上报
  findYJXQSEND(data) {
    return request({
      url: '/ssm/ssmEvents/findYJXQSEND.ajax',
      method: 'post',
      title: '我的上报信息应急事件详情提交上报',
      params: data
    })
  },
  // 工作 - worker - 我的上报信息 - 应急事件 - 详情 下拉框切换值
  findSJANDCZSTATE(data) {
    return request({
      url: '/ssm/ssmEvents/findSJANDCZSTATE.ajax',
      method: 'post',
      title: '我的上报信息应急事件详情下拉框切换值',
      params: data
    })
  },
  // 工作 - worker - 常用功能 - 隐患上报 - 提交
  findYHSB(data) {
    return request({
      url: '/ssm/ssmDangersTroubleshoot/findYHSB.ajax',
      method: 'post',
      title: '常用功能隐患上报',
      params: data
    })
  },
  // 工作 - worker - 常用功能 - 隐患上报 - 下拉选项
  findAllComp(data) {
    return request({
      url: '/ssm/ssmEvents/findAllComp.ajax',
      method: 'post',
      title: '常用功能隐患上报下拉选项',
      params: data
    })
  },
  // 工作 - worker的index页面数据
  findWORKINDEX(data) {
    return request({
      url: '/ssm/ssmAlarmMst/findWORKINDEX.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },

  // 工作 - leader - echarts报警信息统计
  findEchartsBJXX(data) {
    return request({
      url: '/ssm/ssmAlarmMst/findEchartsBJXX.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },
  // 工作 - leader - echarts本月危化品进出数量
  findwhpjcount(data) {
    return request({
      url: '/ssm/ssmIndex/findwhpjcount.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },
  // 工作 - leader - echarts本月危化品进出数量
  findwhpccount(data) {
    return request({
      url: '/ssm/ssmIndex/findwhpccount.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },
  // 工作 - leader - echarts隐患排查整改
  findDTSCount(data) {
    return request({
      url: '/ssm/ssmAlarmMst/findEchartsYHPCZG.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },
  // 工作 - leader - index页面数据
  findLeaderIndex(data) {
    return request({
      url: '/ssm/ssmEntprBasicInfo/findLeaderIndex.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },
  // 地图-查询所有 应急事件
  ssmEventsgeo(data) {
    return request({
      url: '/ssm/ssmEvents/geo.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },
  // 地图-查询所有 应急单位
  findYJDWList(data) {
    return request({
      url: '/ssm/ssmKeyUnit/findYJDWList.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },
  // 地图-查询所有  应急物资
  suppliesgeo(data) {
    return request({
      url: '/ssm/ssmEmergencySupplies/geo.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },
  // 地图-查询所有  防护目标
  keyProtectgeo(data) {
    return request({
      url: '/ssm/keyProtect/geo.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },
  // 员工 - 应急事件上报-获取下拉框
  findYJSJSBSelect(data) {
    return request({
      url: '/ssm/ssmEvents/findYJSJSBSelect.ajax',
      method: 'post',
      title: '工作页面数据',
      params: data
    })
  },
}
