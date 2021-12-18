<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div>
              <slot name="header">Booking</slot>
            </div>
            <button class="btn-modal-close" v-on:click="updateIsOpenBookModal(false)">
              <i class="i-close-line"></i>
            </button>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="modal-data">
                <img v-bind:src="getPlaceImage(modalBookDataToProcessGetter.ID)" />
                <div class="modal-data-content">
                  <a href="" class="card-name">{{ modalBookDataToProcessGetter.NAME }}</a>
                  <div class="card-describe">
                    <span>{{ getPlaceTown(modalBookDataToProcessGetter.ID) }}</span>
<!--                    <span>Asian cuisine</span>-->
                  </div>
                  <div class="stars-container three" v-bind:class="getPlaceStars(modalBookDataToProcessGetter.ID)">
                    <i class="i-star-fill"> </i>
                    <i class="i-star-fill"> </i>
                    <i class="i-star-fill"> </i>
                    <i class="i-star-fill"> </i>
                    <i class="i-star-fill"> </i>
                  </div>
                </div>
              </div>
              <div class="modal-input-container">
<!--              x-->
<!--              <div class="modal-input">-->
<!--                <div class="modal-input-title">Date</div>-->
<!--                <div class="input">-->
<!--                  <input type="datetime-local">-->
<!--                </div>-->
<!--              </div>-->
              </div>
<!--              <div class="modal-button-container"> -->
<!--                <button class="button" v-bind:class="{ 'active': chosenTableNumber === 1 }">1</button>-->
<!--                <button class="button">8</button>-->
<!--                <button class="button">12</button>-->
<!--                <button class="button">17</button>-->
<!--                <button class="button">23</button>-->
<!--                <button class="button">85</button>-->
<!--                <button class="button">109</button>-->
<!--              </div>-->

              <div class="modal-input">
                <div class="modal-input-title">Date</div>
                <div class="input">
                  <input type="date"
                         min="2021-12-18"
                         max="2023-12-31"
                         v-model="bookDate">
                </div>
              </div>
              <h2>Table</h2>
              <div class="modal-button-container">
                <button class="button" v-for="(table, index) in availableTables"
                        v-on:click="chooseTable(table)"
                        v-bind:key="index" v-bind:class="{ 'active': chosenTableNumber === table }">{{ table }}</button>
                <!--                    <button class="button">8</button>-->
                <!--                    <button class="button">12</button>-->
                <!--                    <button class="button">17</button>-->
                <!--                    <button class="button">23</button>-->
                <!--                    <button class="button">85</button>-->
                <!--                    <button class="button">109</button>-->
              </div>
              <!--                  <td-->
              <!--                    v-for="table in availableTables"-->
              <!--                    v-on:click="chooseTable(table)"-->
              <!--                    v-bind:key="table"-->
              <!--                  >-->
              <!--                    <button>{{ table }}</button>-->
              <!--                  </td>-->
              <h2 v-if="chosenTableNumber">Selected table: {{ chosenTableNumber }}</h2>
            </slot>
          </div>

          <h2 v-if="transactionStatus">Transaction status: {{ transactionStatus }}</h2>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-btn modal-btn-border btn" 
              v-on:click="bookPlaceTable">
                Approve
              </button>
              <!-- <button
                class="modal-btn modal-btn-border btn"
                v-on:click="updateIsOpenBookModal(false)"
              >
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
      chosenTableNumber: null,
      bookDate: new Date().toISOString().split("T")[0],
      availableTables: [],
      updateTableInterval: undefined,
      transactionStatus: undefined
    };
  },
  methods: {
    ...mapMutations(["updateIsOpenBookModal", "updateIsOpenTransactionModal", "updateSuccessMessage"]),
    ...mapActions(["bookTableSaveData", "fetchActiveOrders"]),
    async bookPlaceTable() {
      if (this.chosenTableNumber) {
        const bookTableWriteRes = await this.$root.core.bookTable({
          placeId: this.modalBookDataToProcessGetter.ID,
          tableId: this.chosenTableNumber,
        });
        if (bookTableWriteRes.tx.status) this.transactionStatus = "Success";
        else this.transactionStatus = "Fail";
        this.bookTableSaveData({
          placeId: this.modalBookDataToProcessGetter.ID,
          table: this.chosenTableNumber,
          nftId: bookTableWriteRes.nftId,
          date: this.bookDateRes,
        });
      }
    },
    chooseTable(number) {
      this.chosenTableNumber = number;
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
    async updateTableStatus(date) {
      const usedTables = await this.fetchActiveOrders({
        placeId: this.modalBookDataToProcessGetter.ID,
        date: date,
      });
      if (usedTables.length) {
        this.availableTables = this.availableTables.filter(
            (el) => !usedTables.includes(el)
        );
      } else {
        for (let i = 0; i < this.modalBookDataToProcessGetter.TABLES; i++) {
          if (this.availableTables.length < this.modalBookDataToProcessGetter.TABLES - 1) {
            this.availableTables.push(i + 1);
            this.availableTables.sort((a, b) => a - b);
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(["modalBookDataToProcessGetter"]),
    bookDateRes() {
      return ~~(new Date(this.bookDate).getTime() / 1000);
    },
  },
  async mounted() {
    for (let i = 0; i < this.modalBookDataToProcessGetter.TABLES; i++) {
      this.availableTables.push(i + 1);
    }
    await this.updateTableStatus(~~(new Date(this.bookDate).getTime() / 1000));
    this.updateTableInterval = setInterval(async () => {
      await this.updateTableStatus(~~(new Date(this.bookDate).getTime() / 1000));
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.updateTableInterval);
  },
};
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
