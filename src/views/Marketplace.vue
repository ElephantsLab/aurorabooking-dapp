<template>
  <div>
    <header>Marketplace</header>
    <div class="mainContent">
      <div v-for="activeLot in getActiveLots" :key="activeLot.id">
        <div>
          <p>Restaurant: {{getPlaceName(activeLot.place_id)}}</p>
          <p>Table number: {{activeLot.table_number}}</p>
          <p>Order price: {{activeLot.price}}</p>
          <button @click="purchaseOrder(activeLot)">Purchase lot</button>
        </div>
      </div>
    </div>
  </div>
  


</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import config from "../assets/config.json"
export default {
computed: {
  ...mapState(['activeLots']),
  ...mapGetters(["getActiveLots"]),
  
},
methods: {
  ...mapActions(["fetchAllActiveLots"]),
  getPlaceName(place_id){
    return config.RESTAURANTS.find(el => el.ID === place_id).NAME;
  },
  async purchaseOrder(lot){
    await this.$root.core.buy(lot.lot_id, lot.price);
  }
  
},
created(){
  let _this = this;
  setTimeout(async function updateComponentData() {
      try {
        await _this.fetchAllActiveLots()

        setTimeout(updateComponentData, 3000)
      } catch (error) {
        setTimeout(updateComponentData, 300)
      }
    })
}
}
</script>