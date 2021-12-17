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
          <div class="filter">
            <div class="filter-container">
              <div class="filter-section">
                <div class="filter-section-header">
                  <span>Filter title </span>
                  <i class="i-arrow-drop-down-line"></i>
                </div>
                <div class="filter-section-content">
                  <div class="checkbox">
                    <input type="checkbox" id="item1" />
                    <label for="item1">Name </label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" id="item2" />
                    <label for="item2">Name </label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" id="item3" />
                    <label for="item3">Name </label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" id="item4" />
                    <label for="item4">Name </label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" id="item5" />
                    <label for="item5">Name </label>
                  </div>
                </div>
              </div>
              <div class="filter-section">
                <div class="filter-section-header">
                  <span>Filter title </span>
                  <i class="i-arrow-drop-down-line"></i>
                </div>
                <div class="filter-section-content">
                  <div class="checkbox">
                    <input type="checkbox" id="item1" />
                    <label for="item1">Name </label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" id="item2" />
                    <label for="item2">Name </label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" id="item3" />
                    <label for="item3">Name </label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" id="item4" />
                    <label for="item4">Name </label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" id="item5" />
                    <label for="item5">Name </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="wrapper-cards">
            <div class="card card-marketplace">
              <div class="card-header">
                <div class="card-stars three">
                  <i class="i-star-fill"> </i>
                  <i class="i-star-fill"> </i>
                  <i class="i-star-fill"> </i>
                  <i class="i-star-fill"> </i>
                  <i class="i-star-fill"> </i>
                </div>
                <img src="@/assets/images/cardImage2.png" alt="" />
              </div>
              <div class="card-content">
                <a href="" class="card-name">name</a>
                <div class="card-describe">
                  <span>Kiyv</span>
                  <span>$$$$</span>
                  <span>Asian cuisine</span>
                </div>
              </div>
              <div class="card-footer">
                <button class="btn card-btn card-btn-border">
                  <i class="i-shopping-cart-2-line"></i>
                  <span>Buy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      config: config,
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
