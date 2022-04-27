<template>
    <div v-if="book" class="page">
        <h4>Hiệu chỉnh Sách</h4>
        <BookForm
            :book="book"
            @submit:book="updateBook"
            @delete:book="deleteBook"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import { swtoast, swalert } from "@/mixins/swal.mixin";
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        BookForm,
    },
    props: {
    id: { type: String, required: true },
},
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
			try {
				this.book = await BookService.get(id);
			} catch (error) {
				console.log(error);
				this.$router.push({
					name: "notfound",
					params: { pathMatch: this.$route.path.split("/").slice(1) },
					query: this.$route.query,
					hash: this.$route.hash,
				});
			}
		},

        async updateBook(data) {
            try {
                await BookService.update(this.book.id, data);
                swtoast.success({
					text: "Sách được cập nhật thành công.",
				});
            } catch (error) {
                console.log(error);
                swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
            }
        },
        async deleteBook() {
            swalert
				.fire({
					title: "Xóa Sách này",
					icon: "warning",
					text: "Bạn muốn xóa Sách này?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await BookService.delete(this.book._id);
							swtoast.success({
								text: "Sách được xóa thành công.",
							});
							this.$router.push({ name: "book" });
						} catch (error) {
							console.log(error);
							swtoast.error({
								text: "Đã có lỗi xảy ra.",
							});
						}
					}
				});
        },
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>