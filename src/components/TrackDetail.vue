<template lang="pug">
  .container
    .columns
      .column.is-5.is-offset-4
        pm-track(v-bind:track="track")
</template>

<script>
import PmTrack from './Track.vue';
import trackService from '../services/track';

export default {
  components: { PmTrack },

  data() {
    return {
      track: {},
    };
  },

  created() {
    const { id } = this.$route.params;

    trackService.getById(id)
      .then((res) => {
        this.track = res;
      });
  },
};
</script>

<style lang="scss" scoped>
.columns {
  margin: 20px;
}
</style>
