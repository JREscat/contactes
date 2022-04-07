<template>
    <form>
        <div class="form-group row">
            <label class="col-2 col-form-label">Empresa</label>
            <div class="col-10">
            <input type="text" class="form-control" v-model="dades.empresa">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-2 col-form-label">Telèfon</label>
            <div class="col-10">
            <input type="text" class="form-control" v-model="dades.telefon">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-2 col-form-label">Fax</label>
            <div class="col-10">
            <input type="text" class="form-control" v-model="dades.fax">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-2 col-form-label">Correu</label>
            <div class="col-10">
            <input type="text" class="form-control" v-model="dades.mail">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-2 col-form-label">Adreça</label>
            <div class="col-10">
            <input type="text" class="form-control" v-model="dades.adreca">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-2 col-form-label">Referencia</label>
            <div class="col-10">
            <select class="form-select" v-model="dades.referencia">
                <option>Adiexa</option>
                <option>Aranzana</option>
                <option>Alegre</option>
                <option>Ballester</option>
                <option>CRM</option>
                <option>Gasulla</option>
                <option selected>General</option>
                <option>Navarro</option>
                <option>Pardo</option>
                <option>Rico</option>
                <option>Tabbia</option>
                <option>Altres</option>
            </select>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-2 col-form-label">CIF</label>
            <div class="col-10">
            <input type="text" class="form-control" v-model="dades.cif">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-2 col-form-label">Notes</label>
            <div class="col-10">
            <textarea class="form-control" v-model="dades.notes"></textarea>
            </div>
        </div>
    </form>            
</template>

<script>
export default {
    name: 'AfegirEmpreses',
    data () { 
        return {
            dades: {
                empresa: '',
                telefon: '',
                fax: '',
                mail: '',
                adreca: '',                
                referencia: 'General',
                cif: '',                
                notes: '',                
            }
        }
    },
    methods: {
      netejarFormulari() {
        this.dades.empresa = ''
        this.dades.telefon = ''
        this.dades.fax = ''
        this.dades.mail = ''
        this.dades.adreca = ''
        this.dades.referencia = 'General'
        this.dades.cif = ''
        this.dades.notes = ''
      },
      afegirEmpresa() {
        let data = {
          empresa: this.dades.empresa,
          telefon: this.dades.telefon,
          fax: this.dades.fax,
          mail: this.dades.mail,
          adreca: this.dades.adreca,                
          referencia: this.dades.referencia,
          cif: this.dades.cif,
          notes: this.dades.notes,           
        }
        this.$store.commit("togglePensant");
        let missatge = `S'ha afegit a: <span style="color: coral">${this.dades.empresa}</span>`
        this.$store.dispatch('afegirDataMongo', {collection: 'empreses', data: data })
        .then( e => {
            this.$store.commit('disablePensant')
            this.$store.commit('showModalMissatge', missatge)
            this.$store.dispatch('getDataMongo', 'empreses')  
            this.netejarFormulari()
        }).catch( error => {
            console.log('error')      
            let missatgeerror = `No s'ha pogut editar l'entrada s'ha produït el següent error: <br /> <span style="color: coral">${error}</span>`
            this.$store.commit('disablePensant')      
            this.$store.commit('showModalMissatge',  missatgeerror)
        })
      },
    },

    watch: {
      '$store.state.netejar.empreses': function () {        
        if (this.$store.state.netejar.empreses) {
          this.netejarFormulari()
          this.$store.state.netejar.persones = false
        }
      },
      '$store.state.guardar.empreses': function () {
        if (this.$store.state.guardar.empreses) {
          this.afegirEmpresa()
          this.$store.state.guardar.empreses = false
        }
      }
    }

}
</script>

<style scoped>



</style>