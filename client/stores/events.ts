import { defineStore, acceptHMRUpdate } from 'pinia';
import { RestListResponseDto } from 'src/dto/rest-response.dto';
import { TelegramMessageDto } from 'src/dto/telegram.dto';

export const useEventsStore = defineStore('events', {
  // arrow function recommended for full type inference
  state: () => ({
    messages: [] as TelegramMessageDto[],
    lastMessage: '',
  }),

  actions: {
    async fetchAll() {
      this.eventsPending = true;

      const { data, pending, error, refresh } = await useFetch('/api/');
      const response = data.value as RestListResponseDto;
      if (response?.status === 'success') {
        this.events = response.payload || [];
      }

      this.eventsPending = false;
    },
  },

  getters: {
    //
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot));
}
