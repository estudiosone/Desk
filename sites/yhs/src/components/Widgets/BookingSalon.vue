<template lang="pug">
  .widget-booking-salon
    h2 {{ title }}
    el-form#step-0
      el-form-item#input-date(label='Fecha')
        el-date-picker(v-model='data.bookingDate', type='date', align='center', format='dd-MM-yyyy', placeholder='Pick a day', :picker-options='datePickerOptions')
      el-form-item#btn-reservar
        el-button(@click='dialogBookingVisible = true') Reservar
    el-dialog(title='Agendate en nuestros salones', :fullscreen='window.width < 997', :visible.sync='dialogBookingVisible')
      el-collapse(v-model='collapseValue', accordion='')
        el-form(label-width='120px', label-position='left', :rules="rules", :model="data")
          el-collapse-item(title='Tu reserva', name='1')
            el-form-item(label='Fecha')
              el-date-picker(v-model='data.bookingDate', type='date', align='center', format='dd-MM-yyyy', placeholder='Pick a day', :picker-options='datePickerOptions' @change="changeBookingDate")
            el-form-item(label='Salón')
              el-select(v-model='data.bookingSalon', placeholder='Seleccione un salón', @change="changeBookingSalon")
                el-option(v-for='item in this.$store.state.salonBooking.beautySalons', :key='item.id', :label='item.name', :value='item.id')
            el-form-item(label='Turno', v-if="data.bookingSalon")
              el-select(v-model='data.bookingHour', placeholder='Seleccione una hora', no-data-text="No hay turnos disponibles en este salón")
                el-option(v-for='item in hourList', :key='item.value', :label='item.value', :value='item.value')
            el-form-item(label='Servicios', v-if="data.bookingHour")
              el-select(v-model='data.bookingService', placeholder='Seleccione un servicio')
                el-option(v-for='item in this.$store.state.salonBooking.services', :key='item.id', :label='item.name', :value='item.id')
            el-form-item
              el-button(:disabled='bookingClientDataActive', @click="collapseValue = '2'")
                | Siguiente
          el-collapse-item(:disabled='bookingClientDataActive', title='Tus datos', name='2')
            el-form-item(label='Nombre', prop="customerName")
              el-input(v-model='data.customerName')
            el-form-item(label='Apellido', prop="customerSurname")
              el-input(v-model='data.customerSurname')
            el-form-item(label='Teléfono', prop="customerPhone")
              el-input(v-model='data.customerPhone')
            el-form-item(label='Email', prop="customerEmail")
              el-input(v-model='data.customerEmail')
            el-form-item
              el-button(:disabled='bookingResumeDataActive', @click="collapseValue = '3'")
                | Siguiente
          el-collapse-item(:disabled='bookingResumeDataActive', title='Confirmá tus datos', name='3')
            el-divider Datos de la reserva
            div
              span Fecha:
              span {{ sumary.bookingDate }}
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
    return {
      turns: new Array<object>(),
      turnsDate: new Array<string>(),
      dialogBookingVisible: false,
      collapseValue: "1",
      hourList: new Array<{ value: string }>(),
      salonListLoading: false,
      datePickerOptions: {
        disabledDate(date: Date, ot: string) {
          const minDate = new Date();
          const maxDate = new Date();
          minDate.setDate(minDate.getDate() - 1);
          maxDate.setDate(maxDate.getDate() + 30);
          if (date <= minDate) {
            return true;
          } else if (date >= maxDate) {
            return true;
          }
        }
      },
      data: {
        bookingDate: new Date(),
        bookingHour: undefined,
        bookingSalon: undefined,
        bookingService: undefined,
        customerName: undefined,
        customerSurname: undefined,
        customerPhone: undefined,
        customerEmail: undefined
      },
      rules: {
        customerName: [
          {
            required: true,
            message: "Debe ingresar su nombre",
            trigger: "blur"
          }
        ],
        customerSurname: [
          {
            required: true,
            message: "Debe ingresar su apellido",
            trigger: "blur"
          }
        ],
        customerPhone: [
          {
            required: true,
            message: "Debe ingresar su teléfono",
            trigger: "blur"
          }
        ],
        customerEmail: [
          {
            required: true,
            message: "Debe ingresar su e-mail",
            trigger: "blur"
          }
        ]
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
        this.data.bookingDate &&
        this.data.bookingHour &&
        this.data.bookingSalon &&
        this.data.bookingService
      ) {
        return false;
      }
      return true;
    },
    bookingResumeDataActive() {
      if (
        this.data.customerName &&
        this.data.customerSurname &&
        this.data.customerPhone &&
        this.data.customerEmail
      ) {
        return false;
      }
      return true;
    },
    sumary() {
      const nn = moment().format("dddd, DD [de] MMMM [de] YYYY");
      return {
        bookingDate: nn
      };
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
        this.turnsDate.push(dateString);
      });
      this.turns = turns;
    });
  },
  async mounted() {
    await this.$store.dispatch("salonBooking/initialization");
    // const result = await firebase
    //   .firestore()
    //   .collection("Sites/8DgciBZUYfrLfnKonpml/modules/salon-booking/services")
    //   .get();
    // result.forEach((element: any) => {
    //   this.serviceList.push({ value: element.data()!.name });
    // });
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    async changeBookingDate() {
      this.data.bookingSalon = undefined;
      this.changeBookingSalon();
    },
    async changeBookingSalon() {
      this.data.bookingHour = undefined;
      this.hourList = new Array<{ value: string }>();
      const beautySalon = this.$store.state.salonBooking.beautySalons.find(
        (x: any) => x.id === this.data.bookingSalon
      );
      if (beautySalon.shiftBasedOnSchedule) {
        const dayOfWeek: number = moment(this.data.bookingDate).day();
        const schedule = beautySalon.schedule[dayOfWeek];
        if (schedule.open !== "" && schedule.close !== "") {
          const open = moment(this.data.bookingDate);
          const openHour = parseInt(schedule.open.split(":")[0], 10);
          const openMinutes = parseInt(schedule.open.split(":")[1], 10);
          open.hours(openHour);
          open.minute(openMinutes);
          open.second(0);
          const close = moment(this.data.bookingDate);
          const closeHour = parseInt(schedule.close.split(":")[0], 10);
          const closeMinutes = parseInt(schedule.close.split(":")[1], 10);
          close.hour(closeHour);
          close.minute(closeMinutes);
          close.second(0);
          while (open.format("HH:mm") !== close.format("HH:mm")) {
            if (moment().isBefore(open)) {
              this.hourList.push({ value: open.format("HH:mm") });
            }
            open.add(30, "minutes");
          }
        }
      } else {
        const result = await firebase
          .firestore()
          .doc(
            `Sites/8DgciBZUYfrLfnKonpml/modules/salon-booking/availability/${moment(
              this.data.bookingDate
            ).format("YYMMDD")}-${this.data.bookingSalon}`
          )
          .get();
        this.hourList = new Array<{ value: string }>();
        if (result.exists) {
          result.data()!.turns.forEach((element: string) => {
            this.hourList.push({ value: element });
          });
        }
      }

      this.changeBookingShift();
    },
    async changeBookingShift() {
      this.data.bookingService = undefined;
    }
  }
});
</script>
