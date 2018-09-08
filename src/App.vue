<template>
  <div>
    <h1>DTS Explorer</h1>
    <h2 v-if="endpoint">{{ endpoint }}</h2>
    <endpoint-input v-else></endpoint-input>

    <div v-if="selected">
      <h3>{{ selected.title }}</h3>
      <h4><em>{{ selected.id }}</em></h4>
    </div>

    <div v-if="loading">Loading...</div>
    <collections-nav v-else :collection="selected"  @selected="onSelect"></collections-nav>
  </div>
</template>
<script>
import CollectionsNav from '@/components/CollectionsNav.vue';
import EndpointInput from '@/components/EndpointInput.vue';

export default {
  name: 'app',
  components: {
    CollectionsNav,
    EndpointInput,
  },
  data() {
    return {
      selected: null
    }
  },
  methods: {
    onSelect(collection) {
      this.selected = collection;
    }
  },
  computed: {
    endpoint() {
      return this.$store.state.endpoint;
    },
    loading() {
      return !this.$store.state.loaded && this.endpoint !== '';
    }
  }
};
</script>

<style lang="scss">
@import "scss/index";
</style>
