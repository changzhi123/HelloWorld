<template>
  <div class="components-container">
    <div class="editor-container">
      <dnd-list :list1="list1" :list2="list2" list1-title="List" list2-title="Article pool" />
    </div>
  </div>
</template>

<script>
import DndList from '@/components/DndList'

export default {
  name: 'DndListDemo',
  components: { DndList },
  data() {
    return {
      list1: [],
      list2: [],
      data:[
        {id:1,author:'fengzi',title:'dasdada'},
         {id:2,author:'fengzi',title:'dasdada'},
          {id:3,author:'fengzi',title:'dasdada'},
           {id:4,author:'fengzi',title:'dasdada'},
            {id:5,author:'fengzi',title:'dasdada'},

      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      
        this.list1 = this.data.splice(0, 2)
        this.list2 = this.data
    }
  }
}
</script>

