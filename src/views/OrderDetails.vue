<template>
  <div>
    <h3>{{ getOrderDetails.name }}</h3>
    <h4>{{ getOrderDetails.description }}</h4>
    <img class="restaurant" v-bind:src="getOrderDetails.image">
    <table>
      <tr>
        {{ getOrderDetails.attributesArrRes }}
      </tr>
    </table>
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
</style>