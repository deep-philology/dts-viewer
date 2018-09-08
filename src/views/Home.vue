<template>
  <div class="home">
    <h1>DTS Explorer</h1>
    <div v-if="loading">Loading...</div>
    <endpoint-input v-else></endpoint-input>
    <collections-nav></collections-nav>
  </div>
</template>

<script>
import CollectionsNav from '@/components/CollectionsNav.vue';
import EndpointInput from '@/components/EndpointInput.vue';

export default {
  name: 'home',
  components: {
    CollectionsNav,
    EndpointInput,
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
};
</script>
