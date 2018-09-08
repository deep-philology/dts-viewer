<template>
    <ul>
      <li v-for="c in collections" :key="c.id">
        <router-link :to="{name: 'collection', params: {urn: c.id}}">
          {{ c.title }} ({{ c.totalItems }})
        </router-link>
      </li>
    </ul>
</template>
<script>
export default {
  name: 'collections-nav',
  props: ['collection'],
  computed: {
    collections() {
      if (this.collection) {
          return this.collection.collectionsOrder.map(id => this.$store.state.collections[id]);
      }
      else {
          return this.$store.state.collectionsOrder.map(id => this.$store.state.collections[id]);
      }
    }
  }
}
</script>
