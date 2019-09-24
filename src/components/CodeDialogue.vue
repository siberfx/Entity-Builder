<template>
    <Dialogue :dData="CDData.dData">
        <template slot="title">
            {{ CDData.title }}
            <span class="btn-group">
                <span v-if="CDData.editing" @click="save" class="btn btn-primary">Save</span>
                <span v-if="CDData.editing" @click="reset" class="btn btn-warning">Reset</span>
            </span>
        </template>
        <template slot="body">
            <textarea v-if="CDData.editing" v-model="CDData.code" class="form-control" rows="22" spellcheck="false"></textarea>
            <pre v-else class="code">{{ CDData.code }}</pre>
        </template>
    </Dialogue>
</template>

<script>
    import { Dialogue, DialogueData } from './Dialogue';

    export class CodeDialogueData {
        constructor() {
            this.title = '';
            this.code = '';
            this.editing = false;
            this.original = '';
            this.CallBack = null;
            this.dData = new DialogueData(true, false, true);
        }

        show(title, code, editing, original, CallBack) {
            this.title = title;
            this.code = code;
            this.editing = editing;
            this.original = original;
            this.CallBack = CallBack;
            this.dData.show();
        }
    }

    export const CDData = new CodeDialogueData();

    export default {
        name: 'CodeDialogue',
        components: { Dialogue },
        data() {
            return {
                CDData
            };
        },
        methods: {
            save() {
                if (CDData.CallBack) {
                    CDData.CallBack(CDData.code);
                }
            },
            reset() {
                CDData.code = CDData.original;
            },
            close() {
                CDData.dData.close();
            }
        }
    };
</script>

<style>
    .modal-body pre.code {
        max-height: 80vh;
        background-color: white;
    }
</style>
