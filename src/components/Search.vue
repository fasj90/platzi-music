<template lang="pug">
  main
    transition(name="move")
      pm-notification(v-show="showNotification" v-bind:notification-type="notificationType")
        p(slot="body") {{notificationMessage}}

    transition(name="move")
      pm-loader(v-show="isLoading")

    section.section(v-show="!isLoading")
      nav.nav
        .container
          input.input.is-large(
            type="text",
            placeholder="Buscar canciones",
            v-model="searchQuery",
            v-on:keyup.enter="search"
          )
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;
      .container
        p
          small {{ searchMessage }}

      .container.results
        .columns.is-multiline
          .column.is-one-quarter(v-for="t in tracks")
            pm-track(
              v-blur="t.preview_url",
              v-bind:class="{'is-active': t.id === selectedTrack}",
              v-bind:track="t",
              v-on:select="setSelectedTrack")
</template>

<script>
import trackService from '../services/track';

import PmTrack from './Track.vue';

import PmLoader from './shared/Loader.vue';
import PmNotification from './shared/Notification.vue';

export default {
  name: 'app',

  components: {
    PmTrack,
    PmLoader,
    PmNotification,
  },

  data() {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      selectedTrack: '',
      showNotificationSuccess: false,
      showNotificationFailed: false,
    };
  },

  watch: {
    showNotification() {
      if (this.showNotification) {
        setTimeout(() => {
          this.hideNotifications();
        }, 3000);
      }
    },
  },

  computed: {
    searchMessage() {
      return `Found: ${this.tracks.length}`;
    },
    showNotification() {
      return this.showNotificationSuccess || this.showNotificationFailed;
    },
    notificationMessage() {
      let message = 'N/A';
      if (this.showNotificationSuccess) {
        message = `${this.tracks.length} tracks found.`;
      } else if (this.showNotificationFailed) {
        message = 'No tracks found.';
      }
      return message;
    },
    notificationType() {
      if (this.showNotificationSuccess) {
        return 'Success';
      }
      if (this.showNotificationFailed) {
        return 'Failed';
      }

      return 'N/A';
    },
  },

  methods: {
    search() {
      if (!this.searchQuery) { return; }
      this.isLoading = true;
      trackService.search(this.searchQuery)
        .then((res) => {
          if (res.tracks.total > 0) {
            this.showNotificationSuccess = true;
            this.showNotificationFailed = false;
          } else {
            this.showNotificationSuccess = false;
            this.showNotificationFailed = true;
          }

          this.tracks = res.tracks.items;
          this.isLoading = false;
        });
    },
    setSelectedTrack(id) {
      this.selectedTrack = id;
    },
    hideNotifications() {
      this.showNotificationSuccess = false;
      this.showNotificationFailed = false;
    },
  },
};
</script>

<style lang="scss">
  .results {
    margin-top: 50px;
  }

  .is-active {
    border: 3px #48c774 solid;
  }
</style>
