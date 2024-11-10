import { ref, onMounted, onBeforeUnmount } from 'vue';
import zipchackMain from '@/assets/resources/images/zipchack_mainbg_2.png';
import bgmp4 from '@/assets/resources/videos/bg.mp4';

export default {
  setup() {
    const zipchackMainImage = zipchackMain;
    const bgVideo = bgmp4;
    const page = ref(0);

    const doScroll = (event) => {
      const container = document.getElementsByClassName("container");
      const lastPage = container.length - 1;
      const wrap = document.getElementsByClassName("wrap")[0];
      // const menu = document.getElementsByClassName("menu")[0];

      if (event.deltaY > 0) {
        page.value++;
        // if (menu) menu.style.display = "none";
      } else {
        page.value--;
        // if (menu) menu.style.display = "flex";
      }

      if (page.value < 0) {
        page.value = 0;
      } else if (page.value > lastPage) {
        page.value = lastPage;
        // if (menu) menu.style.display = "flex";
      }

      if (wrap) {
        wrap.style.top = page.value * -100 + "vh";
      }

      window.removeEventListener("wheel", doScroll);
    };

    const scrollToTop = () => {
      const wrap = document.getElementsByClassName("wrap")[0];
      const goTop = document.getElementsByClassName("scroll-to-top")[0];
      const menu = document.getElementsByClassName("menu")[0];

      page.value = 0;
      if (wrap) wrap.style.top = "0vh";
      if (menu) menu.style.display = "flex";
      if (goTop) goTop.style.opacity = "0";

      window.addEventListener("wheel", doScroll, { passive: false });
    };

    const updateScrollButtonVisibility = () => {
      const goTop = document.getElementsByClassName("scroll-to-top")[0];
      if (goTop) goTop.style.opacity = page.value > 0 ? "1" : "0";
    };

    onMounted(() => {
      window.addEventListener("wheel", doScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("wheel", doScroll);
    });

    return {
      zipchackMainImage,
      bgVideo,
      page,
      scrollToTop,
      updateScrollButtonVisibility,
    };
  }
};
