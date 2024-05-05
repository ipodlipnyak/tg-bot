import { defineStore, acceptHMRUpdate } from 'pinia';
import { MessagesListResponseDto, MessageDto } from 'src/dto/telegram.dto';

export const useEventsStore = defineStore('events', {
  // arrow function recommended for full type inference
  state: () => ({
    messages: [] as MessageDto[],
    lastMessage: '',
    messagesPending: false,
  }),

  actions: {
    async fetchAll() {
      this.messagesPending = true;

      const { data, pending, error, refresh } = await useFetch('/api/tg');
      const response = data.value as MessagesListResponseDto;
      if (response?.status === 'success') {
        this.messages = response.payload || [];
      }

      this.messagesPending = false;
    },
    passMessage(message: string) {
      this.lastMessage = message;
    }
  },

  getters: {
    //
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot));
}
