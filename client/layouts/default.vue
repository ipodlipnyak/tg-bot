<template>
  <v-app>
    <v-main>
      <slot />
    </v-main>

  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup(props, ctx) {

      return {
      };
    },
  })
</script>

<style lang="scss" scoped>
</style>
