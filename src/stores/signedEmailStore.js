import {defineStore} from 'pinia';

export const useSignedEmailStore = defineStore('signedEmail', {
    state: () => ({

        signedEmail: null,
        preSignedUserSeq: null,

    }),

    getters: {
        getSignedEmail() {
            return this.signedEmail;
        },
        getPreSignedUserSeq() {
            return this.preSignedUserSeq;
        }
    },

    actions: {
        setSignedEmail(email) {
            this.signedEmail = email;
        },
        setPreSignedUserSeq(userSeq) {
            this.preSignedUserSeq = userSeq;
        }
    },
    //새로고침 시 데이터 유지
    persist: true
});