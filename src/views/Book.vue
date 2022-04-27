<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Sách
                <i class="fa-solid fa-book"></i>
            </h4>
            <BookList
                v-if="filteredBooksCount > 0"
                :books="filteredBooks"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có sách nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                
                <router-link
                    :to="{ name: 'book.add' }"
                    class="btn btn-sm btn-success"
                    @click="goToAddBook"
                    >
                    <i class="fas fa-plus"></i> Thêm mới
                </router-link>
                
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllBooks"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <h4>
                Chi tiết Sách
                <i class="fas fa-address-card"></i>
                    </h4>
                <BookCard :book="activeBook" />
                <router-link
                        :to="{
                        name: 'book.edit',
                        params: { id: activeBook.id },
                        }"
                    >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span
                    >
                </router-link>

            </div>
        </div>
    </div>
</template>
<script>
import { swalert } from "@/mixins/swal.mixin";
import BookCard from "@/components/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";
export default {
    components: {
    BookCard,
    InputSearch,
    BookList,
},
// Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
        this.activeIndex = -1;
    },
    },
    computed: {
    
        bookStrings() {
            return this.books.map((book) => {
                const { name, author, cate, publishCome, republish } = book;
            return [name, author, cate, publishCome, republish].join("");
            });
        },
    
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((book, index) =>
                this.bookStrings[index].includes(this.searchText)
            );
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.books[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        async retrieveBooks() {
            try {
            this.books = await BookService.getAll();
            } catch (error) {
            console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
        async removeAllBooks() {
            swalert
				.fire({
					title: "Xóa tất cả Sách",
					icon: "warning",
					text: "Bạn muốn xóa tất cả Sách?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await BookService.deleteAll();
							this.refreshList();
						} catch (error) {
							console.log(error);
						}
					}
				});
        },
        goToAddBook() {
            this.$router.push({ name: "book.add" });
        },
    },
    mounted() {
    this.refreshList();
    },
};
</script>
<style scoped>
.page {
text-align: left;
max-width: 750px;
}
</style>