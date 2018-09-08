<template>
  <div class="endpoint-input">
    <div class="form-group">
      <label>Please provide a DTS endpoint</label>
      <input v-model="endpoint" />
    </div>
    <button @click.stop="onLoad">Load</button>
  </div>
</template>

<script>
import { LOAD_ENDPOINT } from '../constants';
export default {
  name: 'endpoint-input',
  data() {
    return {
      endpoint: ''
    }
  },
  methods: {
    onLoad() {
      this.$store.dispatch(LOAD_ENDPOINT, { url: this.endpoint });
    }
  }
};
</script>

