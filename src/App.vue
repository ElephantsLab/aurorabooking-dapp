<template>
  <div id="app">
    <Header/>
    <router-view/>
    <BookTableModal v-if="isOpenBookModalGetter"/>
  </div>
</template>

<script>
import Header from "./components/Header";
import BookTableModal from "./components/modalWoidows/BookTableModal";
import { mapGetters } from "vuex";

export default {
  name: 'App',
  components: {
    Header,
    BookTableModal
  },
  computed: mapGetters(["isOpenBookModalGetter"])
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
