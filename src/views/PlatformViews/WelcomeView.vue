<template>
    <NavigationComponent />
    
    <video class="bg-video" playsinline autoplay muted loop>
        <source :src="bgVideo" type="video/mp4" />
    </video>

    <div class="masthead">
        <div class="masthead-content text-white">
          <div class="container-fluid px-4 px-lg-0">
            <img :src="zipchackMainImage" class="main-logo" />
            <!-- <h1 class="fst-italic lh-1 mb-4">Our SSAFYHOME is Coming Soon</h1>
            <p class="mb-5">
              We're working hard to finish the development of this site. Sign up
              below to receive updates and to be notified when we launch!
            </p> -->

            <div class="mouse_scroll">
              <div class="mouse">
                <div class="wheel"></div>
              </div>
              <div>
                <span class="m_scroll_arrows unu"></span>
                <span class="m_scroll_arrows doi"></span>
                <span class="m_scroll_arrows trei"></span>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import HomeViewScript from '@/assets/js/PlatformViewsScript/HomeViewScript.js';
export default HomeViewScript;
</script>

<style>
@import '@/assets/css/PlatformViewsStyle/HomeViewStyle.css';
</style>