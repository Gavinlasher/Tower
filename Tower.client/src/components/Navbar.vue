<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <h2>T<i class="mdi mdi-snapchat"></i>wer</h2>
    </router-link>
    <button
      type="button"
      class="btn btn-dark text-light"
      data-bs-toggle="modal"
      data-bs-target="#create-event"
    >
      Create Event
    </button>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li></li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
    <Modal id="create-event">
      <template #title> Create Event</template>
      <template #body><CreateEvent /></template>
    </Modal>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
h2 {
  color: rgb(214, 195, 85);
}
i {
  background-color: hsla(0, 0%, 100%, 0.507);
  border-radius: 50%;
  height: 5vh;
  width: 5vh;
}
</style>
