import { defineStore } from "pinia";

export const useSpotRouteStore = defineStore('spotRoute', {
    state: () => ({
        routeList: [],
        spotRouteList: [],
    }),

    getters: {
        getRoute(){
            return this.routeList;
        },

        getSpotRoute(){
            return this.spotRouteList;
        }
    },

    actions: {
        addRoute(route){
            this.routeList.push(route);
        },

        addSpotRoute(route){
            this.spotRouteList.push(route);
        },

        initRoute(){
            this.routeList = null;
            this.spotRouteList = null;
        }
    }
});