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
    </vue-good-table>    
  </div>
</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';

export default {
    name: "Empreses",
    components: {
        VueGoodTable,
    },
    data() {
      return {
        columns: [
            {
                label: 'Empresa',
                field: 'empresa',
               
            },
            {
                label: 'Telefon',
                field: 'telefon',   
                tdClass: 'text-center',
                thClass: 'text-center',
            },
            {
                label: 'Fax',
                field: 'fax',   
                hidden: true
            },
            {
                label: 'Correu',
                field: 'mail',
                hidden: true   
            },
            {
                label: 'Adreça',
                field: 'adreca',   
                hidden: true
            },
            {
                label: 'Referencia',
                field: 'referencia',   
                hidden: true
            },
            {
                label: 'CIF',
                field: 'cif',   
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
         this.$store.commit('assignarData', {section: 'editarEmpresa', data: params.row})        
         this.$store.commit('changeSeccio', 'editempreses')      
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
          let arrayposition = filter.length - 1
          let regex =  new RegExp(filter[arrayposition],'ig');
          let result = []          
            rows.forEach(value => {
                if (regex.test(removeAccents(value.empresa))) {
                  result.push(value)
                  return
                } else if (regex.test(value.telefon)) {
                  result.push(value)
                  return
                } else if (regex.test(value.fax)) {
                  result.push(value)
                  return
                } else if (regex.test(value.mail)) {
                  result.push(value)
                  return
                } else if (regex.test(removeAccents(value.adreca))) {
                  result.push(value)
                  return
                } else if (regex.test(value.referencia)) {
                  result.push(value)
                  return
                } else if (regex.test(value.cif)) {
                  result.push(value)
                  return
                } else if (regex.test(removeAccents(value.notes))) {
                  result.push(value)
                  return
                }
              })
          
          filter.pop()
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
      '$store.state.dades.empreses': function () {
          let dades = this.$store.state.dades.empreses
          dades.forEach(element => {
            this.rows.push(element)
          })
      }
    }    

}

</script>

<style scoped>


  .taula {
    padding: 10px;
    height: 100vh;
  }



</style>