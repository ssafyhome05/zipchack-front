import { defineStore } from 'pinia';

export const useScrollStore = defineStore('scroll', {
  state: () => ({
    page: 0,
  }),
  actions: {
    scrollDown() {
      const container = document.getElementsByClassName('container');
      const lastPage = container.length - 1;
      const wrap = document.getElementsByClassName('wrap')[0];
      const menu = document.getElementsByClassName('menu')[0];

      this.page++;
      if (menu) menu.style.display = 'none';

      if (this.page > lastPage) {
        this.page = lastPage;
        if (menu) menu.style.display = 'flex';
      }

      if (wrap) {
        wrap.style.top = this.page * -100 + 'vh';
      }
    },

    scrollToTop() {
      const wrap = document.getElementsByClassName('wrap')[0];
      const goTop = document.getElementsByClassName('scroll-to-top')[0];
      const menu = document.getElementsByClassName('menu')[0];

      this.page = 0;
      if (wrap) wrap.style.top = '0vh';
      if (menu) menu.style.display = 'flex';
      if (goTop) goTop.style.opacity = '0';
    },
  },
});
