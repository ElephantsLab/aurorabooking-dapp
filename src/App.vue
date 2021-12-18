<template>
  <div id="app">
    <Header />
    <BookTableModal v-if="isOpenBookModalGetter" />
    <SetOnSellModal v-if="isOpenSellModalGetter" />
    <TransferModal v-if="getIsOpenTransferModal" />
    <router-view class="wrapper-main" />
    <transaction-status
        v-if="getTransactionModalIsOpen"
        :showSuccess="getSuccessMessage"
        :showPending="getPendingMessage"
        :showFail="getFailMessage"
    />
  </div>
</template>

<script>
import Header from "./components/Header";
import Core from "./core/core";
import BookTableModal from "./components/modalWoidows/BookTableModal";
import SetOnSellModal from "./components/modalWoidows/SetOnSellModal";
import TransferModal from "./components/modalWoidows/TransferModal";
import TransactionStatus from "./components/modalWoidows/TransactionStatus";
import { mapGetters, mapActions} from "vuex";

export default {
  name: "App",
  components: {
    SetOnSellModal,
    Header,
    BookTableModal,
    TransferModal,
    TransactionStatus
  },
  computed: mapGetters([
    "isOpenBookModalGetter",
    "isOpenSellModalGetter",
    "userDataGetter",
    "getSuccessMessage",
    "getPendingMessage",
    "getFailMessage",
    "getTransactionModalIsOpen",
    "getIsOpenTransferModal"
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
