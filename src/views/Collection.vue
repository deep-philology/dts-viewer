<template>
  <div class="collection">
    <h1>{{ collection.title }}</h1>
    <h4><em>{{ collection.id }}</em></h4>
    <collections-nav :collection="collection"></collections-nav>
  </div>
</template>
<script>
import CollectionsNav from '@/components/CollectionsNav.vue';
export default {
  name: 'collection',
  components: {
    CollectionsNav
  },
  computed: {
    collection() {
      return this.$store.state.collections[this.$route.params.urn];
    }
  }
}
</script>
