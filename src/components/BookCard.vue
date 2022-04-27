<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1"> 
            <strong>Tên:</strong> 
            {{ book.name }}
        </div>
        <div class="p-1">
            <strong>Tác giả:</strong>
            {{ book.author }}
        </div>
        <div class="p-1">
            <strong>Thể loại:</strong>
            {{ book.cate }}
        </div>
        <div class="p-1">
            <strong>Nhà xuất bản:</strong>
            {{ book.publishCom }}
        </div>
        <div class="p-1">
            <strong>Tái bản:</strong>
            {{ book.republish }}
        </div>
        <div class="p-1">
            <strong>Yêu thích:&nbsp;</strong>
            <i v-if="book.favorite" class="fas fa-check"></i> 
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>