<template>
  <v-container>
    <v-card
      color="green"
      variant="tonal"
      :loading="eventStore.messagesPending"
    >
      <v-toolbar>
        <v-toolbar-title>Messages</v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-refresh" :loading="eventStore.messagesPending" @click="eventStore.fetchAll"></v-btn>
      </v-toolbar>


      <v-card-item>
        <v-virtual-scroll
          height="60vh"
          :items="eventStore.messages"
        >
          <template v-slot:default="{ item }">
            <v-list-item
              color="primary"
              rounded="shaped"
            >
              <template v-slot:prepend>
                <v-chip class="mr-4">{{ item.chat_id }}</v-chip>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card-item>

      <v-card-actions>
        <v-btn variant="flat" prepend-icon="mdi-chat" block href="https://t.me/CyphroclerkBot">Chat with me</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { useEventsStore } from 'client/stores';
import { defineComponent } from 'vue';

export default defineComponent({
  middleware(ctx) {
    //
  },
  setup() {
    const eventStore = useEventsStore();
    eventStore.fetchAll();
    return {
      eventStore,
    };
  },
})
</script>

<style lang="scss" scoped>
</style>
