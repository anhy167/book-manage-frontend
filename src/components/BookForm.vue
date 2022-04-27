<template>
    <Form
        @submit="$emit('submit:book', bookLocal)"
        :validation-schema="bookFormSchema"
        >
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="bookLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Tác giả</label>
            <Field
                name="author"
                type="text"
                class="form-control"
                v-model="bookLocal.author"
            />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Thể loại</label>
            <Field
                name="cate"
                type="text"
                class="form-control"
                v-model="bookLocal.cate"
            />
            <ErrorMessage name="cate" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Nhà xuất bản</label>
            <Field
                name="publishCom"
                type="text"
                class="form-control"
                v-model="bookLocal.publishCom"
            />
            <ErrorMessage name="publishCom" class="error-feedback" />
        </div>
         <div class="form-group">
            <label for="republish">Tái bản</label>
            <Field
                name="republish"
                type="text"
                class="form-control"
                v-model="bookLocal.republish"
            />
            <ErrorMessage name="republish" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="bookLocal.favorite"
            />
            <label for="favorite" class="form-check-label">
                <strong>Sách yêu thích</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="bookLocal.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="$emit('delete:book', bookLocal.id)"
            >
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
    Form,
    Field,
    ErrorMessage,
},
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true },
        resetAfterSubmit: { type: Boolean, default: false }
    },
    data() {
        const bookFormSchema = yup.object().shape({
        name: yup
            .string()
            .required("Tên phải có giá trị.")
            .min(2, "Tên phải ít nhất 2 ký tự.")
            .max(50, "Tên có nhiều nhất 50 ký tự."),
        author: yup
            .string()
            .max(30, "Tên tác giả tối đa 30 ký tự."),
        cate: yup.string().max(50, "Thể loại tối đa 50 ký tự."),
        publishCom: yup
            .string()
            .max(30, "Nhà xuất bản tối đa 30 ký tự."),
        republish: yup
            .string()
            .max(20, "Tái bản tối đa 20 ký tự")
        });
        return {
            bookLocal: this.book,
            bookFormSchema,
        };
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>