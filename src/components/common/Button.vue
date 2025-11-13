<script lang="ts" setup>
const props = defineProps<{
  variant: 'primary' | 'info' | 'success' | 'danger' | 'warning'
  onClick: () => void
  btnText: string
  styles?: string
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}>()

const buttonType = props.type ?? 'button'
const ariaLabel = props.ariaLabel ?? props.btnText

const getVariantClasses = (variant: string = 'primary') => {
  const variants = {
    primary: 'bg-brand text-white hover:bg-red-200',
    info: 'bg-info text-white-100 hover:bg-info-hover',
    success: 'bg-success text-white hover:bg-success-hover',
    danger: 'bg-danger text-white  hover:bg-danger-hover',
    warning: 'bg-warning text-white  hover:bg-warning-hover',
  } as const
  return variants[variant as keyof typeof variants]
}
</script>

<template>
  <button
    :type="buttonType"
    :aria-label="ariaLabel"
    :class="[
      `text-md px-4 py-2 rounded-md font-medium`,
      getVariantClasses(props.variant),
      props.styles,
    ]"
    @click="props.onClick"
  >
    <slot />
    {{ btnText }}
  </button>
</template>
