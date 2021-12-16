<template>
  <div id="app">
    <Header/>
    <router-view/>
    <BookTableModal v-if="isOpenBookModalGetter"/>
    <SetOnSellModal v-if="isOpenSellModalGetter"/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Core from "./core/core";
import BookTableModal from "./components/modalWoidows/BookTableModal";
import SetOnSellModal from "./components/modalWoidows/SetOnSellModal";
import { mapGetters } from "vuex";

export default {
  name: 'App',
  components: {
    SetOnSellModal,
    Header,
    BookTableModal
  },
  computed: mapGetters(["isOpenBookModalGetter", "isOpenSellModalGetter", "userDataGetter"]),
  mounted() {
    this.$root.core = new Core(this);
  }
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
