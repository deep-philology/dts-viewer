<template>
    <ul>
      <li v-for="c in collections" :key="c.id">
        <a href="#" @click.stop="$emit('selected', c)">
          {{ c.title }} ({{ c.totalItems }})
        </a>
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
      return this.$store.state.collectionsOrder.map(id => this.$store.state.collections[id]);
    },
  },
};
</script>
