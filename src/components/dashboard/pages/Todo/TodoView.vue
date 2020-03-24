<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-8">
        <b-list-group>
          <b-list-group-item v-for="(todo, index) in todoList"
                            v-bind:key="todo.id"
                            v-bind:index="index"
                            v-bind:data="todo"
                            >
            {{ todo.taskName }} --- {{ todo.taskDescription }}
            <b-button variant="outline-success" @click="editTask(index)">Edit</b-button> |
            <b-button variant="outline-danger" @click="deleteTask(todo.id)">Delete</b-button>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      todo: {},
      todoList: [{}],
    }
  },
  computed: {
    todosFetch: function() {
      return this.$store.getters.todos;
    },
    // ...mapGetters({
    //     todoDataList: 'todos'
    // })
  },
  watch: {
    // '$store.getters.todos': {
    //   handler: function(newVal, oldVal) {
    //     // console.log(newVal, "---", oldVal)
    //     if (newVal && newVal.length != 0) {
    //       this.todoList = newVal;
    //       console.log(this.todoList);
    //     }
    //   },
    //   immediate: true,
    //   deep: true
    // }
    todosFetch(val) {
      if (val) {
        this.todoList = val;
      }
    },
    // todoDataList: {
    //     deep: true,
    //     immediate: true,
    //     handler(nVal, oVal) {
    //       if (!!nVal) {
    //         console.log("data updated")
    //       }
    //       console.log("inputValue", nVal, oVal);
    //     }
    // },
  },
  methods: {
    deleteTask(id) {
      this.$store.dispatch('deleteTask', id);
    },
    editTask(index) {
      const todo = this.$store.getters.todos[index];
      this.$store.dispatch('editTask', todo);
    },
  },
  created() {
    this.$store.dispatch('getTask');
  },
  // mounted() {
  //   this.$store.watch(state => state.todos, () => {
  //     console.log("updated todolist")
  //   })
  // },
}
</script>
