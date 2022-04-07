<template>
    <nav class="navbar navbar-dark bg-dark justify-content-between ">
       
        <form class="form-inline ms-3">
          <div class="input-group">
            <button class="btn btn-light" type="button"><i class="fas fa-search" title="Obrir enllas"></i></button>
            <input type="text" class="form-control bg-light" placeholder="Filtrar ..." id="filtrar" v-model="$store.state.filtre" v-on:input="creueta = true">
            <span id="creueta" v-show="creueta" @click="$store.commit('netejarFiltre'); creueta = false"><i class="fa-solid fa-times"></i></span>            
          </div>
        </form>      

        <ul id="botonsnavegacio">  
          <li class="nav-item">
            <button type="button" class="btn btn-dark" v-show="!$store.state.noServer" @click="$store.commit('changeSeccio', 'afegir')"><i class="fa-solid fa-plus iconanav" title="Afegir ..." :class="{active: $store.state.show == 'afegir'}"></i></button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-dark" @click="$store.commit('changeSeccio', 'persones'); $store.commit('changeSeccioAfegir', {seccio:'persones', missatge: 'persona ...'})"><i class="fa-solid fa-users iconanav" :class="{active: $store.state.show == 'persones'}" title="Persones"></i></button>                
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-dark" @click="$store.commit('changeSeccio', 'empreses'); $store.commit('changeSeccioAfegir', {seccio:'empreses', missatge: 'empresa ...'})"><i class="fa-solid fa-industry iconanav" :class="{active: $store.state.show == 'empreses'}" title="Empreses"></i></button>                  
          </li>
        </ul>

    </nav>
    
</template>

<script>
import { ObjectId } from "mongodb"
export default {
    name: "NavBar",
    data () {
        return {
            creueta: false,
            filtre: ""

        }
    },


}
</script>

<style scoped>

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

nav li {
  float: left;
}

nav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}

.iconanav {
    font-size: 1.3rem;
}

#creueta {
  position: relative;
  color:#7d7e81;
  top: 8px;
  right: 20px;
  z-index: 100;  
  cursor: pointer;
}

#creueta:hover{
  color: coral
}

.btn-dark:hover {
    background-color: #212529;
    border-color: #212529;
    outline: none;
    color: coral;
}

input:focus {
  outline: none;
  box-shadow: none;
  border-color: white;  
}

.btn-light:hover {
    cursor: default;
}

.btn-light:focus {
  outline: none;
  box-shadow: none;
}
.active {
  color: coral;
}

.btn-check:focus+.btn-dark, .btn-dark:focus {
    background-color: #212529;
    border-color: #212529;
    outline: none;
    box-shadow: none;
}

</style>