<script setup lang="ts">
import type { NivelesAcademico } from '@/models/nivelesacademico'
import type { Programa } from '@/models/programa'
import http from '@/plugins/axios'
import {
  Button,
  Calendar,
  Dialog,
  InputMask,
  InputNumber,
  InputText,
  Select,
  Textarea,
} from 'primevue'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'programas'
const props = defineProps({
  mostrar: Boolean,
  programa: {
    type: Object as () => Programa,
    default: () => ({}) as Programa,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const nivelesacademicos = ref<NivelesAcademico[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const programa = ref<Programa>({ ...props.programa })
watch(
  () => props.programa,
  (newVal) => {
    programa.value = { ...newVal }
  },
)

async function obtnerNivlesAcademico() {
  nivelesacademicos.value = await http.get('nivelesacademicos').then((response) => response.data)
}

async function handleSave() {
  try {
    const body = {
      idNivelAcademico: programa.value.idNivelAcademico,
      nombre: programa.value.nombre,
      descripcion: programa.value.descripcion,
      version: programa.value.version,
      duracionMeses: programa.value.duracionMeses,
      costo: programa.value.costo,
      fechaInicio: programa.value.fechaInicio,
      estado: programa.value.estado,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${programa.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    programa.value = {} as Programa
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

const programas = ref<Programa>({ ...props.programa })
const idNivelAcademico = ref<NivelesAcademico>
watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtnerNivlesAcademico()

      if (props.programa?.id) {
      } else {
      }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nivelesacademico" class="font-semibold w-3">Niveles Academicos</label>
        <Select
          id="nivelesacademico"
          v-model="programa.idNivelAcademico"
          :options="nivelesacademicos"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="programa.nombre"
          class="flex-auto"
          autocomplete="off"
          maxlength="40"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Descripcion</label>
        <InputText
          id="descripcion"
          v-model="programa.descripcion"
          class="flex-auto"
          autocomplete="off"
          row="4"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="version" class="font-semibold w-3">Version</label>
        <InputNumber
          id="version"
          v-model="programa.version"
          class="flex-auto"
          autocomplete="off"
          maxlength="30"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="duracionMeses" class="font-semibold w-3">Duracion en Meses</label>
        <InputNumber
          id="duracionMeses"
          v-model="programa.duracionMeses"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="costo" class="font-semibold w-3">Costo</label>
        <InputNumber
          id="costo"
          v-model="programa.costo"
          class="flex-auto"
          autocomplete="off"
          mode="decimal"
          :minFractionDigits="2"
          :maxFractionDigits="2"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fechaInicio" class="font-semibold w-3">Fecha de inicio</label>
        <Calendar
          id="fechaInicio"
          v-model="programa.fechaInicio"
          class="flex-auto"
          dateFormat="yy-mm-dd"
          showIcon
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="estado" class="font-semibold w-3">Estado</label>
        <InputText
          id="estado"
          v-model="programa.estado"
          class="flex-auto"
          autocomplete="off"
          row="4"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
