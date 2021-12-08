<template>
  <div id="app" style="max-width:800px;margin:0 auto">
    <el-row>
      <el-col style="font-weight:400;font-size:28px;text-align:center;margin-bottom:10px">
        淫语翻译机
        <a href="https://github.com/SomiaWhiteRing/yinglish-web">
          <svg height="28" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true">
            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </a>
      </el-col>
      <el-col>
        <el-input
          type="textarea"
          placeholder="这里可以输入正经的内容"
          v-model="chinese"
          autosize>
        </el-input>
      </el-col>
      <el-col style="padding:10px 0">
        <el-slider
          v-model="seSeLevel"
          :max=1
          :step='0.01'
          :format-tooltip="formatTooltip"
          style="float: left;width: 70%">
        </el-slider>
        <el-button
        @click="YouCanSeSe"
        style="float: right;"
        :loading="loading">翻译</el-button>
      </el-col>
      <el-col>
        <el-input
          type="textarea"
          v-model="yinglish"
          placeholder="这里会翻译出来色色的内容"
          readonly="true"
          autosize>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      chinese: undefined,
      yinglish: undefined,
      seSeLevel: 0.5,
      loading: false
    }
  },
  methods: {
    YouCanSeSe(){
      let level = this.seSeLevel
      this.loading = true
      this.$http({
        url: 'https://yinglish-web-back-somiawhitering.vercel.app/api/translate',
        method: "get",
        crossdomain: true,
        params: {
          res: this.chinese,
          level: level
        }
      }).then(res => {
        this.yinglish = res.data.msg
        this.loading = false
      }).catch(() => {
        this.$notify.error({
          title: '请求接口失败',
          message: '请稍后再试'
        });
        this.loading = false
      })
    },
    formatTooltip(val) {
      return `淫乱度：${val}`
    }
  }
}
</script>
