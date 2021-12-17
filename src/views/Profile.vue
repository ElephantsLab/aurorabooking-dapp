<template>
  <div>
    <div class="container">
      <div class="section-title">Profile</div>
      <div class="section-describe">
        Yours books
      </div>
    </div>
    
    <div class="container-content">
      <div class="container">
        <div class="wrapper-cards">
          <div
            class="card card-profile"

          >
            <div class="card-header">
              <!-- One / two / three / four / five -->
              <div class="card-stars three" >
                <i class="i-star-fill"> </i>
                <i class="i-star-fill"> </i>
                <i class="i-star-fill"> </i>
                <i class="i-star-fill"> </i>
                <i class="i-star-fill"> </i>
              </div>
               <img  src="@/assets/images/cardImage1.png" alt="" />       
            </div>
            <div class="card-content">
              <a href="" class="card-name"> restaurant.NAME </a>
              <div class="card-describe">
                <span> restaurant.TOWN</span>

              </div>
              <div class="date">
                <i class="i-calendar-event-line"></i>
                <span>12 December 2021</span>
              </div>
            </div>
            <div class="card-footer">
              <button  class="btn card-btn card-btn-border" v-on:click="openBookModal(restaurant)">
                <i class="i-price-tag-2-line"></i>
                <span>Sell</span>
              </button>
              <button  class="btn card-btn card-btn-border" v-on:click="openBookModal(restaurant)">
                <i class="i-arrow-left-right-line"></i>
                <span>Transfer</span>
              </button>
              <button  class="btn card-btn card-btn-border" v-on:click="openBookModal(restaurant)">
                <i class="i-shopping-cart-2-line"></i>
                <span>Buy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3 v-if="userDataGetter.isConnected">Your address: {{ userDataGetter.address }}</h3>
    <h3 v-else>Connect your wallet...</h3>
    <div>
      <!-- <h2>Yours books</h2> -->
      <table class="user-book" v-if="getUserOrders">
        <tr>
          <td v-for="(order, index) in getUserOrders" v-bind:key="index">
            <div v-on:click="openSellModal(order)">
              <h3>{{ getPlaceName(order.placeId) }}</h3>
              <h3>Table {{ order.tableNumber }}</h3>
              <h3>Date {{ order.date }}</h3>
              <img :src="getUserQrList[index]" />
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
    ...mapMutations([
      "updateUserData",
      "updateIsOpenSellModal",
      "updateModalSellDataToProcess",
    ]),
    ...mapActions(["fetchUserOrders", "getUserQrCodes"]),
    getPlaceName(placeId) {
      for (let place of config.RESTAURANTS) {
        if (place.ID === placeId) return place.NAME;
      }
    },
    openSellModal(sellData) {
      this.updateIsOpenSellModal(true);
      this.updateModalSellDataToProcess({
        placeName: this.getPlaceName(sellData.placeId),
        placeId: sellData.placeId,
        nftId: sellData.nftId,
        tableNumber: sellData.tableNumber,
        date: sellData.date,
        orderId: sellData.orderId,
      });
    },
    updateProfileData() {
      const userAddress = window.localStorage.getItem("address");
      if (userAddress) {
        this.updateUserData({ address: userAddress, isConnected: true });
        this.fetchUserOrders({ address: userAddress });
      }
    },
  },

  mounted() {
    this.updateProfileData();

    setInterval(() => {
      this.updateProfileData();
    }, 2000);
  },
};
</script>

<style scoped>
.user-book {
  border: 1px solid black;
}
</style>
