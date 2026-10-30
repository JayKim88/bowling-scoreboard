<script setup lang="ts">
const pinOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

defineProps<{ maxPins: number | null }>()
const emit = defineEmits<{ roll: [pins: number] }>()
</script>

<template>
  <div class="pins">
    <button
      v-for="pins in pinOptions"
      :key="pins"
      type="button"
      @click="emit('roll', pins)"
      :disabled="maxPins === null || maxPins < pins"
    >
      {{ pins }}
    </button>
  </div>
</template>

<style scoped>
.pins {
  display: flex;
  gap: 4px;
}

.pins button {
  width: 40px;
  height: 36px;
}

.pins button:disabled {
  opacity: 0.5;
}
</style>
