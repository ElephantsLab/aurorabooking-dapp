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
          <div v-for="(order, index) in getUserOrders" :key="index" 
            class="card card-profile "

          >
            <div class="card-header">
              <!-- One / two / three / four / five -->
              <div class="card-stars three" v-bind:class="getPlaceStars(order.placeId)">
                <i class="i-star-fill"> </i>
                <i class="i-star-fill"> </i>
                <i class="i-star-fill"> </i>
                <i class="i-star-fill"> </i>
                <i class="i-star-fill"> </i>
              </div>
               <img @click='openSellModal(order)' v-bind:src="getPlaceImage(order.placeId)" alt="" />
            </div>
            <div class="card-content">
              <a href="" class="card-name"> {{getPlaceName(order.placeId)}} </a>
              <div class="card-describe">
                <span> Table number:{{order.tableNumber }}</span>

              </div>
              <div class="date">
                <i class="i-calendar-event-line"></i>
                <span>{{order.date.slice(0, 10)}}</span>
              </div>
              <img :src="getUserQrList[index]" alt="">
            </div>
            <div class="card-footer">
              <button  class="btn card-btn card-btn-border" v-on:click="openSellModal(order)">
                <i class="i-price-tag-2-line"></i>
                <span>Sell</span>
              </button>
              <button  class="btn card-btn card-btn-border" v-on:click="openSellModal(order)">
                <i class="i-arrow-left-right-line"></i>
                <span>Transfer</span>
              </button>
<!--              <button  class="btn card-btn card-btn-border" v-on:click="openSellModal(order)">-->
<!--                <i class="i-shopping-cart-2-line"></i>-->
<!--                <span>Buy</span>-->
<!--              </button>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div>
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
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import config from "../assets/config.json";

export default {
  data(){
    return{
      orders: [{
        tableNumber: 2,
        nftId:0,
        place_id:2
      }]
    }
  },
  computed: mapGetters(["userDataGetter", "getUserOrders", "getUserQrList"]),
  methods: {
    ...mapMutations([
      "updateUserData",
      "updateIsOpenSellModal",
      "updateModalSellDataToProcess",
    ]),
    ...mapActions(["fetchUserOrders", "getUserQrCodes"]),
    getPlaceName(place_id) {
      return config.RESTAURANTS.find((el) => el.ID === place_id).NAME;
    },
    getPlaceImage(place_id) {
      return config.RESTAURANTS.find((el) => el.ID === place_id).IMG;
    },
    getPlaceStars(place_id) {
      return config.RESTAURANTS.find((el) => el.ID === place_id).STARS;
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
    }
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
