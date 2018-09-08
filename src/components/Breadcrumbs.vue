<template>
    <div class="breadcrumbs">
        <span class="breadcrumb" v-if="selected.length > 0"><a href="#" @click.stop="$emit('backTo', null)">Home</a></span>
        <span class="breadcrumb" v-for="crumb in items" :key="crumb.id">
            <a href="#" @click.stop="$emit('backTo', crumb)">
                {{ crumb.title }}
            </a>
        </span>
    </div>
</template>
<script>
export default {
    name: 'breadcrumbs',
    props: ['selected'],
    computed: {
        items() {
            const x = [...this.selected];
            x.splice(x.length - 1, 1);
            return x;
        }
    }
}
</script>
