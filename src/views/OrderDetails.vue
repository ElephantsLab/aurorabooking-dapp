<template>
  <div>
    <h3>{{ getPlaceName(getOrderDetails.placeId) }}</h3>
    <h4>Table: {{ getOrderDetails.tableNumber }}</h4>
    <img class="restaurant" v-bind:src="getOrderDetails.tableNumber">
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import config from "../assets/config.json";

export default {
  data() {
    return {
      orderId: null
    }
  },
  methods: {
    ...mapActions(["fetchMetadataById"]),
    getPlaceName(placeId) {
      for (let place of config.RESTAURANTS) {
        if (place.ID === placeId) return place.NAME;
      }
    },
  },
  computed: mapGetters(["getOrderDetails"]),
  mounted() {
    this.orderId = this.$route.params.id;
    this.fetchMetadataById({id: this.orderId});
  }
}
</script>

<style scoped>
.restaurant {
  width: 150px;
  height: 100px;
}
</style>