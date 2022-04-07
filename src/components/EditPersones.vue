<template>
<div class="editar" :class="$store.state.modeFosc">
    <div class="mini-menu-wrapper pb-2">        
        <a @click="tornar()"><i class="fa-solid fa-long-arrow-alt-left icon-mini-menu" title="Tornar"></i></a>        
        <span class="missatge ms-2" v-show="esPotEditar">Editant a {{$store.state.dades.editarPersona.nom}} {{$store.state.dades.editarPersona.cognoms}}</span>     
        <span class="mini-menu">
            <a @click="editarPersona()" v-show="esPotEditar" ><i class="fas fa-save icon-mini-menu gray" title="Guardar canvis"></i></a>
            <a @click="modalEliminar = true" v-show="esPotEditar" ><i class="fas fa-trash-alt icon-mini-menu gray" title="Eliminar"></i></a>
            <a @click="cancelarEditar()" v-show="esPotEditar"><i class="fas fa-ban icon-mini-menu gray" title="Cancelar"></i></a>
            <a @click="esPotEditar = true"><i class="fa-solid fa-edit icon-mini-menu" :class="{active: esPotEditar}" v-show="!$store.state.noServer" title="Editar"></i></a>
        </span>
    </div>
    <form>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Nom</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.nom" :disabled="!esPotEditar">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Cognoms</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.cognoms" :disabled="!esPotEditar">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Mòbil</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.mobil" :disabled="!esPotEditar">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Telèfon</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.telefon" :disabled="!esPotEditar">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Correu</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.mail" :disabled="!esPotEditar">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Empresa</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.empresa" :disabled="!esPotEditar">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Càrrec</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.carrec" :disabled="!esPotEditar">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Referencia</label>
            <div class="col-sm-10">
            <select class="form-select" v-model="dades.referencia" :disabled="!esPotEditar">
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
            <input type="text" class="form-control" v-model="dades.nif" :disabled="!esPotEditar">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Fax</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" v-model="dades.fax" :disabled="!esPotEditar">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Notes</label>
            <div class="col-sm-10">
            <textarea class="form-control" v-model="dades.notes" :disabled="!esPotEditar"></textarea>
            </div>
        </div>
    </form>  
      <div class="meumodal" v-show="modalEliminar">
      <div class="meumodal-missatge">
        <div>
        <p>Estàs segur que vols eliminar a: <span style="color: coral">{{this.$store.state.dades.editarPersona.nom}} {{this.$store.state.dades.editarPersona.cognoms}}</span></p>
          <button class="btn btn-success me-2" @click.prevent="modalEliminar = false; eliminarPersona()">Si </button>                   
          <button class="btn btn-danger" @click.prevent="modalEliminar = false">No</button>                   
        </div>
      </div>
    </div>   
</div>         
</template>

<script>
import { ObjectId } from "mongodb"
export default {
    name: 'EditPersones',
    data () { 
        return {
            esPotEditar: false,
            dades: {
                _id: '',
                nom: '',
                cognoms: '',
                mobil: '',
                telefon: '',
                mail: '',
                empresa: '',
                carrec: '',
                referencia: 'General',
                nif: '',
                fax: '',
                notes: '',               
            },
            modalEliminar: false,

        }
    },
    methods: {
        tornar(){
            this.$store.commit('changeSeccio', 'persones')
        },
        eliminarPersona() {
          this.$store.commit('togglePensant')
          let missatge = `S'ha eliminat a: <span style="color: coral">${this.$store.state.dades.editarPersona.nom} ${this.$store.state.dades.editarPersona.cognoms}</span>`
          this.$store.dispatch('eliminarDataMongo', {collection: 'persones', data: {"_id": ObjectId(`${this.$store.state.dades.editarPersona._id}`)}})  
            .then( e => {
              this.$store.commit('disablePensant')
              this.$store.commit('showModalMissatge', missatge)
              this.$store.dispatch('getDataMongo', 'persones')  
              this.$store.commit('changeSeccio', 'persones')
            }).catch( error => {
                let missatgeerror = `No s'ha pogut eliminar l'entrada s'ha produït el següent error: <br /> ${error}`
                this.$store.commit('disablePensant')      
                this.$store.commit('showModalMissatge',  missatgeerror)
            })          

        },
        cancelarEditar() {
            this.esPotEditar = false
            let clone = JSON.parse(JSON.stringify(this.$store.state.dades.editarPersona));
            this.dades.nom = clone.nom;
            this.dades.cognoms = clone.cognoms;
            this.dades.mobil = clone.mobil;
            this.dades.telefon = clone.telefon;
            this.dades.mail = clone.mail;
            this.dades.empresa = clone.empresa;
            this.dades.carrec = clone.carrec;
            this.dades.referencia = clone.referencia;
            this.dades.nif = clone.nif;
            this.dades.fax = clone.fax;
            this.dades.notes = clone.notes;

        },
        editarPersona() {
            let dades = {
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
            this.$store.commit('togglePensant')
            this.esPotEditar = false
            let missatge = `S'ha editat a: <span style="color: coral">${this.$store.state.dades.editarPersona.nom} ${this.$store.state.dades.editarPersona.cognoms}</span>`
            let query = {"_id": ObjectId(`${this.$store.state.dades.editarPersona._id}`)}
            let  data = { $set: dades };
            this.$store.dispatch('editarDataMongo', {collection: 'persones', query: query, data: data })
            .then( e => {
                  this.$store.commit('disablePensant')
                  this.$store.commit('showModalMissatge', missatge)
                  this.$store.dispatch('getDataMongo', 'persones')  
                  this.$store.commit('assignarData', {section: 'editarPersona', data: this.dades})      
                  this.esPotEditar = false;         
                }).catch( error => {
                  console.log('error')      
                let missatgeerror = `No s'ha pogut editar l'entrada s'ha produït el següent error: <br /> ${error}`
                this.$store.commit('disablePensant')      
                this.$store.commit('showModalMissatge',  missatgeerror)

                })   
        }
    },
    watch: {
        '$store.state.dades.editarPersona': function () {
            let clone = JSON.parse(JSON.stringify(this.$store.state.dades.editarPersona)); 
            this.dades._id = clone._id
            this.dades.nom = clone.nom;
            this.dades.cognoms = clone.cognoms;
            this.dades.mobil = clone.mobil;
            this.dades.telefon = clone.telefon;
            this.dades.mail = clone.mail;
            this.dades.empresa = clone.empresa;
            this.dades.carrec = clone.carrec;
            this.dades.referencia = clone.referencia;
            this.dades.nif = clone.nif;
            this.dades.fax = clone.fax;
            this.dades.notes = clone.notes;
        },
        '$store.state.show': function () {
          if (this.$store.state.show == 'persones' || this.$store.state.show == 'empreses') {
            this.esPotEditar = false
          }
        }
    }

}
</script>

<style scoped>

.editar {
    padding: 10px;
    height: 100vh;
}

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