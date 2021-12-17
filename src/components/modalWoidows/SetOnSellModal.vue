<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              {{ modalSellDataToProcessGetter.placeName }}
             
            </slot>
            <button class="btn-modal-close" v-on:click="updateIsOpenSellModal(false)">
               <i class="i-close-line"></i>
            </button>
          </div>
          <h2>Enter price</h2>
          <div class="modal-body">
            <slot name="body">
              <input type="number" placeholder="Enter price" v-model="sellPrice">
            </slot>
          </div>
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

export default {
  data() {
    return {
      sellPrice: 0
    }
  },
  methods: {
    ...mapMutations(["updateIsOpenSellModal"]),
    ...mapActions(["setNewLot"]),
    async sellToken(sellData) {
      const lotId = await this.$root.core.getTokenAllowance({ nftId: sellData.nftId, price: this.sellPrice })
      await this.setNewLot({ orderId: sellData.orderId, price: this.sellPrice, lotId: lotId });
    }
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