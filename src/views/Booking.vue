<template>
  <div>
    <h3>Book</h3>
    <table>
      <tr v-for="(restaurant, index) in config.RESTAURANTS" v-bind:key="index" v-on:click="openBookModal(restaurant)">
        <td><h4>{{ restaurant.NAME }}</h4></td>
        <td><img class="restaurant" v-bind:src="restaurant.IMG"></td>
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
      config: config
    }
  },
  methods: {
    ...mapMutations(["updateIsOpenBookModal", "updateModalBookDataToProcess"]),
    openBookModal(placeData) {
      this.updateIsOpenBookModal(true);
      this.updateModalBookDataToProcess(placeData);
    }
  },
  mounted() {
    console.log(true);
  }
}
</script>

<style scoped>
.restaurant {
  width: 150px;
  height: 100px;
}
</style>