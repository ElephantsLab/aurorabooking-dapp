<template>
  <div id="app">
    <Header />
    <BookTableModal v-if="isOpenBookModalGetter" />
    <SetOnSellModal v-if="isOpenSellModalGetter" />
    <router-view class="wrapper-main" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Core from "./core/core";
import BookTableModal from "./components/modalWoidows/BookTableModal";
import SetOnSellModal from "./components/modalWoidows/SetOnSellModal";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    SetOnSellModal,
    Header,
    BookTableModal,
  },
  computed: mapGetters([
    "isOpenBookModalGetter",
    "isOpenSellModalGetter",
    "userDataGetter",
  ]),
  mounted() {
    this.$root.core = new Core(this);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #b0b2b6;
}
</style>
