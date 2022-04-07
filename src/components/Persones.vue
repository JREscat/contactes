<template>
  <div class="taula" :class="$store.state.modeFosc">
    <vue-good-table
      :columns="columns"
      :rows="filteredFiles"
      v-on:row-click="onRowClick"
      :search-options="{
        enabled: false,
      }"
      :sort-options="{
        enabled: false,
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        rowsPerPageLabel: 'Files per pàgina',
        perPageDropdownEnabled: false,
        allLabel: 'Tots',
        nextLabel: 'Següent',
        prevLabel: 'Anterior',
        ofLabel: 'de',
        pageLabel: 'Pàgina',
        infoFn: (params) => `Mostrant ${params.firstRecordOnPage} a ${params.lastRecordOnPage} de ${params.totalRecords} entrades`,
      }">
      <template #table-row="props">
        <span v-if="props.column.field == 'nom'">
          {{props.formattedRow[props.column.field]}} {{props.row.cognoms}}
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>

      </template>    
    </vue-good-table>    
  </div>
</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';

/*import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.css"
import $ from 'jquery'; */

export default {
    name: "Persones",
    components: {
        VueGoodTable,
    },
    data() {
      return {
        columns: [
            {
                label: 'Nom',
                field: 'nom',
               
            },
            {
                label: 'Cognoms',
                field: 'cognoms',                
                hidden: true
            },
            {
                label: 'Mobil',
                field: 'mobil',   
                tdClass: 'text-center',
                thClass: 'text-center',
            },
            {
                label: 'Telefon',
                field: 'telefon',   
                tdClass: 'text-center',
                thClass: 'text-center',
            },
            {
                label: 'Mail',
                field: 'mail',   
                hidden: true
            },
            {
                label: 'Empresa',
                field: 'empresa',
                hidden: true   
            },
            {
                label: 'NIF',
                field: 'nif',   
                hidden: true
            },
            {
                label: 'Càrrec',
                field: 'carrec',   
                hidden: true
            },
            {
                label: 'Referencia',
                field: 'referencia',   
                tdClass: 'text-center',
                thClass: 'text-center',
            },
            {
                label: 'Fax',
                field: 'fax',   
                hidden: true
            },
            {
                label: 'Notes',
                field: 'notes',   
                hidden: true
            }
            
            
        ],
        rows: []
      }
    },
    methods: {
      onRowClick(params) {
          this.$store.commit('assignarData', {section: 'editarPersona', data: params.row})        
          this.$store.commit('changeSeccio', 'editpersones')      
      },
      filesmethod () {
        
        let prefiltre = this.$store.state.filtre        
        
        let accentsMap = new Map([
          ["A", "Á|À|Ã|Â|Ä"],
          ["a", "á|à|ã|â|ä"],
          ["E", "É|È|Ê|Ë"],
          ["e", "é|è|ê|ë"],
          ["I", "Í|Ì|Î|Ï"],
          ["i", "í|ì|î|ï"],
          ["O", "Ó|Ò|Ô|Õ|Ö"],
          ["o", "ó|ò|ô|õ|ö"],
          ["U", "Ú|Ù|Û|Ü"],
          ["u", "ú|ù|û|ü"],          
        ]);

        const reducer = (acc, [key]) => acc.replace(new RegExp(accentsMap.get(key), "g"), key);
        const removeAccents = (text) => [...accentsMap].reduce(reducer, text);

        let diacritics = removeAccents(prefiltre)        

        let arrayfiltre = diacritics.split(' ')
        let docs = this.rows

        function filterRows (rows, filter) {
          if (filter.length < 1) {    
            return rows
          }
          let arrayposition = 0        
          let regex =  new RegExp(filter[arrayposition],'i');
          let result = []          
            rows.forEach(value => {
                if (regex.test(removeAccents(value.nom))) {  
                  result.push(value)
                  return
                } else if (regex.test(removeAccents(value.cognoms))) {
                  result.push(value)
                  return
                } else if (regex.test(value.mobil)) {
                  result.push(value)
                  return
                } else if (regex.test(value.telefon)) {
                  result.push(value)
                  return
                } else if (regex.test(value.mail)) {
                  result.push(value)
                  return
                } else if (regex.test(removeAccents(value.empresa))) {
                  result.push(value)
                  return
                } else if (regex.test(value.nif)) {
                  result.push(value)
                  return
                } else if (regex.test(removeAccents(value.carrec))) {
                  result.push(value)
                  return
                } else if (regex.test(value.referencia)) {
                  result.push(value)
                  return
                } else if (regex.test(value.fax)) {
                  result.push(value)
                  return
                } else if (regex.test(removeAccents(value.notes))) {
                  result.push(value)
                  return
                }
              })
          
          filter.shift()
          return filterRows(result, filter)
        }

        return filterRows(docs, arrayfiltre)              
      },  
    },
    computed: {
      filteredFiles: function () {
        return this.filesmethod()
      }      
    },
    watch: {
      '$store.state.dades.persones': function () {       
          this.rows = []   
          let dades = this.$store.state.dades.persones
          dades.forEach(element => {
            this.rows.push(element)
          })
      }
    },
}

</script>

<style scoped>


  .taula {
    padding: 10px;
    height: 100vh;
  }



</style>