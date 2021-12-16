<template>
  <div>
    <h2>Profile</h2>
    <h3 v-if="userDataGetter.isConnected">Your address: {{ userDataGetter.address }}</h3>
    <h3 v-else>Connect your wallet...</h3>
    <div>
      <h2>Yours books</h2>
      <table class="user-book">
        <tr>
          <td>
            <div v-on:click="updateIsOpenSellModal(true)">
              <h3>Place</h3>
              <h3>Table</h3>
              <h3>Date</h3>
            </div>
            <button>Transfer</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: mapGetters(["userDataGetter"]),
  methods: mapMutations(["updateUserData", "updateIsOpenSellModal"]),
  mounted() {
    const userAddress = window.localStorage.getItem("address");
    if (userAddress) this.updateUserData({address: userAddress, isConnected: true});
  }
}
</script>

<style scoped>
.user-book {
  border: 1px solid black;
}
</style>