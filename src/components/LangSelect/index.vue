<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon  icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language=='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language=='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import i18n from '@/i18n/i18n' 
import {reminder} from '@/utils/method'
import{ setlang} from '@/utils/auth'
export default {
  computed: {
    language() {
      return this.$i18n.locale
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      setlang(lang)//保存
      reminder(i18n.t('method.Language switch successful')+'！')
    }
  }
}
</script>


