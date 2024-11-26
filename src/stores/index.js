import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth",{
    state: () => ({
        jwtToken: null,
        name: null,
    }),
    getters: {
        getJwtToken: state => state.jwtToken,
        getName: state => state.name
    },
    actions: {
        setJwtToken(token) {
            this.jwtToken = token;
            localStorage.setItem('jwt', token);
        },
        clearToken(){
            this.token = null;
            localStorage.removeItem('jwt');
        },
        setName(name){
            this.name = name;
        },
        clearName(){
            this.name=null;
        }
    }
})