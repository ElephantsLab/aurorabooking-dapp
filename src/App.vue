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
import { mapGetters, mapActions} from "vuex";

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
  methods: {
    ...mapActions(['connectWallet'])
  },
  mounted() {
    this.$root.core = new Core(this);
    if(window.ethereum){
      window.ethereum.on('accountsChanged', this.connectWallet)
    }
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
