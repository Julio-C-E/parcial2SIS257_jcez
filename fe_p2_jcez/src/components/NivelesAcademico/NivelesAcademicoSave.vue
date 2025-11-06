<script setup lang="ts">
import type { NivelesAcademico } from '@/models/nivelesacademico'
import http from '@/plugins/axios'
import { Button, Dialog, InputText, Textarea } from 'primevue'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'nivelesacademicos'
const props = defineProps({
  mostrar: Boolean,
  nivelesacademico: {
    type: Object as () => NivelesAcademico,
    default: () => ({}) as NivelesAcademico,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const nivelesacademico = ref<NivelesAcademico>({ ...props.nivelesacademico })
watch(
  () => props.nivelesacademico,
  (newVal) => {
    nivelesacademico.value = { ...newVal }
  },
  { immediate: true },
)

async function handleSave() {
  try {
    const body = {
      nombre: nivelesacademico.value.nombre,
      descripcion: nivelesacademico.value.descripcion?.trim() || undefined,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${nivelesacademico.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    nivelesacademico.value = {} as NivelesAcademico
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="nivelesacademico.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Descripcion</label>
        <InputText id="descripcion" v-model="nivelesacademico.descripcion" class="flex-auto" />
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
