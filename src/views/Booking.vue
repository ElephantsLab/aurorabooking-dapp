<template>
  <div>
    <div class="container">
      <div class="section-title">Booking</div>
      <div class="section-describe">
        It is a long established fact that a reader will be distracted by the readable
        content of a page when looking at its layout.
      </div>
    </div>
    <div class="container-content">
      <div class="container">
        <div class="wrapper-cards">
          <div
            class="card card-booking"
            v-for="(restaurant, index) in config.RESTAURANTS"
            v-bind:key="index"
            v-on:click="openBookModal(restaurant)"
          >
            <div class="card-header">
              <!-- One / two / three / four / five -->
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
              <button  class="btn card-btn card-btn-border">
                Booking
              </button>
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
import config from "../assets/config.json";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      config: config,
    };
  },
  methods: {
    ...mapMutations(["updateIsOpenBookModal", "updateModalBookDataToProcess"]),
    openBookModal(placeData) {
      this.updateIsOpenBookModal(true);
      this.updateModalBookDataToProcess(placeData);
    },
  },
  mounted() {
    console.log(true);
  },
};
</script>

<style scoped>
.restaurant {
  width: 150px;
  height: 100px;
}
</style>
