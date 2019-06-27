<template lang="pug">
  .widget-booking-salon
    h2 {{ title }}
    el-form#step-0
      el-form-item#input-date(label='Fecha')
        el-date-picker(v-model='bookingDate', type='date', align='center', format='dd-MM-yyyy', placeholder='Pick a day', :picker-options='datePickerOptions')
      el-form-item#btn-reservar
        el-button(@click='dialogBookingVisible = true') Reservar
    el-dialog(title='Agendate en nuestros salones', :fullscreen='window.width < 997', :visible.sync='dialogBookingVisible')
      el-collapse(v-model='collapseValue', accordion='')
        el-form(label-width='60px', label-position='left')
          el-collapse-item(title='Tu reserva', name='1')
            el-form-item(label='Fecha')
              el-date-picker(v-model='bookingDate', type='date', align='center', format='dd-MM-yyyy', placeholder='Pick a day', :picker-options='datePickerOptions')
            el-form-item(label='Hora')
              el-select(v-model='bookingHour', placeholder='Seleccione una hora')
                el-option(v-for='item in hourList', :key='item.value', :label='item.value', :value='item.value')
            el-form-item(label='Salón')
              el-select(v-model='bookingSalon', placeholder='Seleccione un salón')
                el-option(v-for='item in salonList', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(label='Salón')
              el-select(v-model='bookingService', placeholder='Seleccione un servicio')
                el-option(v-for='item in serviceList', :key='item.value', :label='item.value', :value='item.value')
            el-form-item
              el-button(:disabled='bookingClientDataActive', @click="collapseValue = '2'")
                | Siguiente
          el-collapse-item(:disabled='bookingClientDataActive', title='Tus datos', name='2')
            el-form-item(label='Nombre')
              el-input(v-model='customerName')
            el-form-item(label='Apellido')
              el-input(v-model='customerSurname')
            el-form-item(label='Teléfono')
              el-input(v-model='customerPhone')
            el-form-item(label='Email')
              el-input(v-model='customerEmail')
            el-form-item
              el-button(:disabled='bookingResumeDataActive', @click="collapseValue = '3'")
                | Siguiente
          el-collapse-item(:disabled='bookingResumeDataActive', title='Confirmá tus datos', name='3')
</template>


<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
import EventBus from "../../eventBus";

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: "Agendate"
    }
  },
  data() {
    var vm = this;
    return {
      turns: new Array<object>(),
      turnsDate: new Array<string>(),
      dialogBookingVisible: false,
      collapseValue: "1",
      bookingDate: new Date(),
      bookingHour: undefined,
      bookingSalon: undefined,
      bookingService: undefined,
      customerName: undefined,
      customerSurname: undefined,
      customerPhone: undefined,
      customerEmail: undefined,
      hourList: [
        { value: "08:00" },
        { value: "08:30" },
        { value: "09:00" },
        { value: "09:30" },
        { value: "10:00" },
        { value: "10:30" },
        { value: "11:00" },
        { value: "11:30" },
        { value: "12:00" },
        { value: "12:30" },
        { value: "13:00" },
        { value: "13:30" },
        { value: "14:00" },
        { value: "14:30" },
        { value: "15:00" },
        { value: "15:30" },
        { value: "16:00" },
        { value: "16:30" },
        { value: "17:00" },
        { value: "17:30" },
        { value: "18:00" },
        { value: "18:30" },
        { value: "19:00" },
        { value: "19:30" },
        { value: "20:00" },
        { value: "20:30" }
      ],
      salonList: [
        {
          value: "portones",
          label: "Portones Shopping"
        },
        {
          value: "brunel",
          label: "Portal Brunel"
        },
        {
          value: "americas",
          label: "Portal Americas"
        }
      ],
      serviceList: [
        {
          value: "Lavado L’Oréal"
        },
        {
          value: "Lavado Kerastase"
        },
        {
          value: "Lavado Redken"
        },
        {
          value: "Brushing"
        }
      ],
      datePickerOptions: {
        disabledDate(date: Date, ot: string) {
          console.log(Vue.prototype.$turnsDate, moment(date).format("YYMMDD"));
          const minDate = new Date();
          const maxDate = new Date();
          console.log(ot);
          minDate.setDate(minDate.getDate() - 1);
          maxDate.setDate(maxDate.getDate() + 30);
          if (date <= minDate) {
            return true;
          } else if (date >= maxDate) {
            return true;
          } else if (vm.turnsDate.includes(moment(date).format("YYMMDD"))) {
            return false;
            console.log(date);
          } else {
            return true;
          }
        }
      },
      window: {
        width: 0,
        height: 0
      }
    };
  },
  computed: {
    bookingClientDataActive() {
      if (
        this.bookingDate &&
        this.bookingHour &&
        this.bookingSalon &&
        this.bookingService
      ) {
        return false;
      }
      return true;
    },
    bookingResumeDataActive() {
      if (
        this.customerName &&
        this.customerSurname &&
        this.customerPhone &&
        this.customerEmail
      ) {
        return false;
      }
      return true;
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    EventBus.$on("eventAuthActualizada", async () => {
      const turnsRefs = await firebase
        .firestore()
        .collection(
          "Sites/8DgciBZUYfrLfnKonpml/modules/salon-booking/availability"
        )
        .where("turn", ">", new Date())
        .get();
      const turns = new Array<object>();
      turnsRefs.forEach(element => {
        const date = moment(element.data().turn.toDate());
        turns.push({
          id: element.id,
          turn: {
            date: new Date(
              element
                .data()
                .turn.toDate()
                .toDateString()
            ),
            turn: `${element
              .data()
              .turn.toDate()
              .getHours()}:${element
              .data()
              .turn.toDate()
              .getMinutes()}`
          }
        });
        const dateString = `${date.format("YYMMDD")}`;
        console.log(dateString);
        this.turnsDate.push(dateString);
      });
      this.turns = turns;
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
});
</script>
