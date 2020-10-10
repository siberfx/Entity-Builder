<template>
    <table class="table">
        <caption>
            <h3 class="inline mr11px">File</h3>
            <b-button-group>
                <b-button @click="zip" variant="outline-success"> Zip </b-button>
                <b-button v-if="request" @click="deployEntity" variant="outline-success"> Deploy </b-button>
            </b-button-group>
        </caption>
        <thead>
            <tr>
                <th style="width: 222px;"></th>
                <th>Layer Name</th>
                <th>Class Name</th>
                <th>File Name</th>
            </tr>
        </thead>
        <tbody>
            <File v-for="layer in layerxx" :manager="manager" :layer="layer" :key="layer.name" @show="show"></File>
        </tbody>
        <tfoot>
            <b-modal v-model="visible" :title="title" size="xl" hide-footer>
                <pre>{{ code }}</pre>
            </b-modal>
        </tfoot>
    </table>
</template>

<script>
import File from './File.vue'
import render from '../render.js'
import { deployFile, deployEntity, request } from '../request.js'
import * as zip from '../zip.js'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'FileList',
    components: { File },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            builder,
            sidebar,
            request,
            layerxx: builder.project.LayerManager.list,
            title: '',
            code: '',
            visible: false,
        }
    },
    methods: {
        show(title, code) {
            this.title = title
            this.code = code
            this.visible = true
        },
        deployEntity() {
            try {
                deployEntity(builder.project, sidebar.item)
                this.$bvToast.toast(`${sidebar.item.name} deployed`, {
                    title: 'OK',
                    variant: 'success',
                    solid: true,
                })
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        zip() {
            try {
                zip.zipEntity(sidebar.item, builder.project)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>
