<template>
  <record-new />
</template>

<script>
import { ref } from 'vue'
import './index.scss'
import RecordNew from '../../components/record/new.vue'

export default {
  components :{
    'record-new' : RecordNew
  }
}
</script>
