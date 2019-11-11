<template lang="pug">
  .container
    .columns
      .column.is-3.has-text-centered
        figure.media-left(v-if="track && track.album")
          p.image
            img(:src="track.album.images[0].url")
          p.button-bar
            a.button.is-primary.is-large
              span.icon(@click="selectTrack") ▶
      .column.is-8
        .panel
          .panel-heading
            h1.title {{trackTitle}}
          .panel-block
            article.media
              .media.content
                .content
                  ul(v-for="(v, k) in track")
                    li
                      strong {{k}}:&nbsp;
                      span {{v}}
              nav.level
                .level-left
                  a.level-item
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

// import trackService from '../services/track';
import trackMixin from '../mixins/track';

export default {
  mixins: [trackMixin],

  // data() {
  //   return {
  //     track: {},
  //   };
  // },

  computed: {
    ...mapState(['track']),
    ...mapGetters(['trackTitle']),
  },

  created() {
    const { id } = this.$route.params;

    if (!this.track || !this.track.id || this.track.id !== id) {
      this.getTrackById({ id })
        .then(() => {
          console.log('Track loaded...');
        });
    }

    // trackService.getById(id)
    //   .then((res) => {
    //     this.track = res;
    //   });
  },

  methods: {
    ...mapActions(['getTrackById']),
  },
};
</script>

<style lang="scss" scoped>
.columns {
  margin: 20px;
}

.button-bar {
  margin-top: 20px;
}
</style>
