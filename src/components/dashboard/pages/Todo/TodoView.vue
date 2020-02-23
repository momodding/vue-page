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
export default {
  data() {
    return {
      todo: {},
      todoList: [{}],
    }
  },
  computed: {
    todosFetch() {
      return this.$store.getters.todos;
    },
  },
  watch: {
    todosFetch(val) {
      if (val && val.length != 0) {
        this.todoList = val;
      }
    },
  },
  methods: {
    deleteTask(id) {
      this.$store.dispatch('deleteTask', id);
    },
    editTask(index) {
      const todo = this.$store.getters.todos[index];
      console.log(todo);
      this.$store.dispatch('editTask', todo.taskName, todo.taskDescription);
    },
  },
  mounted() {
    this.$store.dispatch('getTask');
  }
}
</script>
