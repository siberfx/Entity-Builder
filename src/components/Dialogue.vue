<template>
    <div v-if="dData.visible" @click="close" class="modal show" tabindex="-1" role="dialog">
        <div @click.stop="" :class="{'modal-lg':dData.big}" class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span v-show="dData.canClose" @click="close" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </span>
                    <h3 class="modal-title">
                        <slot name="title"></slot>
                    </h3>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div v-show="dData.hasFooter" class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</template>

<script>
    export class DialogueData {
        constructor(canClose = true, hasFooter = false, big = false) {
            this.visible = false;
            this.canClose = canClose;
            this.hasFooter = hasFooter;
            this.big = big;
        }

        show() {
            this.visible = true;
        }

        close() {
            this.visible = false;
        }
    }

    export const Dialogue = {
        name: 'Dialogue',
        props: ['dData'],
        methods: {
            close() {
                this.dData.close();
            }
        }
    };

    export default Dialogue;
</script>
