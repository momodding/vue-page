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
                id="fieldset-task-id"
              >
                <input type="hidden" name="input-task-id" :value="taskId">
              </b-form-group>
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
              <b-button
                v-if="!isEdit"
                variant="outline-primary"
                type="submit">Create Task!</b-button>

              <b-button
                v-if="isEdit"
                variant="outline-primary"
                type="submit">Update Task!</b-button>
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
      taskId: null,
      taskName: "",
      taskDescription: "",
      showDismissibleAlert: false,
      alertMessage: "",
      isEdit: false,
    }
  },
  computed: {
    setTask() {
      return this.$store.getters.todo;
    },
  },
  watch: {
    setTask(val) {
      if (val && val.length != 0) {
        this.taskId = val.id;
        this.taskName = val.taskName;
        this.taskDescription = val.taskDescription;
        this.isEdit = true;
      }
    },
  },
  methods: {
    createTodo() {
      if (this.taskId) {
        this.$store.dispatch('updateTask', {todo: {
          taskName: this.taskName,
          taskDescription: this.taskDescription,
        }, id: parseInt(this.taskId)})
        .then((resp) => {
          this.taskId = null;
          this.taskName = "";
          this.taskDescription = "";
          this.isEdit = false;
        })
        .catch((err) => {
          this.alertMessage = err;
          this.showDismissibleAlert = true;
        });
      } else {
        this.$store.dispatch('createTask', {
          taskName: this.taskName,
          taskDescription: this.taskDescription,
        })
        .then((resp) => {
          this.taskName = "";
          this.taskDescription = "";
        })
        .catch((err) => {
          this.alertMessage = err;
          this.showDismissibleAlert = true;
        });
      }
    },
  },
}
</script>
