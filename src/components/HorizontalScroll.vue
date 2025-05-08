<template>
  <div class="scroll-container">
    <div class="items-container">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>

.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 20px;
  scroll-snap-type: x mandatory;

  /* Ocultar scrollbar en todos los navegadores */
  -ms-overflow-style: none;  /* IE y Edge */
  scrollbar-width: none;     /* Firefox */
}

/* Ocultar scrollbar en Chrome, Safari y Opera */
.scroll-container::-webkit-scrollbar {
  display: none;
}

.items-container {
  display: inline-flex;
  gap: 16px;
}

/* Opcional: Snap items para mejor experiencia móvil */
.items-container > * {
  scroll-snap-align: start;
}

</style>
