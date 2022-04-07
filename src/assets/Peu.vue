<template>
    <div id="peu">
        <i @click="$store.commit('changeSeccio', 'configuracio')" class="fa-solid fa-gear iconapeu me-2" :class="{ 'fa-spin': $store.state.noServer, active: $store.state.show == 'configuracio'}" title="Configuració"></i>
        <i class="fa-solid fa-circle-half-stroke iconapeu me-2" :class="{ active: $store.state.modeFosc == 'fosc'}" @click="toggleModeFosc()" title="Mode fosc/clar"></i>        
        
    </div>
  
</template>

<script>
export default {
    name: 'Peu',
    methods: {
      toggleModeFosc() {        
          if (this.$store.state.modeFosc == 'fosc') {
              this.$store.commit('assignarModeFosc', 'clar')      
          } else if (this.$store.state.modeFosc == 'clar'){
              this.$store.commit('assignarModeFosc', 'fosc')                
          }          
      },
    }

}
</script>

<style scoped>

#peu {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 30px;
	line-height: 30px;
     background-color: #212529 ;
    text-align: center;
    color: white;
}

.iconapeu {
  font-size: 14px;
  cursor: pointer;
}

</style>