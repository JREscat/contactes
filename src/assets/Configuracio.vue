<template>
    <div class="afegir" :class="$store.state.modeFosc">
        <h4 class="text-center active">Configuració</h4>
        <div class="mini-menu-wrapper pb-2">                
            <span class="apartat ms-2">Servidor</span>  
            <span class="mini-menu">                
                <a v-show="esPotEditar" @click="afegirServidor()"><i class="fa-solid fa-save icon-mini-menu" title="Guardar"></i></a>
                <a @click="cancelarEditar()" v-show="esPotEditar"><i class="fas fa-ban icon-mini-menu gray" title="Cancelar"></i></a>
                <a @click="esPotEditar = true"><i class="fa-solid fa-edit icon-mini-menu" :class="{active: esPotEditar}" title="Editar"></i></a>
            </span>
        </div>
        <form>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Servidor</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" v-model="server.url" :disabled="!esPotEditar">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Usuari</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" v-model="server.usuari" :disabled="!esPotEditar">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Contrasenya</label>
                <div class="col-sm-10">
                <input type="password" class="form-control" v-model="server.contrasenya" :disabled="!esPotEditar">
                </div>
            </div>            
    </form>      
    </div>

</template>

<script>

export default {
    name: 'Configuracio',
    data () {
        return {
            esPotEditar: false,
            server: {
                url: '',
                usuari: '',
                contrasenya: '',
            }
        }
    },
    methods: {
        afegirServidor() {
            let servidor = this.server.url
            let usuari = this.server.usuari
            let contrasenya = this.server.contrasenya
            this.$store.dispatch('saveCredentials', {servidor: servidor, usuari: usuari, contrasenya: contrasenya})
                .then( () => {
                    this.esPotEditar = false
                    this.$store.dispatch('getDataMongo', 'persones')
                    this.$store.dispatch('getDataMongo', 'empreses') 
                    let missatge = `S'ha afegit com a servidor a: <span style="color: coral">${this.server.url}</span>`                        
                    this.$store.commit('showModalMissatge', missatge)
                }).catch (err => {
                    console.log(err)
                    let missatgeerror = `No s'ha pogut afegir el servidor el següent error: <br /> ${err}`
                    this.$store.commit('showModalMissatge', missatgeerror)
                }) 
        },
        cancelarEditar() {
            this.esPotEditar = false
            this.server.url = this.$store.state.mongoConfig.url
            this.server.usuari = this.$store.state.mongoConfig.usuari
            this.server.contrasenya = this.$store.state.mongoConfig.contrasenya
        },
    },
    watch: {
        '$store.state.mongoConfig.url': function () {            
            let clone = JSON.parse(JSON.stringify(this.$store.state.mongoConfig)); 
            this.server.url = clone.url            
            this.server.usuari = clone.usuari
            this.server.contrasenya = clone.contrasenya            
        }
    },


}
</script>

<style scoped>
  .apartat {    
    font-size: 20px;  
    font-weight: 400;  
  }
</style>