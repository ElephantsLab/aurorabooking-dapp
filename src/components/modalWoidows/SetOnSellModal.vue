<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <div>                
                Sell
              </div>             
            </slot>
            <button class="btn-modal-close" v-on:click="updateIsOpenSellModal(false)">
               <i class="i-close-line"></i>
            </button>
          </div>
          
          <div class="modal-body">

              <div class="modal-data">
                <!-- <img v-bind:src="getPlaceImage(modalBookDataToProcessGetter.ID)" /> -->
                <img v-bind:src="getPlaceImage(modalSellDataToProcessGetter.placeId)" />
                <div class="modal-data-content">
                  <a href="" class="card-name"> {{ getPlaceName(modalSellDataToProcessGetter.placeId) }} </a>
                  <div class="card-describe">
                    <span> {{ getPlaceTown(modalSellDataToProcessGetter.placeId) }} </span>
                  </div>
                  <!--  v-bind:class="getPlaceStars(modalBookDataToProcessGetter.ID)" -->
                  <div class="stars-container three" v-bind:class="getPlaceStars(modalSellDataToProcessGetter.placeId)">
                    <i class="i-star-fill"> </i>
                    <i class="i-star-fill"> </i>
                    <i class="i-star-fill"> </i>
                    <i class="i-star-fill"> </i>
                    <i class="i-star-fill"> </i>
                  </div>
                </div>
              </div>


              <div class="modal-input-container">

                <div class="modal-input">
                  <div class="modal-input-title">Сost</div>
                  <div class="input">
                    <i class="i-money-dollar-circle-line"></i>
                    <input type="number" value="0" v-model="sellPrice">
                  </div>
<!--                  <div class="modal-input-amount ">0.00 BTC</div>-->
                </div>

<!--                <div class="modal-input">-->
<!--                  <div class="modal-input-title">Date</div>-->
<!--                  <div class="input">-->
<!--                    <input type="datetime-local">-->
<!--                  </div>-->
<!--                </div>-->
              </div>
<!--            <slot name="body">-->
<!--              <input type="number" placeholder="Enter price" v-model="sellPrice">-->
<!--            </slot>-->
          </div>
          <h2 v-if="transactionStatus">transaction status: {{ transactionStatus }}</h2>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-btn-border modal-btn btn" v-on:click="sellToken(modalSellDataToProcessGetter)">
                Sell
              </button>
              <!-- <button class="modal-btn-border modal-btn btn" v-on:click="updateIsOpenSellModal(false)">
                Close
              </button> -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import config from "../../assets/config.json";

export default {
  data() {
    return {
      sellPrice: 0,
      transactionStatus: undefined
    }
  },
  methods: {
    ...mapMutations(["updateIsOpenSellModal"]),
    ...mapActions(["setNewLot"]),
    async sellToken(sellData) {
      this.transactionStatus = "Pending...";
      let res;
      try {
        res = await this.$root.core.getTokenAllowance({ nftId: sellData.nftId, price: this.sellPrice });
      } catch (error) {
        this.transactionStatus = undefined;
      }
      if (res.tx && res.tx.tx.status) this.transactionStatus = "Success";
      else this.transactionStatus = "Fail";
      await this.setNewLot({ orderId: sellData.orderId, price: this.sellPrice, lotId: res.lotId });
    },
    getPlaceName(place_id) {
      return config.RESTAURANTS.find((el) => el.ID === place_id).NAME;
    },
    getPlaceStars(place_id) {
      return config.RESTAURANTS.find((el) => el.ID === place_id).STARS;
    },
    getPlaceTown(place_id) {
      return config.RESTAURANTS.find((el) => el.ID === place_id).TOWN;
    },
    getPlaceImage(place_id) {
      return config.RESTAURANTS.find((el) => el.ID === place_id).IMG;
    },
  },
  computed: mapGetters(["modalSellDataToProcessGetter"])
}
</script>

<style scoped>
/* .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 100px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
} */
</style>