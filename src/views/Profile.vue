<template>
  <div>
    <h2>Profile</h2>
    <h3 v-if="userDataGetter.isConnected">Your address: {{ userDataGetter.address }}</h3>
    <h3 v-else>Connect your wallet...</h3>
    <div>
      <h2>Yours books</h2>
      <table class="user-book" v-if="getUserOrders">
        <tr>
          <td v-for="(order, index) in getUserOrders" v-bind:key="index">
            <div v-on:click="openSellModal(order)">
              <h3>{{ getPlaceName(order.placeId) }}</h3>
              <h3>Table {{ order.tableNumber }}</h3>
              <h3>Date {{ order.date }}</h3>
              <img :src="getUserQrList[index]">
            </div>
            <button class="btn btn-primary">Transfer</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import config from "../assets/config.json";

export default {
  computed: mapGetters(["userDataGetter", "getUserOrders", "getUserQrList"]),
  methods: {
    ...mapMutations(["updateUserData", "updateIsOpenSellModal", "updateModalSellDataToProcess"]),
    ...mapActions(["fetchUserOrders", "getUserQrCodes"]),
    getPlaceName(placeId) {
      for (let place of config.RESTAURANTS) {
        if (place.ID === placeId) return place.NAME;
      }
    },
    openSellModal(sellData) {
      this.updateIsOpenSellModal(true);
      this.updateModalSellDataToProcess({placeName: this.getPlaceName(sellData.placeId), placeId: sellData.placeId, nftId: sellData.nftId, tableNumber: sellData.tableNumber, date: sellData.date, orderId: sellData.orderId});
    },
    updateProfileData() {
      const userAddress = window.localStorage.getItem("address");
      if (userAddress) {
        this.updateUserData({address: userAddress, isConnected: true});
        this.fetchUserOrders({address: userAddress});
      }
    }
  },
 
  mounted() {
    this.updateProfileData();
    
    setInterval(() => {
      this.updateProfileData();

    }, 2000);
  }
}
</script>

<style scoped>
.user-book {
  border: 1px solid black;
}
</style>