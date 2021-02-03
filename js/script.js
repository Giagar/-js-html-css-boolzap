var app = new Vue({
  el: "#root",

  data: {
    contacts: [
      {
        name: "Michele",
        avatar: "avatar_1.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            text: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Ricordati di dargli da mangiare",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            text: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "avatar_2.jpg",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            text: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            text: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            text: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "avatar_3.jpg",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            text: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            text: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            text: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Luisa",
        avatar: "avatar_4.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            text: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
    ],

    contactIndex: 0,

    userMessage: "", // var creata per poter poi svuotare l'input
  },

  methods: {
    
    handleContactSelection: function(contact, contactIndex) {
      console.log(contact, contactIndex);
      this.contactIndex = contactIndex;
    },

    handleSubmit(msg) {
      this.userMessage = msg; // passo attraverso userMessage invece di usare direttamente msg per poter poi svuotare l'input

      this.contacts[this.contactIndex].messages.push({
        date: this.timeNow(),
        text: this.userMessage,
        status: "sent",
      });
      
      this.userMessage = "";

      setTimeout(() => {
        this.contacts[this.contactIndex].messages.push({
          date: this.timeNow(),
          text: "ok",
          status: "received",
        });
      }, 1000)
    },

    // restituisce la data attuale completa in formato js Date
    timeNow: function() {
      let now = new Date();
      return now;
    },

    // converte una data in formato stringa in un oggetto js (necessario per standard deprecato in libreria moment)
    jsDate: function(date) {
      let regularDate = new Date(date);
      return regularDate;
    },

    // converte data ricevuta in formato desiderato (solo ore e minuti in formato 24 ore)
    formatDate: function(date) {
      return moment(date).format('HH:mm');
    },

    // restituisce la data dell'ultimo messaggio spedito dall'interlocutore
    interlocutorLastAccess: function() {
      let arr = this.contacts[this.contactIndex].messages.filter(msg => msg.status === "received");
      let index = arr.length - 1;
      return arr[index].date;
    },
  }
});

Vue.config.devtools = true;
