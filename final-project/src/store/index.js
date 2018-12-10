
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    setUser (state, payload) {
        state.user = payload
    },
    setError (state, payload) {
    state.error = payload
    },
    setLoading (state, payload) {
    state.loading = payload
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
        commit('setLoading', true)
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          var user = firebase.auth().currentUser;

          user.sendEmailVerification().then(function() {
            if(user.emailVerified) {
              commit('setUser', {email: firebaseUser.user.email})
              commit('setLoading', false)
              router.push('/home')
              commit('setError', null)
            }
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
      },
      userSignIn ({commit}, payload) {
        commit('setLoading', true)
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', {email: firebaseUser.user.email})
          commit('setLoading', false)
          commit('setError', null)
          router.push('/home')
        })
        .catch(error => {
          alert("Wrong Email or Incorrect Password")
          commit('setError', error.message)
          commit('setLoading', false)
        })
      }
  },
  getters: {}
})
