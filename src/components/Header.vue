<template>
  <header class="header">
    <a href="#" class="logo"></a>
    <nav class="header-list">
      <router-link class="link" active-class="active" to="/">
        <span>Main</span>
      </router-link>

      <router-link class="link" active-class="active" to="/booking">
        <span>Booking</span>
      </router-link>

      <router-link class="link" active-class="active" to="/marketplace"
        ><span>Marketplace</span></router-link
      >

      <router-link class="link" active-class="active" to="/profile"
        ><span>Profile</span></router-link
      >
    </nav>
      <button class="btn btn-connect" v-on:click="connectUser">
        Connect Wallet
      </button>
      <button class="btn btn-connect connected">
        <i class="i-wallet-2-fill"></i>
        <span>0x12...0ds0</span>
      </button>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["connectWallet"]),
    connectUser() {
      this.connectWallet();
    },
  },
};
</script>
