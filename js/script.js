/* PROBLEMA CON LA DATA 
  La data viene presa in formato anglosassone (probabilmente) e sia jsDate sia formatDate restituiscono Invalid Date nel caso di Fabio e Samuele (infatti, prima data di Fabio - cambiata da me - con prime cifre minori di 13 non dà problemi). Provato: cambiare impostazioni browser e computer, caricato sito su computer italiano, modificato lang in html/head, ma problema rimane. 
*/

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
            date: "12/03/2020 16:30:00",
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

    userSearch: "",

    // search="",
  },

  methods: {
    handleContactSelection: function (contact, contactIndex) {
      // console.log(contact, contactIndex);
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
      }, 1000);
    },

    // restituisce la data attuale completa in formato js Date
    timeNow: function () {
      let now = new Date();
      return now;
    },

    // converte una data in formato stringa in un oggetto js (necessario per standard deprecato in libreria moment - dayjs non sembra avere questo problema, ma per adesso lo tengo)
    jsDate: function (date) {
      // console.log("date", date);
      let regularDate = new Date(date);
      // console.log("reg", regularDate);
      return regularDate;
    },

    // converte data ricevuta in formato desiderato (solo ore e minuti in formato 24 ore)
    formatDate: function (date) {
      return dayjs(date).format("HH:mm");
    },

    // restituisce la data dell'ultimo messaggio spedito dall'interlocutore
    interlocutorLastAccess: function () {
      let arr = this.contacts[this.contactIndex].messages.filter(
        (msg) => msg.status === "received"
      );
      let index = arr.length - 1;
      return arr[index].date;
    },

    // gestisce la search: prende il valore dell'input da userSearch e, in base alla corrispondenza fra questo valore e la proprietà name di ogni oggetto in contacts, modifica la proprietà visible in contacts
    handleSearch: function() {
      this.contacts.forEach(contact => 
        this.userSearch ===  "" ? 
          contact.visible = true : 
          contact.name.startsWith(this.userSearch) ? 
            contact.visible = true : 
            contact.visible = false 
      );
    },

    // cancella il messaggio user selezionato
    handleDelete: function(messageIndex) {
      this.contacts[this.contactIndex].messages = this.contacts[this.contactIndex].messages
        .filter((msg, index) => index !== messageIndex);
    },

    // funziona come toggle per display (block / none) di message-delete
    handleDeleteOpener: function(id) {
      let target = document.querySelector(".message-delete");
      target.style.color = "green"
      // target.style.display === "none" ?
      //   target.style.display = "block" :
      //   target.style.display = "none" ;
      // console.log(this, id)
    }
  },
});

Vue.config.devtools = true;
