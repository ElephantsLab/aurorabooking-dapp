<template>
  <div>
    <h2>Profile</h2>
    <h3 v-if="userDataGetter.isConnected">Your address: {{ userDataGetter.address }}</h3>
    <h3 v-else>Connect your wallet...</h3>
    <div>
      <h2>Yours books</h2>
      <table>
        <tr>
          <td>1...</td>
          <td>2...</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: mapGetters(["userDataGetter"]),
  methods: mapMutations(["updateUserData"]),
  mounted() {
    const userAddress = window.localStorage.getItem("address");
    if (userAddress) this.updateUserData({address: userAddress, isConnected: true});
  }
}
</script>