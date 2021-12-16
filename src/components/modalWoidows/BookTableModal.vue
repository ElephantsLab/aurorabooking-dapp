<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">{{ modalBookDataToProcessGetter.NAME }}</slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <table>
                <tr><h2>Date</h2>
                  ...
                </tr>
                <tr><h2>Table</h2>
                  <td v-for="table in modalBookDataToProcessGetter.TABLES" v-on:click="chooseTable(table)" v-bind:key="table">
                    <button>{{ table }}</button>
                  </td>
                </tr>
              </table>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" v-on:click="bookPlaceTable">
                Book
              </button>
              <button class="modal-default-button" v-on:click="updateIsOpenBookModal(false)">
                Close
              </button>
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
      chosenTableNumber: null
    }
  },
  methods: {
    ...mapMutations(["updateIsOpenBookModal"]),
    ...mapActions(["bookTableSaveData"]),
    async bookPlaceTable() {
      if (this.chosenTableNumber) {
        const bookTableWriteRes = await this.$root.core.bookTable({placeId: this.modalBookDataToProcessGetter.ID, tableId: this.chosenTableNumber});
        console.log(bookTableWriteRes);
        // this.bookTableSaveData({ placeId: this.modalBookDataToProcessGetter.ID, table: this.chosenTableNumber });
      }
    },
    chooseTable(number) {
      this.chosenTableNumber = number;
    }
  },
  computed: mapGetters(["modalBookDataToProcessGetter"]),
}
</script>

<style scoped>
.modal-mask {
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
}
</style>