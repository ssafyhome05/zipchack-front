import { ref, onMounted, onBeforeUnmount } from 'vue';
import zipchackMain from '@/assets/resources/images/zipchack_mainbg_2.png';
import bgmp4 from '@/assets/resources/videos/bg.mp4';
import { useScrollStore } from '@/stores/scrollStore';

export default {
  setup() {
    const zipchackMainImage = zipchackMain;
    const bgVideo = bgmp4;
    const scrollStore = useScrollStore();

    const handleScroll = (event) => {
      if (event.deltaY > 0) {
        scrollStore.scrollDown();
      }
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

    onMounted(() => {
      const bodyElement = document.querySelector('.wrap');
      console.log("asdas", bodyElement)
      bodyElement.addEventListener('wheel', handleScroll);
      // window.addEventListener('wheel', handleScroll, { passive: false });
    });
    
    onBeforeUnmount(() => {
      // window.removeEventListener('wheel', handleScroll);
    });

    return {
      zipchackMainImage,
      bgVideo,
      // page
      scrollToTop
    };
  }
};
