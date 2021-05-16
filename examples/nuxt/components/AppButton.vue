<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="
      tw([
        'no-underline inline-block uppercase rounded font-medium text(sm base) shadow(hover:md) px-4 py-2',
        variant === 'primary' && 'text-black bg-green(500 hover:600)',
        variant === 'secondary' && 'text-gray-900 bg-gray(200 hover:300)',
      ])
    "
  >
    <slot />
    <div v-if="$slots.icon" :class="tw('inline-block stroke-current w-5 h-5')">
      <slot name="icon" />
    </div>
  </NuxtLink>
  <a
    v-else
    :href="href"
    target="_blank"
    rel="noopener"
    :class="
      tw([
        'no-underline inline-block uppercase rounded font-medium text(sm base) shadow(hover:md) px-4 py-2',
        variant === 'primary' && 'text-black bg-green(500 hover:600)',
        variant === 'secondary' && 'text-gray-900 bg-gray(200 hover:300)',
      ])
    "
  >
    <slot />
    <div v-if="$slots.icon" :class="tw('inline-block stroke-current w-5 h-5')">
      <slot name="icon" />
    </div>
  </a>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: null,
    },
    href: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    tw() {
      return this.$tw
    },
  },
}
</script>
