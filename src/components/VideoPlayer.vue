<template>
  <div class="ratio ratio-16x9 m-0">
    <video ref="videoPlayer" class="video-js rounded-4 m-0" />
  </div>
</template>

<script>
import videojs from 'video.js';
import watermark from 'videojs-watermark';

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    videojs.registerPlugin('watermark', watermark);

    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log('onPlayerReady', this);
    });
    this.player.watermark({
      file: '../assets/logo.png',
      xrepeat: 1,
      opacity: 0.5,
    })
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>