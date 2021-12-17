<template>
  <div>
    <!-- old -->
    <div>
      <div class="mainContent">
        <div v-for="activeLot in getActiveLots" :key="activeLot.id">
          <div>
            <p>Restaurant: {{ getPlaceName(activeLot.place_id) }}</p>
            <p>Table number: {{ activeLot.table_number }}</p>
            <p>Order price: {{ activeLot.price }}</p>
            <button @click="purchaseOrder(activeLot)">Purchase lot</button>
          </div>
        </div>
      </div>
      <transaction-status
        :showSuccess="showSuccessMessage"
        :showPending="showPendingMessage"
        :showFail="showFailMessage"
      />
    </div>

    <!-- new -->

    <div class="container">
      <div class="section-title">Marketplace</div>
      <div class="section-row">
        <div>12 023 proposals</div>
        <!-- <div></div> -->
      </div>
    </div>
    <div class="container-content">
      <div class="container">
        <div class="wrapper-marketplace">
          <div class="filter"></div>
          <div class="wrapper-cards">
            <div
              class="card card-booking"
             
            >
              <div class="card-header">
                <div class="card-stars three">
                  <i class="i-star-fill"> </i>
                  <i class="i-star-fill"> </i>
                  <i class="i-star-fill"> </i>
                  <i class="i-star-fill"> </i>
                  <i class="i-star-fill"> </i>
                </div>
                <img v-bind:src="restaurant.IMG" />
              </div>
              <div class="card-content">
                <a href="" class="card-name">{{ restaurant.NAME }}</a>
                <div class="card-describe">
                  <span>Kiyv</span>
                  <span>$$$$</span>
                  <span>Asian cuisine</span>
                </div>
              </div>
              <div class="card-footer">
                <button class="btn card-btn card-btn-border">Booking</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table>
      <tr
        v-for="(restaurant, index) in config.RESTAURANTS"
        v-bind:key="index"
        v-on:click="openBookModal(restaurant)"
      >
        <td>
          <h4>{{ restaurant.NAME }}</h4>
        </td>
        <td><img class="restaurant" v-bind:src="restaurant.IMG" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import config from "../assets/config.json";
import TransactionStatus from "../components/modalWoidows/TransactionStatus.vue";
export default {
  name: "Marketplace",
  components: {
    TransactionStatus,
  },
  data() {
    return {
      showSuccessMessage: false,
      showPendingMessage: false,
      showFailMessage: false,
    };
  },

  computed: {
    ...mapState(["activeLots"]),
    ...mapGetters(["getActiveLots"]),
  },
  methods: {
    ...mapActions(["fetchAllActiveLots", "deletePurchasedLot"]),
    getPlaceName(place_id) {
      return config.RESTAURANTS.find((el) => el.ID === place_id).NAME;
    },
    async purchaseOrder(lot) {
      try {
        const rawRes = await this.$root.core.buy(lot.lot_id, lot.price);
        this.showPendingMessage = true;
        const res = await rawRes.wait();
        if (res.transactionHash) {
          this.showPendingMessage = false;
          this.showSuccessMessage = true;
          await this.deletePurchasedLot({ lotId: lot.lot_id });
        }
      } catch (error) {
        this.showFailMessage = true;
        this.showSuccessMessage = false;
        this.showPendingMessage = false;
      }
    },
  },
  created() {
    let _this = this;
    setTimeout(async function updateComponentData() {
      try {
        await _this.fetchAllActiveLots();

        setTimeout(updateComponentData, 3000);
      } catch (error) {
        setTimeout(updateComponentData, 300);
      }
    });
  },
};
</script>
