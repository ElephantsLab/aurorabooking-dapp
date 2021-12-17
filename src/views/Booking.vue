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
          >
            <div class="card-header">
              <!-- One / two / three / four / five -->
              <div class="card-stars three" v-bind:class="restaurant.STARS">
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
                <span>{{ restaurant.TOWN }}</span>
<!--                <span>$$$$</span>-->
<!--                <span></span>-->
              </div>
            </div>
            <div class="card-footer">
              <button  class="btn card-btn card-btn-border" v-on:click="openBookModal(restaurant)">
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
