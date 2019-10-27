<template lang="pug">
  .container
    .columns
      .column.is-5.is-offset-4      v-bind:class="{'is-active': t.id === selectedTrack}"
        .notification.is-success(v-show="notificationType==='Success'")
          slot(name="body") Something went wrong
        .notification.is-danger(v-show="notificationType==='Failed'")
          slot(name="body") Something went wrong
</template>

<script>
export default {
  props: {
    notificationType: { // "Success", "Failed"
      type: String,
      required() {
        return true;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .notification {
    margin: 10px;
  }
</style>
