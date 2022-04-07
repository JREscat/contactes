<template>
    <div class="afegir" :class="$store.state.modeFosc">
        <div class="mini-menu-wrapper pb-2">        
            <a @click="$store.commit('changeSeccioAfegir', {seccio:'persones', missatge: 'persona ...'})"><i class="fa-solid fa-users icon-mini-menu" :class="{active: $store.state.showAfegir == 'persones'}" title="Persones"></i></a>
            <a @click="$store.commit('changeSeccioAfegir', {seccio:'empreses', missatge: 'empresa ...'})"><i class="fa-solid fa-industry icon-mini-menu"  :class="{active: $store.state.showAfegir == 'empreses'}" title="Empreses"></i></a>   
            <span class="missatge ms-2">Afegint {{$store.state.missatgeAfegir}}</span>     
            <span class="mini-menu">
                <a @click="afegir()"><i class="fa-solid fa-save icon-mini-menu" title="Guardar" v-show="!$store.state.noServer"></i></a>
                <a @click="netejarFormulari()"><i class="fa-solid fa-undo icon-mini-menu" title="Netejar formulari"></i></a>
            </span>
        </div>
        <AfegirPersones v-show="$store.state.showAfegir == 'persones'"/>
        <AfegirEmpreses v-show="$store.state.showAfegir == 'empreses'"/>
    </div>
</template>

<script>

import AfegirPersones from './AfegirPersones.vue'
import AfegirEmpreses from './AfegirEmpreses.vue'

export default {
    name: 'Afegir',    
    components: {
        AfegirPersones,
        AfegirEmpreses
    },
    data () {
        return {
            netejar: ''
        }
    },
    methods: {
        netejarFormulari() {
            if (this.$store.state.showAfegir == 'persones') {
                this.$store.state.netejar.persones = true
            } 
            if (this.$store.state.showAfegir == 'empreses') {
                this.$store.state.netejar.empreses = true
            } 
        },
        afegir () {
            if (this.$store.state.showAfegir == 'persones') {
                this.$store.state.guardar.persones = true
            } else if (this.$store.state.showAfegir == 'empreses') {
                this.$store.state.guardar.empreses = true
            } 

        }
    }

}
</script>

<style scoped>








</style>