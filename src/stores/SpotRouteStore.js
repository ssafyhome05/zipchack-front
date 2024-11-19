import { defineStore } from "pinia";

export const useSpotRouteStore = defineStore('spotRoute', {
    state: () => ({
        routeList: [],
    }),

    getters: {
        getRoute(){
            return this.routeList;
        }
    },

    actions: {
        addRoute(route){
            this.routeList.push(route);
        },

        initRoute(){
            this.routeList = null;
        }
    }
});