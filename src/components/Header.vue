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
      <button v-if="userDataGetter && !userDataGetter.isConnected" class="btn btn-connect" v-on:click="connectUser">
        Connect Wallet
      </button>
      <button v-if="userDataGetter && userDataGetter.address &&userDataGetter.isConnected" class="btn btn-connect connected">
        <i class="i-wallet-2-fill"></i>
        <span>{{addrShort(userDataGetter.address)}}</span>
      </button>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(['userDataGetter'])
  },
  methods: {
    ...mapActions(["connectWallet"]),
    connectUser() {
      this.connectWallet();
    },

    addrShort(addr){
      return addr.slice(0, 4) + "..." + addr.slice(addr.length - 4, addr.length)
    }
  },
};
</script>
