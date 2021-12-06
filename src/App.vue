<template>
  <div id="app">
    <div>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="chinese">
      </el-input>
      <el-slider
        v-model="seSeLevel"
        :max=1
        :step='0.01'>
      </el-slider>
      <el-button @click="YouCanSeSe">Start</el-button>
      <el-input
        type="textarea"
        v-model="yinglish"
        readonly="true">
      </el-input>
    </div>
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
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
