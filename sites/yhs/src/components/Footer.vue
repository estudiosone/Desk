<template>
  <footer id="footer">
    <div class="salon" v-for="salon in salons" :key="salon.name">
      <div class="name">
        {{ salon.name }}
      </div>
      <div class="address">
        <span class="label">Dirección</span>
        <span>{{ salon.address }}</span> 
      </div>
      <div class="phone">
        {{ salon.phone }}
      </div>
      <div class="schedule">
        <div class="content" v-for="schedule in salon.schedule" :key="schedule">
          {{ schedule }}
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'desk-footer',
  data() {
    return {
      salons: [
        {
          name: 'Portones Shopping',
          address: 'Av. Italia 5775 local S44',
          phone: '+598 2601 7321',
          schedule: [
            'L a V: 8:00 a 22:00',
            'S y D: 10:00 a 22:00'
          ] 
        },
        {
          name: 'Portal Brunel',
          address: 'Cno. Carrasco 6955 local 101',
          phone: '+598 2605 9344',
          schedule: [
            'L: 14:00 a 19:00',
            'M a S: 10:00 a 19:00'
          ] 
        },
        {
          name: 'Portal Americas',
          address: 'Av. de las Américas 6000',
          phone: '+598 2602 3492',
          schedule: [
            'L: 14:00 a 19:00',
            'M a S: 10:00 a 19:00'
          ] 
        },
      ]
    }
  }
})
</script>

