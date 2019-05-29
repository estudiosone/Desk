<template lang="pug">
  .widget-booking-salon
    h2 {{ title }}
    el-form#step-0
      el-form-item#input-date(label='Fecha')
        el-date-picker(v-model='bookingDate', type='date', align='center', format='dd-MM-yyyy', placeholder='Pick a day', :picker-options='datePickerOptions')
      el-form-item#btn-reservar
        el-button(@click='dialogBookingVisible = false') Reservar
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

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: "Agendate"
    }
  },
  data() {
    return {
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
        disabledDate(date: any) {
          const d = new Date();
          d.setDate(d.getDate() - 1);
          return date <= d;
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
