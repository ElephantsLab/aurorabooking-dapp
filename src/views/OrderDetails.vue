<template>
  <div class="order-details-container">
    <h3>{{ getOrderDetails.name }}</h3>
    <br />
    <h4>{{ getOrderDetails.description }}</h4>
    <img class="restaurant" v-bind:src="getOrderDetails.image">
    <!-- <table>
        Atributes: [
      <tr v-for="(attr, id) in getOrderDetails.attributesArrRes" :key="id">
        {{ attr }}
      </tr>
      ]
    </table> -->
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      orderId: null
    }
  },
  methods: {
    ...mapActions(["fetchMetadataById"]),
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
  height: 150px;
}
.order-details-container {
  width: 100%;
  text-align: center;
}
.order-details-container img {
  margin: 0 auto;
  margin-top: 25px;
}
h3, h4 {
  color: #fff;
  font-weight: bold;
}
</style>