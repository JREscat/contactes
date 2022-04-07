<template>
    <form>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Nom</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.nom">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Cognoms</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.cognoms">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Mòbil</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.mobil">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Telèfon</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.telefon">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Correu</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.correu">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Empresa</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.empresa">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Càrrec</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.carrec">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Referencia</label>
            <div class="col-sm-10">
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
            <label class="col-sm-2 col-form-label">NIF</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.nif">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Fax</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.fax">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Notes</label>
            <div class="col-sm-10">
            <textarea class="form-control" v-model="dades.notes"></textarea>
            </div>
        </div>
    </form>            
</template>

<script>
export default {
    name: 'AfegirPersones',
    data () { 
        return {
            dades: {
                nom: '',
                cognoms: '',
                mobil: '',
                telefon: '',
                correu: '',
                empresa: '',
                carrec: '',
                referencia: 'General',
                nif: '',
                fax: '',
                notes: '',


                
            }
            

        }
    },
    methods: {
      netejarFormulari() {
          this.dades.nom = ''
          this.dades.cognoms = ''
          this.dades.mobil = ''
          this.dades.telefon = ''
          this.dades.correu = ''
          this.dades.empresa = ''
          this.dades.carrec = ''
          this.dades.referencia = 'General'
          this.dades.nif = ''
          this.dades.fax = ''
          this.dades.notes = ''

      },
    afegirPersona() {
      let data = {
          nom: this.dades.nom,
          cognoms: this.dades.cognoms,
          mobil: this.dades.mobil,
          telefon: this.dades.telefon,
          mail: this.dades.mail,
          empresa: this.dades.empresa,
          carrec: this.dades.carrec,
          referencia: this.dades.referencia,
          nif: this.dades.nif,
          fax: this.dades.fax,
          notes: this.dades.notes,               
      }
      this.$store.commit("togglePensant");
      let missatge = `S'ha afegit a: <span style="color: coral">${this.dades.nom} ${this.dades.cognoms}</span>`
      this.$store.dispatch('afegirDataMongo', {collection: 'persones', data: data })
      .then( e => {
          this.$store.commit('disablePensant')
          this.$store.commit('showModalMissatge', missatge)
          this.$store.dispatch('getDataMongo', 'persones')  
          this.netejarFormulari()
      }).catch( error => {
          console.log(error)      
          let missatgeerror = `No s'ha pogut afegir l'entrada s'ha produït el següent error: <br /> <span style="color: coral">${error}</span>`
          this.$store.commit('disablePensant')      
          this.$store.commit('showModalMissatge',  missatgeerror)
      })
    },
    },
    watch: {
      '$store.state.netejar.persones': function () {
        if (this.$store.state.netejar.persones) {
          this.netejarFormulari()
          this.$store.state.netejar.persones = false
        }
      },
      '$store.state.guardar.persones': function () {
        if (this.$store.state.guardar.persones) {
          this.afegirPersona()
          this.$store.state.guardar.persones = false
        }
      }
    }
}
</script>

<style scoped>

form {
      margin: 10px;
}

input:focus {
  outline: none !important;
  box-shadow: none !important;
  
}

select:focus {
  outline: none !important;
  box-shadow: none !important;
}

textarea:focus {
  outline: none !important;
  box-shadow: none !important;
}

input.form-control {
  background-color: white !important;
  border: none !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #B0B4BF !important;
}

select.form-select {
  background-color: white !important;
  border: none !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #B0B4BF !important;  
}

textarea.form-control {
  background-color: white !important;
  border: none !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #B0B4BF !important;
}

input.form-control:disabled {
  border: none !important;
  font-weight: 600 !important;
}

.form-select:disabled {
  border: none !important;
  font-weight: 600 !important;
}

textarea.form-control:disabled {
  border: none !important;
  font-weight: 600 !important;
}

.form-group {
  margin-bottom: 0px !important;
}

label {
  color: #6b6d72;
}

input.form-control:focus{
  border-bottom: 1px solid coral !important;
}

select.form-select:focus {
  border-bottom: 1px solid coral !important;
}

textarea.form-control:focus {
  border-bottom: 1px solid coral !important;
}

  .fosc label {
    font-weight: 500;
    color: #7d7e81;
  }
  
  .fosc input {
    background-color: #343a40 !important;
    color: white !important;
    border-bottom: 1px solid #7d7e81 !important;
  }
  
  
  .fosc select {
    background-color: #343a40 !important;
    color: white !important;
    border-bottom: 1px solid #7d7e81 !important;
  }
  
  .fosc textarea {
    background-color: #343a40 !important;
    color: white !important;
    border-bottom: 1px solid #7d7e81 !important;
  }
  
  .fosc select.form-select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  }

</style>