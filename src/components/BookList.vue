<script>
export default {
    props: {
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    computed: {
        selectedIndex() {
            return this.activeIndex;
        }, 
    },
    methods: {
            select(index) {
                this.$emit("update:activeIndex", index); },
    }, 
};
</script>

<template>
    <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(book, index) in books" 
            :key="book.id"
            :class="{ active: index === selectedIndex }" 
            @click="select(index)"
        >
            {{ book.name }}
        </li> 
    </ul>
</template>