<template>
    <validation-observer
            ref="observer"
            v-slot="{  }"
    >
        <form @submit.prevent="submit">
            <v-container>
                <v-row>
                    <v-col>
                        <v-card class="pa-10">

                            <validation-provider v-slot="{ errors }" name="ID" :rules="{required: true}">
                                <v-select v-model="boardid" :error-messages="errors"
                                          prepend-icon="mdi-clipboard-edit-outline" label="게시판ID"
                                          :items="['free', 'notice', 'qna']"
                                ></v-select>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="ID" :rules="{required: true}">
                                <v-text-field v-model="userid" :error-messages="errors"
                                              prepend-icon="mdi-card-account-details-outline"
                                              label="ID"
                                ></v-text-field>
                            </validation-provider>

                            <validation-provider v-slot="{ errors }" name="ID" :rules="{required: true}">
                                <v-text-field v-model="name" :error-messages="errors"
                                              prepend-icon="mdi-account-edit-outline" label="이름"
                                ></v-text-field>
                            </validation-provider>

                            <validation-provider v-slot="{ errors }" name="ID" :rules="{required: true}">
                                <v-text-field v-model="subject" :error-messages="errors"
                                              prepend-icon="mdi-page-layout-header" label="제목"
                                ></v-text-field>
                            </validation-provider>

                            <validation-provider v-slot="{ errors }" name="ID" :rules="{required: true}">
                                <v-textarea v-model="content" :error-messages="errors"
                                            prepend-icon="mdi-page-layout-body" label="내용"
                                ></v-textarea>
                            </validation-provider>

                            <validation-provider v-slot="{ errors }" name="ID" :rules="{required: true}">
                                <v-file-input v-model="file" :error-messages="errors"
                                              label="파일"
                                ></v-file-input>
                            </validation-provider>

                            <div class="text-right">
                                <v-btn class="mt-5"
                                       type="submit"
                                >확인</v-btn>

                            </div>
                        </v-card>
                    </v-col>
                    <v-col></v-col>
                    <v-col></v-col>
                </v-row>
            </v-container>
        </form>
    </validation-observer>
</template>
<script>
    export default {
        data: function() {
            return {
                userid: ""
            }
        },
        methods: {
            submit () {
                this.$refs.observer.validate();
            }
        }
    }
</script>