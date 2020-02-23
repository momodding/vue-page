<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-8">
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          {{ alertMessage }}
        </b-alert>
        <article class="card mx-auto">
          <div class="card-header">
            <h1>Todo Page</h1>
          </div>
          <div class="card-body">
            <form class="login" @submit.prevent="createTodo">
              <b-form-group
                id="fieldset-task-name"
                label="Enter your Task Name"
                label-for="input-task-name"
              >
                <b-form-input
                  id="input-task-name"
                  v-model="taskName"
                  trim
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="fieldset-task-desc"
                label="Enter your Task Description"
                label-for="input-task-description"
              >
                <b-form-textarea
                  id="textarea-default"
                  placeholder="Default textarea"
                  v-model="taskDescription"
                ></b-form-textarea>
              </b-form-group>
              <b-button variant="outline-primary" type="submit">Create Task!</b-button>
            </form>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      taskName: "",
      taskDescription: "",
      showDismissibleAlert: false,
      alertMessage: "",
    }
  },
  computed: {
    setTaskName() {
      return this.taskName;
    },
    setTaskDescription() {
      return this.taskDescription;
    }
  },
  methods: {
    createTodo() {
      this.$store.dispatch('createTask', {
        taskName: this.taskName,
        taskDescription: this.taskDescription,
      })
      .then((resp) => {
        this.taskName = ''
        this.taskDescription = ""
      })
      .catch((err) => {
        this.alertMessage = err;
        this.showDismissibleAlert = true;
      });
    },
  },
}
</script>
