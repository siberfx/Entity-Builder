<template>
    <Dialogue :dData="LDData.dData">
        <template slot="title">{{ LDData.message }}</template>
        <template slot="body">
            <List :lData="LDData.lData" @select="close" @close="close"></List>
        </template>
    </Dialogue>
</template>

<script>
    import { Dialogue, DialogueData } from './Dialogue';
    import { List, ListData } from './List';

    export class ListDialogueData {
        constructor() {
            this.dData = new DialogueData();
            this.lData = null;
        }

        /**
         * message
         * item list
         * member name of item, for displaying
         * member name of item, for displaying extra info
         * call back function
         **/
        show(message, list, textName, infoName, CallBack) {
            this.message = message;
            this.lData = new ListData(list, textName, infoName, CallBack);
            this.dData.show();
        }
    }

    export const LDData = new ListDialogueData();

    export default {
        name: 'ListDialogue',
        components: { Dialogue, List },
        data() {
            return {
                LDData: LDData
            };
        },
        methods: {
            close() {
                LDData.dData.close();
            }
        }
    };
</script>
