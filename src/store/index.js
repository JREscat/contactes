import { createStore } from 'vuex'
const {MongoClient} = require('mongodb');
const keytar = require('keytar')
const Store = require('electron-store');
const store = new Store();

export default createStore({
  state: {
    show: "persones",
    showAfegir: "persones",
    missatgeAfegir: 'persona ...',
    missatgeModal: '',
    mongoConfig: {
      url: null,      
      usuari: null,
      contrasenya: null, 
    },
    noServer: true,
    dades: {
      persones: {},
      empreses: {},
      editarPersona: {},
      editarEmpresa: {},
    },
    modal: {
      pensant: false,
      missatge: false,
    },
    filtre: "",
    modeFosc: 'clar',
    netejar: {
      persones: false,
      empreses: false,
    },
    guardar: {
      persones: false,
      empreses: false,
    },
  },
  mutations: {
    getMongoserver (state, payload) {
      state.mongoConfig.url = payload
    },
    getMongouser (state, payload) {
      state.mongoConfig.usuari = payload
    },
    getMongocontrasenya (state, payload) {
      state.mongoConfig.contrasenya = payload
    },
    assignarData (state, payload) {
      let clone = JSON.parse(JSON.stringify(payload.data)); 
      state.dades[payload.section] = clone
    },
    assignarModeFosc (state, payload) {
      store.set('modeFosc', payload)      
      state.modeFosc = payload
    },
    netejarFiltre (state) {
      state.filtre = ''
    },
    togglePensant (state) {
      state.modal.pensant = !state.modal.pensant
    },
    disablePensant (state) {
      state.modal.pensant = false
    },
    showModalMissatge(state, payload) {
      state.modal.pensant = false
      state.modal.missatge = true,
      state.missatgeModal = payload
    },
    changeSeccio (state, payload) {
      state.show = payload
    },
    changeSeccioAfegir (state, payload) {
      state.showAfegir = payload.seccio
      state.missatgeAfegir = payload.missatge
    },
      
  },
  actions: {
    getDataMongo({commit, state}, collection) {      
      let url = `mongodb://${state.mongoConfig.usuari}:${state.mongoConfig.contrasenya}@${state.mongoConfig.url}`
      if (state.mongoConfig.url == null || state.mongoConfig.url == '' || state.mongoConfig.url == undefined) {
         return
      }
      MongoClient.connect(url, function(err, db) {
        let missatgeerror = `No s'ha pogut accedir al servidor, s'ha produït el següent error: <br /> <span style="color: coral">${err}</span>`        
        if (err) throw commit('showModalMissatge', missatgeerror) 
        
        var dbo = db.db("contactes");
        dbo.collection(collection).find({}).toArray()
        .then(result => {
          commit('assignarData', {section: collection, data: result})          
          commit('disablePensant')
          db.close()
        })
        .catch(err => {
          commit('disablePensant')          
          db.close()
      })
      }); 
    },
    eliminarDataMongo({commit, dispatch, state}, payload) {
      let url = `mongodb://${state.mongoConfig.usuari}:${state.mongoConfig.contrasenya}@${state.mongoConfig.url}`
        return new Promise ((resolve, reject) => {
          MongoClient.connect(url, function(err, db) {
            if (err) {
              console.log(err)
              reject(err) 
            } 
            var dbo = db.db("contactes");          
            dbo.collection(payload.collection).deleteOne(payload.data).then( result => {
              db.close()              
              resolve(result)
            }).catch(err => {
              db.close()
              console.log(err)
              reject(err)
            })
           });
        })
    },

    editarDataMongo({commit, state}, payload) {
      let url = `mongodb://${state.mongoConfig.usuari}:${state.mongoConfig.contrasenya}@${state.mongoConfig.url}`
        console.log('editant')
        return new Promise ((resolve, reject) => {
          MongoClient.connect(url, function(err, db) {
            if (err) {
              console.log(err)
              reject(err) 
            } 
            var dbo = db.db("contactes");          
            dbo.collection(payload.collection).updateOne(payload.query, payload.data).then( result => {
              db.close()
              resolve(result)
            }).catch(err => {
              db.close()
              console.log(err)
              reject(err)
            })
           });
        })
    },

    afegirDataMongo({commit,state}, payload) {
      let url = `mongodb://${state.mongoConfig.usuari}:${state.mongoConfig.contrasenya}@${state.mongoConfig.url}`

        return new Promise ((resolve, reject) => {
          MongoClient.connect(url, function(err, db) {
            if (err) {
              console.log(err)
              reject(err) 
            } 
            var dbo = db.db("contactes");
            dbo.collection(payload.collection).insertOne(payload.data).then( result => {
              commit('disablePensant')     
              db.close()
              resolve(result)
            }).catch(err => {
              db.close()
              console.log(err)
              reject(err)
            })
           });
        })

      

    },
    updateEmpresa ({commit,state}, payload) {

      MongoClient.connect(url, function(err, db) {
        if (err) {
          console.log(err)
          reject(err) 
        } 
        var dbo = db.db("contactes");          
        dbo.collection(payload.collection).updateOne(payload.query, payload.data).then( result => {
          db.close()
        }).catch(err => {
          db.close()
          console.log(err)
        })
       });
    },
    keytarSet ({commit, state}, payload) {
      return new Promise ( (resolve, reject) => {
        keytar.setPassword('ContactesDAiS', payload.usuari, payload.contrasenya)
        .then( () => {
          resolve('fet')        
        }).catch( err => {
          reject(err)
        })
      })
    },
    saveCredentials({commit, dispatch, state}, payload) {
      return new Promise ((resolve, reject) => {
        dispatch('keytarSet', {usuari: payload.usuari, contrasenya: payload.contrasenya})
        .then( () => {
          store.set(
            {login: 
              {
              servidor:  payload.servidor,
              usuari: payload.usuari
              }              
            })
          commit('getMongoserver', payload.servidor)          
          commit('getMongouser', payload.usuari)          
          commit('getMongocontrasenya', payload.contrasenya)      
          state.noServer = false    
          resolve()
        }).catch( err => {
          state.noServer = true
          reject(err)
        })
      })
    }
    /*checkIdExists({commit, state}, payload) {
      let url = `mongodb://${state.mongoConfig.usuari}:${state.mongoConfig.contrasenya}@${state.mongoConfig.url}`      
      return new Promise ((resolve, reject) => {
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("contactes");    
          dbo.collection(payload.collection).findOne(payload.data).then (result => {
            db.close()
            if (result == null) {
              reject(false)
            } else {
              resolve(true)
            }            
          }).catch(err => {
            db.close()            
            reject(err)
          })
  
        }); 
      })
      
    }*/
  },
  modules: {
  }
})
