<template>
  <div class="header">
    <table>
      <tr>
        <td><router-link to="/"><p>Main</p></router-link></td>
        <td><router-link to="/booking"><p>Booking</p></router-link></td>
        <td><router-link to="/marketplace"><p>Marketplace</p></router-link></td>
        <td><router-link to="/profile"><p>Profile</p></router-link></td>
        <td><button v-on:click="connectUser">Connect Wallet</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["connectWallet"]),
    connectUser() {
      this.connectWallet();
    }
  }
}
</script>