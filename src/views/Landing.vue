<template>
  <div class="landing-page">
    <div class="container">
      <main>
        <div class="section-title">The best service for booking restaurants on the Aurora blockchain</div>
        <div class="section-describe">
          Solve your booking problem once and for all
        </div>
        <button class="section-button btn section-button-landing" v-on:click="goToBooking">
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
