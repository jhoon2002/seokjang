/*
 * props를 받아 namespace로 활용하는 mapFields
 *
 * (사용법)
 * 컴포넌트에서
 * import { mapDynamicFields } from "@/api/vuex-map-fields-prefixed";
 *
 * export default {
 *    props: ["namespace"]
 *    computed: {
 *        ...mapDynamicFields("namespace", ["pageParams"] ),
 *    }
 * }
 *
 * 출처:
 * https://github.com/maoberlehner/vuex-map-fields/issues/24 의 제일 아래 예시를 바탕으로
 * props를 이용하도록 일부 수정함
 *
 * 
 * namespace를 window.location.pathname의 마지막 디렉토리명을 이용하도록 적용한 이후, 
 * 이 함수는 사용 안함
 */
import arrayToObject from 'vuex-map-fields/src/lib/array-to-object';

function buildFieldPath(vm, fieldsObject, field, indexFields) {
    if (Array.isArray(indexFields)) {
        return indexFields.reduce(
            (path, indexField, index) => path.replace(new RegExp(`\\[=${index}\\]`), `[${vm[indexField]}]`),
            fieldsObject[field]
        );
    }

    return fieldsObject[field].replace('[]', `[${vm[indexFields]}]`);
}

export function mapDynamicFields(namespaceProp, fields, indexFields) {
    const fieldsObject = Array.isArray(fields) ? arrayToObject(fields) : fields;

    return Object.keys(fieldsObject).reduce((prev, key) => {
        prev[key] = {
            get() {
                // 'this' refer to vue component
                const namespace = this[namespaceProp]; //props 이용하도록 라인 추가
                const path = buildFieldPath(this, fieldsObject, key, indexFields);
                return this.$store.getters[`${namespace}/getField`](path);
            },
            set(value) {
                // 'this' refer to vue component
                const namespace = this[namespaceProp]; //props 이용하도록 라인 추가
                const path = buildFieldPath(this, fieldsObject, key, indexFields);
                this.$store.commit(`${namespace}/updateField`, { path, value });
            }
        };

        return prev;
    }, {});
}
