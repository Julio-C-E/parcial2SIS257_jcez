<script setup lang="ts">
import NivelesAcademicoList from '@/components/NivelesAcademico/NivelesAcademicoList.vue'
import NivelesAcademicoSave from '@/components/NivelesAcademico/NivelesAcademicoSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const nivelesacademicosListRef = ref<typeof NivelesAcademicoList | null>(null)
const nivelesacademicosEdit = ref<any>(null)

function handleCreate() {
  nivelesacademicosEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(nivelesacademico: any) {
  nivelesacademicosEdit.value = nivelesacademico
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  nivelesacademicosListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Niveles Academicos</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <NivelesAcademicoList ref="nivelesacademicosListRef" @edit="handleEdit" />
    <NivelesAcademicoSave
      :mostrar="mostrarDialog"
      :nivelesacademico="nivelesacademicosEdit"
      :modoEdicion="!!nivelesacademicosEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
