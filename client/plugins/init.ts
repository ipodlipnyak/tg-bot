import { useEventsStore } from "../stores";
import io from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:beforeMount', async () => {
      const socket = io('http://localhost:3000/');
      socket.on('connect', function() {
        console.log('Connected');
      });
      socket.on('events', function(data) {
        const eventStore = useEventsStore();
        eventStore.passMessage(data);
        eventStore.fetchAll();
      });
      socket.on('exception', function(data) {
        console.log('event', data);
      });
      socket.on('disconnect', function() {
        console.log('Disconnected');
      });
    })
})
