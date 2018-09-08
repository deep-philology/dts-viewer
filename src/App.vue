<template>
  <div>
    <h1>DTS Explorer</h1>
    <h2 v-if="endpoint">{{ endpoint }}</h2>
    <endpoint-input v-else></endpoint-input>

    <div v-if="collection">
      <breadcrumbs :selected="selected" @backTo="onBackTo"></breadcrumbs>
      <h3>{{ collection.title }}</h3>
      <h4><em>{{ collection.id }}</em></h4>
    </div>

    <div v-if="loading">Loading...</div>
    <collections-nav v-else :collection="collection"  @selected="onSelect"></collections-nav>
    <member-debug
      v-for="member in collection.member"
      :key="member.id"
      :member="member"></member-debug>
  </div>
</template>
<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import CollectionsNav from '@/components/CollectionsNav.vue';
import EndpointInput from '@/components/EndpointInput.vue';
import MemberDebug from '@/components/MemberDebug.vue';

export default {
  name: 'app',
  components: {
    Breadcrumbs,
    CollectionsNav,
    EndpointInput,
    MemberDebug,
  },
  data() {
    return {
      selected: [],
    };
  },
  methods: {
    onSelect(collection) {
      this.selected.push(collection);
    },
    onBackTo(item) {
      const index = this.selected.indexOf(item) + 1;
      this.selected.splice(index, this.selected.length - index);
    },
  },
  computed: {
    collection() {
      if (this.selected.length > 0) {
        return this.selected[this.selected.length - 1];
      }
      return null;
    },
    endpoint() {
      return this.$store.state.endpoint;
    },
    loading() {
      return !this.$store.state.loaded && this.endpoint !== '';
    },
  },
};
</script>

<style lang="scss">
@import "scss/index";
</style>
