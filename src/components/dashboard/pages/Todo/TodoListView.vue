<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          {{ alertMessage }}
        </b-alert>
      </div>
    </div>
    <div class="row"
              v-for="(todo, index) in todoList"
              v-bind:key="todo.id"
              v-bind:index="index"
              v-bind:data="todo">
              <!-- {{todo.id}} -->
      <div class="col-md-12 my-1">
        <article class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-md-10 text-left">
                <!-- Todo - {{todo.id}} -->
                Todo - {{index+1}}
              </div>
              <div class="col-md-1">
                <b-button v-if="todo.isEditForm"
                variant="outline-success" @click="saveTask(todo)">save</b-button>
                <b-button v-else
                variant="outline-success" @click="editTask(index)">edit</b-button>
              </div>
              <div class="col-md-1">
                <b-button v-if="todo.isEditForm"
                variant="outline-warning" @click="editCancel(index)">cancel</b-button>
                <b-button v-else :disabled="!todo.id ? true : false"
                :variant="todo.id ? 'outline-danger' : 'outline-secondary'"
                @click="deleteTask(todo.id)">delete</b-button>
              </div>
            </div>
          </div>
          <div class="card-body text-left">
            <form v-bind:data-unq="'form-'+todo.id" class="login">
              <b-form-group
                :id="'fieldset-task-id-'+index"
              >
                <input type="hidden" name="input-task-id" :value="todo.id">
              </b-form-group>
              <b-form-group
                id="fieldset-task-name"
                label="Task Name"
                label-for="input-task-name"
              >
                <b-form-input
                  v-if="todo.isEditForm"
                  id="input-task-name"
                  trim
                  v-model="todo.taskName"
                  v-bind:name="'task-name-'+todo.id"
                  :value="todo.taskName"
                ></b-form-input>
                <strong v-else>{{todo.taskName}}</strong>
              </b-form-group>
              <b-form-group
                id="fieldset-task-desc"
                label="Task Description"
                label-for="input-task-description"
              >
                <b-form-textarea
                  v-if="todo.isEditForm"
                  id="textarea-default"
                  v-model="todo.taskDescription"
                  placeholder="Default textarea"
                  v-bind:name="'task-description-'+todo.id"
                  :value="todo.taskDescription"
                ></b-form-textarea>
                <strong v-else>{{todo.taskDescription}}</strong>
              </b-form-group>
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
      todoList: [],
      showDismissibleAlert: false,
      alertMessage: "",
    }
  },
  computed: {
    todosFetch: function() {
      return this.$store.getters.todos;
    },
  },
  watch: {
    todosFetch(val) {
      if (val) {
        this.todoList = new Array();
        val.forEach((element, index) => {
          if (element.id || element.id != "") {
            this.todoList.push({
              id: element.id,
              taskName: element.taskName,
              taskDescription: element.taskDescription,
              isEditForm: false
            });
          }
        });
        this.todoList.push({
          id: "",
          taskName: "",
          taskDescription: "",
          isEditForm: false
        });
      }
    },
  },
  methods: {
    deleteTask(id) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteTask', id).then((resp) => {
            this.$swal.fire(
              'Deleted!',
              'Your todo has been deleted.',
              'success'
            );
          }).catch((err) => {
            this.$swal.fire(
              'Failed!',
              'Failed delete todo',
              'error'
            );
          });
        }
      });
    },
    editTask(index) {
      this.todoList.filter((el, idx) => {
        if(idx === index) {
          el.isEditForm = true;
        }
      })
    },
    editCancel(index) {
      this.todoList.filter((el, idx) => {
        if(idx === index) {
          el.isEditForm = false;
        }
      })
    },
    saveTask(data) {
      if (data.id) {
        this.$store.dispatch('updateTask', {todo: {
          taskName: data.taskName,
          taskDescription: data.taskDescription,
        }, id: data.id})
        .catch((err) => {
          this.alertMessage = err;
          this.showDismissibleAlert = true;
        });
      } else {
        this.$store.dispatch('createTask', {
          taskName: data.taskName,
          taskDescription: data.taskDescription,
        })
        .catch((err) => {
          this.alertMessage = err;
          this.showDismissibleAlert = true;
        });
      }
    }
  },
  created() {
    this.$store.dispatch('getTask');
  },
}
</script>
