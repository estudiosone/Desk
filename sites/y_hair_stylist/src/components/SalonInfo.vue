<template>
  <el-row class="info">
    <el-row
      type="flex"
      align="middle"
      style="margin-bottom: 16px;"
    >
      <img src="https://img.icons8.com/material-outlined/24/000000/marker.png">
      <div style="margin: 3px 16px; font-size: 18px;">
        {{ address }}
      </div>
    </el-row>
    <el-row
      type="flex"
      align="middle"
      style="margin-bottom: 16px;"
    >
      <img src="https://img.icons8.com/material-outlined/24/000000/phone.png">
      <div style="margin: 3px 16px; font-size: 18px;">
        {{ phone }}
      </div>
    </el-row>
    <el-row
      type="flex"
      align="middle"
      style="margin-bottom: 16px;"
    >
      <img src="https://img.icons8.com/material-outlined/24/000000/clock.png">
      <div style="margin: 3px 16px; font-size: 18px;">
        <div
          v-for="schedule in data.schedules"
          :key="schedules.indexOf(schedule)"
        >
          {{ schedule }}
        </div>
      </div>
    </el-row>

    <el-row>
      <el-button-group style="width: 100%">
        <el-button
          style="width: 50%"
          type="primary"
        >
          Llamar
        </el-button>
        <el-button
          style="width: 50%"
          type="primary"
        >
          Ir
        </el-button>
      </el-button-group>
    </el-row>
  </el-row>
</template>

<script>
import SaloneInfo from ''
export default {
  props: {
    address: String,
    phone: String,
    schedules: Array,
  },
};
</script>
