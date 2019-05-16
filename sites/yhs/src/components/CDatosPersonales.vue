<template>
  <el-form
    v-if="seccion == 'datos'"
    class="s-datos"
    :model="datos"
    label-width="140px"
    :label-position="smAndUp ? 'left' : 'top'">
    <el-form-item label="Nombre">
      <el-input v-model="datos.name"></el-input>
    </el-form-item>
    <el-form-item label="Apellido">
      <el-input v-model="datos.surname"></el-input>
    </el-form-item>
    <el-form-item label="Correo Electrónico">
      <el-input v-model="datos.email"></el-input>
    </el-form-item>
    <el-form-item label="Identificación">
      <el-input v-model="datos.identification.number" placeholder="Ejemplo: 12345678, sin puntos ni guiones">
        <el-select v-model="datos.identification.type" slot="prepend" placeholder="Tipo" style="width: 120px;">
          <el-option
            v-for="identificacion in this.$store.state.DatosEstaticos.Identidad.TipoDeDocumento"
            :label="identificacion"
            :key="identificacion"
            :value="identificacion" />
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item label="Teléfono">
      <el-input v-model="datos.phone.number" @input="input_phone_change" placeholder="Sin el primer 0">
        <el-select v-model="datos.phone.area_code" slot="prepend" placeholder="Area" style="width: 120px;">
          <el-option
            v-for="area in this.$store.state.DatosEstaticos.Telefono.Areas"
            :label="area.Pais"
            :key="area.Codigo"
            :value="area.Codigo" />
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item class="s-acciones s-acciones--centrado">
      <el-button type="primary" @click="guardarDatos">Guardar</el-button>
    </el-form-item>
  </el-form>
</template>
