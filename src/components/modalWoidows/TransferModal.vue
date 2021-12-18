<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <div>Transfer</div>
            </slot>
            <button class="btn-modal-close" v-on:click="updateIsOpenTransferModal(false)">
              <i class="i-close-line"></i>
            </button>
          </div>

          <div class="modal-body">
            <slot name="body">

              <div class="modal-input">
                <div class="modal-input-title">Wallet addresses</div>
                <div class="input">
                  <i class="i-wallet-2-line"></i>
                  <input type="text" placeholder="Write the address" v-model="receiver"/>
<!--                  <button class="button-insert">insert</button>-->
                </div>
<!--                <div class="modal-input-amount">0.00 BTC</div>-->
              </div>
            </slot>
          </div>
          <h2 v-if="transactionStatus">transaction status: {{ transactionStatus }}</h2>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-btn-border modal-btn btn" v-on:click="transferNFT">Transfer</button>
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
      receiver: "",
      transactionStatus: undefined
    };
  },
  methods: {
    ...mapMutations(["updateIsOpenSellModal", "updateIsOpenTransferModal", "updateIsOpenTransactionModal"]),
    ...mapActions(["setNewLot"]),
    async transferNFT() {
      const user = window.localStorage.getItem("address");
      const txRes = await this.$root.core.transfer({owner: user, receiver: this.receiver, nftId: this.getModalTransferData.nftId});
      if (txRes.tx.status) this.transactionStatus = "Success";
      else this.transactionStatus = "Fail";
    },
  },
  computed: mapGetters(["modalSellDataToProcessGetter", "getModalTransferData"]),
};
</script>