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
  methods: {},
  mounted() {
    this.$store.dispatch('getTask');
  }
}
</script>
