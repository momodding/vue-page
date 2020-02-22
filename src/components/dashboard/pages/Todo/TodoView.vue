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
      todoList: [],
    }
  },
  computed: {
    todosFetch() {
      return this.$store.getters.todos;
    },
  },
  watch: {
    todosFetch(val) {
      console.log(val);
      this.todoList.push(this.$store.getters.todo);
      if (val) {
        console.log(todoList);
      }
    },
  },
  methods: {
    getTodoList() {
      this.$store.dispatch('getTask')
      .then((resp) => {
        this.todoList = resp;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getTodoList();
  }
}
</script>
