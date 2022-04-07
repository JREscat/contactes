<template>
    <div class="meumodal">
      <div class="meumodal-missatge">
        <div>
          <p v-html="$store.state.missatgeModal"></p>
          <button
            class="btn btn-secondary"
            @click.prevent="
              $store.state.modal.missatge = false;
            ">
            Tancar
          </button>
        </div>
      </div>
    </div>
  
</template>

<script>
export default {
    name: 'ModalMissatge',
    

}
</script>

<style scoped>



</style>