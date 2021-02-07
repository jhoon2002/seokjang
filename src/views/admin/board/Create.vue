<template>
    <div>
    <validation-observer
            ref="observer"
            v-slot="{ invalid, validated, handleSubmit, validate }"
    >
        <v-form>
            <v-container>
                <v-row>
                    <v-col>
                            <validation-provider name="게시판ID" :rules="{ required: true }" v-slot="{ errors, valid }">
                                <v-select label="게시판ID" v-model="boardid" :items="['free', 'notice', 'qna']"
                                          :error-messages="errors" :success="valid"
                                          prepend-icon="mdi-clipboard-edit-outline"
                                ></v-select>
                            </validation-provider>
                            <validation-provider name="ID" :rules="{ required: true }" v-slot="{ errors, valid }">
                                <v-text-field label="ID" v-model="userid"
                                              :error-messages="errors" :success="valid"
                                              prepend-icon="mdi-card-account-details-outline"
                                ></v-text-field>
                            </validation-provider>

                            <validation-provider name="이름" :rules="{ required: true }" v-slot="{ errors, valid }">
                                <v-text-field label="이름" v-model="name"
                                              :error-messages="errors" :success="valid"
                                              prepend-icon="mdi-account-edit-outline"
                                ></v-text-field>
                            </validation-provider>

                            <validation-provider name="제목" :rules="{ required: true }" v-slot="{ errors, valid }">
                                <v-text-field label="제목" v-model="subject"
                                              :error-messages="errors" :success="valid"
                                              prepend-icon="mdi-page-layout-header"
                                ></v-text-field>
                            </validation-provider>

                            <validation-provider name="내용" :rules="{ required: true }" v-slot="{ errors, valid }">
                                <v-textarea label="내용" v-model="content"
                                            :error-messages="errors" :success="valid"
                                            prepend-icon="mdi-page-layout-body"
                                ></v-textarea>
                            </validation-provider>

                            <validation-provider name="파일" :rules="{ required: true }" v-slot="{ errors, valid }">
                                <v-file-input label="파일" v-model="file"
                                              :error-messages="errors" :success="valid"
                                ></v-file-input>
                            </validation-provider>

                            <div class="text-right">
                                <v-btn class="mr-4" @click="clear">초기화</v-btn>
                                <v-btn class="mr-4" @click="validate()">Validate</v-btn>
                                <v-btn color="primary" @click="handleSubmit(submit)">확인</v-btn>
                            </div>
                    </v-col>
                    <v-col></v-col>
                    <v-col></v-col>
                </v-row>
            </v-container>
        </v-form>
    </validation-observer>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                boardid: "",
                userid: "",
                name: "",
                subject: "",
                content: "",
                file: ""
            }
        },
        methods: {
            // submit () {
            //     this.$refs.observer.validate();
            // },
            // onSubmit(event) {
            //         event.preventDefault();
            //     //alert("Form submitted!");
            // }
        }
    }
</script>