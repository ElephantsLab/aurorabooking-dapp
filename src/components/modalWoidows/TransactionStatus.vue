<template>
<transition name="modal">
    <div class="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
                Transaction Status
            </slot>
            <button @click="emits='close'" class="btn-modal-close" v-on:click="updateIsOpenSellModal(false)">
               <i class="i-close-line"></i>
            </button>
          </div>

          <div class="modal-body">
            <div>
                <div v-if='true'>
                Success
                </div>
                <div v-if='showPending'>
                Pending 
                </div>
                <div v-if='showFail'>
                Fail
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>
<script>
export default{
    props: ['showSuccess', "showPending", "showFail"]
}
</script>