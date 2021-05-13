<template>
  <div :class="tw('max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8')">
    <div :class="tw('max-w-3xl mx-auto')">
      <h2 :class="tw('text-4xl leading-normal pb-8')">
        Hello from <span :class="tw('text-green-500')">{{ name }}</span>
      </h2>
      <div
        :class="tw('px-4 py-3 leading-normal text-green-100 bg-green-900 rounded-lg')"
        role="alert"
      >
        <p :class="tw('font-bold text-white!')">The below content is rendered client-side only</p>
        <p>For content rendered client-side only, it is styled dynamically in-browser.</p>
      </div>
      <ClientOnly>
        <div :class="tw('container mt-8')">
          <h2 :class="tw('text-2xl font-medium pt-10 pb-4 text-center')">Client Only</h2>
          <p :class="tw('leading-loose')">
            Donec volutpat orci tortor, eget hendrerit nisl volutpat in. Phasellus posuere, orci ut
            varius tincidunt, felis augue suscipit magna, quis hendrerit nulla velit eu ipsum. Nunc
            at tellus sed augue vulputate luctus sit amet sed dui. Pellentesque libero purus,
            aliquam quis massa ac, fringilla blandit odio. Phasellus vitae porttitor ante.
          </p>
        </div>
      </ClientOnly>
      <p :class="tw('mt-8')">
        <AppButton to="/" variant="secondary" :class="tw('sm:mr-4 py-3 px-6 text-base')">
          Back to home
        </AppButton>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  asyncData() {
    return {
      name: process.server ? 'server' : 'client',
    }
  },
  computed: {
    tw() {
      return this.$tw
    },
  },
}
</script>
