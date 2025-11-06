<script setup lang="ts">
import type { NivelesAcademico } from '@/models/nivelesacademico'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'nivelesacademicos'
const nivelesacademicos = ref<NivelesAcademico[]>([])
const nivelAcademicoDelete = ref<NivelesAcademico | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')
const emit = defineEmits(['edit'])

const nivelesacademicoFiltrados = computed(() => {
  return nivelesacademicos.value.filter(
    (nivelesacademico) =>
      nivelesacademico.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      nivelesacademico.descripcion?.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

async function obtenerLista() {
  nivelesacademicos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(nivelesacademico: NivelesAcademico) {
  emit('edit', nivelesacademico)
}

function mostrarEliminarConfirm(nivelesacademico: NivelesAcademico) {
  nivelAcademicoDelete.value = nivelesacademico
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${nivelAcademicoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre y descripcion" />
      </InputGroup>
    </div>

    <table class="tabla-niveles">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(nivelesacademico, index) in nivelesacademicoFiltrados"
          :key="nivelesacademico.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ nivelesacademico.nombre }}</td>
          <td>{{ nivelesacademico.descripcion }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(nivelesacademico)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(nivelesacademico)"
            />
          </td>
        </tr>
        <tr v-if="nivelesacademicoFiltrados.length === 0">
          <td colspan="4">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>
        ¿Estás seguro de que deseas eliminar el Nivel Academico
        {{ nivelAcademicoDelete?.nombre }} ?
      </p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.tabla-niveles {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse; /* ✅ fusiona bordes */
  text-align: center; /* ✅ centra texto */
}

.tabla-niveles th,
.tabla-niveles td {
  border: 1px solid #1f958f; /* ✅ muestra todas las líneas */
  padding: 10px;
  text-align: center; /* ✅ centra texto en cada celda */
  vertical-align: middle; /* ✅ centra verticalmente */
}

.tabla-niveles th {
  background-color: #231972;
  font-weight: bold;
}

.tabla-niveles tbody tr:hover {
  background-color: #4d2258; /* ✅ pequeño efecto hover */
}
</style>
