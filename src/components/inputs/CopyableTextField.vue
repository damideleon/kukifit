<template>
  <v-text-field
    variant="outlined"
    rounded="lg"
    :model-value="displayValue || value"
    readonly
    :prefix="prefix"
    :class="inputClass"
    :density="density"
    :bg-color="bgColor"
    :append-inner-icon="copyIcon"
    @click="copyToClipboard"
    :hint="
      showTooltip
        ? copyIcon === COPY_ICON_SUCCESS
        ? successMessage
          : ERROR_MESSAGE
        : ''
    "
    persistent-hint
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    value: string;
    displayValue?: string;
    prefix?: string;
    inputClass?: string;
    density?: "default" | "comfortable" | "compact";
    bgColor?: string;
    successMessage?: string;
  }>(),
  {
    density: "default",
    successMessage: "¡Copiado!",
  }
);

const slots = useSlots();

const input = ref();

const emit = defineEmits<{
  (e: "copied", value: string): void;
}>();

const showTooltip = ref(false);

const COPY_ICON = "mdi-content-copy";
const COPY_ICON_SUCCESS = "mdi-check";
const COPY_ICON_ERROR = "mdi-close";
const copyIcon = ref(COPY_ICON);

const ERROR_MESSAGE = "Error al copiar al portapapeles";

const copyToClipboard = async () => {
  try {
    showTooltip.value = true;
    await navigator.clipboard.writeText(props.value);
    emit("copied", props.value);
    copyIcon.value = COPY_ICON_SUCCESS;
  } catch (err) {
    console.error("Error al copiar al portapapeles:", err);
    copyIcon.value = COPY_ICON_ERROR;
  } finally {
    setTimeout(() => {
      showTooltip.value = false;
      copyIcon.value = COPY_ICON;
    }, 2000);
  }
};
</script>
