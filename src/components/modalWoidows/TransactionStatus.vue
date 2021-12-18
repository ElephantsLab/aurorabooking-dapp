<template>
<transition name="modal">
    <div class="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
             <div v-if='true'>
                <!-- Transaction Status -->
                Success
                </div>
                <div v-if='showPending'>
                Pending 
                </div>
                <div v-if='showFail'>
                Fail
                </div>
            </slot>
            <button @click="emits='close'" class="btn-modal-close" v-on:click="updateIsOpenTransactionModal(false)">
               <i class="i-close-line"></i>
            </button>
          </div>

          <div class="modal-body">
            <div class="modal-body-status">
                <div v-if='true'>
                  <div class="status-icon status-check">
                    <i class="i-checkbox-circle-fill "></i>
                  </div>
                  <span> 
                    Success
                  </span>
                </div>
                <div v-if='showPending'>
                  <div class="status-icon status-pending">
                    ...
                  </div>
                  <span> 
                    Pending
                  </span> 
                </div>
                <div v-if='showFail'>
                  <div class="status-icon">
                    <i class="i-close-line "></i>
                  </div>
                  <span> 
                    Fail
                  </span>              
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>
<script>
import { mapMutations } from "vuex";

export default{
    props: ['showSuccess', "showPending", "showFail"],
  methods: mapMutations(["updateIsOpenTransactionModal"])
}
</script>