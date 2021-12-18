<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <div>Transfer</div>
            </slot>
            <button class="btn-modal-close" v-on:click="updateIsOpenSellModal(false)">
              <i class="i-close-line"></i>
            </button>
          </div>

          <div class="modal-body">
            <slot name="body">

              <div class="modal-input">
                <div class="modal-input-title">Wallet addresses</div>
                <div class="input">
                  <i class="i-wallet-2-line"></i>
                  <input type="text" placeholder="Write the address" />
                  <button class="button-insert">insert</button>
                </div>
                <div class="modal-input-amount">0.00 BTC</div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-btn-border modal-btn btn">Approve</button>
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
      sellPrice: 0,
    };
  },
  methods: {
    ...mapMutations(["updateIsOpenSellModal"]),
    ...mapActions(["setNewLot"]),
    async sellToken(sellData) {
      const lotId = await this.$root.core.getTokenAllowance({
        nftId: sellData.nftId,
        price: this.sellPrice,
      });
      await this.setNewLot({
        orderId: sellData.orderId,
        price: this.sellPrice,
        lotId: lotId,
      });
    },
  },
  computed: mapGetters(["modalSellDataToProcessGetter"]),
};
</script>