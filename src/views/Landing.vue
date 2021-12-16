<template>
  <div>
    <h3>Available restaurants where you can book a table</h3>
    <button v-on:click="goToBooking">Book a table</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToBooking() {
      this.$router.push('/booking');
    }
  }
}
</script>