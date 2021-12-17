<template>
  <div class="landing-page">
    <div class="container">
      <main>
        <div class="section-title">Available restaurants where you can book a table</div>
        <div class="section-describe">
          It is a long established fact that a reader will be distracted by the readable
          content of a page when looking at its layout.
        </div>
        <button class="section-button" v-on:click="goToBooking">
          <span> Booking</span>
          <i class="i-arrow-right-line"></i>
          
        </button>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToBooking() {
      this.$router.push("/booking");
    },
  },
};
</script>
