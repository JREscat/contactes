<template>  
  <NavBar />
  <Persones v-show="$store.state.show == 'persones'"/>
  <Empreses v-show="$store.state.show == 'empreses'"/>
  <Afegir v-show="$store.state.show == 'afegir'"/>
  <EditPersones v-show="$store.state.show == 'editpersones'" />
  <EditEmpreses v-show="$store.state.show == 'editempreses'" />
  <Configuracio v-show="$store.state.show == 'configuracio'"/>
  <Peu />
  <ModalPensant v-show="$store.state.modal.pensant"/>
  <ModalMissatge v-show="$store.state.modal.missatge"/>
</template>

<script>

const Store = require('electron-store');
const store = new Store();


import NavBar from './components/NavBar.vue'
import Persones from './components/Persones.vue'
import Empreses from './components/Empreses.vue'
import Afegir from './components/Afegir.vue'
import EditPersones from './components/EditPersones.vue'
import EditEmpreses from './components/EditEmpreses.vue'
import Configuracio from './components/Configuracio.vue'
import Peu from './components/Peu.vue'
import ModalPensant from './components/ModalPensant.vue'
import ModalMissatge from './components/ModalMissatge.vue'

const keytar = require('keytar')

export default {
  name: 'App',
  data () {
    return {

    }
  },
  components: {
      NavBar,
      Persones,
      Empreses,      
      Afegir,
      EditPersones,
      EditEmpreses,
      Configuracio, 
      Peu,
      ModalPensant,
      ModalMissatge
  },
  methods: {

  },
  mounted () {

    if(store.get('modeFosc')) {
      this.$store.commit('assignarModeFosc', store.get('modeFosc'))      
    }

    
  },
  created () {
    
    let usuari = store.get('login.usuari')
    let servidor = store.get('login.servidor')
    let contrasenya = null 

    
     if (!usuari || !servidor) {         
          let missatge = 'Cal configurar un servidor'
          this.$store.commit('showModalMissatge', missatge)
         return this.$store.state.noServer = true
      }  else {
          this.$store.commit('togglePensant')
          keytar.getPassword('ContactesDAiS', usuari).then( result => {
            contrasenya = result
            this.$store.commit('getMongoserver', servidor)            
            this.$store.commit('getMongouser', usuari)   
            this.$store.commit('getMongocontrasenya', contrasenya)   
            this.$store.dispatch('getDataMongo', 'persones')
            this.$store.dispatch('getDataMongo', 'empreses')                    
            return this.$store.state.noServer = false
          }).catch(err => {
              this.$store.commit('disablePensant')              
              let missatgeerror = `No s'ha pogut accedir al servidor, s'ha produït el següent error: <br /> ${err}`
              this.$store.commit('showModalMissatge', missatgeerror)
          })

      }
      
      
  },


}

</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  
}

#app .fosc {
  background: #343a40;
}

body {
  margin: 0;
    overflow-x: hidden;
    overflow-y: hidden;
  
  }
</style>
