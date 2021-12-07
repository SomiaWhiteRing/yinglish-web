<template>
  <div id="app" style="max-width:800px;margin:0 auto">
    <el-row>
      <el-col style="font-weight:400;font-size:28px;text-align:center;margin-bottom:10px">
        淫语翻译机
      </el-col>
      <el-col>
        <el-input
          type="textarea"
          placeholder="这里可以输入正经的内容"
          v-model="chinese">
        </el-input>
      </el-col>
      <el-col style="padding:10px 0">
        <el-slider
          v-model="seSeLevel"
          :max=1
          :step='0.01'
          :format-tooltip="formatTooltip"
          style="float: left;width: 70%;margin: 0 20px">
        </el-slider>
        <el-button @click="YouCanSeSe" style="float: right;">翻译</el-button>
      </el-col>
      <el-col>
        <el-input
          type="textarea"
          v-model="yinglish"
          placeholder="这里会翻译出来色色的内容"
          readonly="true">
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chinese: undefined,
      yinglish: undefined,
      seSeLevel: 0.5
    }
  },
  methods: {
    YouCanSeSe(){
      let seSe = ''
      let yinglish = ''
      let level = this.seSeLevel
      call_jieba_cut(this.chinese, function (a) {
        seSe = a
      });
      for(let i of seSe){
        yinglish += this.chs2yin(i,level)
      }
      this.yinglish = yinglish
    },
    chs2yin(i,level){
      if(Math.random() > level) return i
      if(i === '，' || i === '。') return '……'
      if(i === '!' || i === '！') return '❤'
      if(i.length > 1 && Math.random() < 0.5){
          return (i[0] + '……' + i)
      }else if(Math.random() < 0.5){
        let b = ''
        for (let n = 0; n < i.length; n++) {
          b += '〇'
        }
        return b
      }
      return i
    },
    formatTooltip(val) {
      return `淫乱度：${val}`
    }
  }
}
</script>
