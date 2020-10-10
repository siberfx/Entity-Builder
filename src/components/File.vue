<template>
    <tr>
        <td class="text-right">
            <b-button-group v-if="file">
                <b-button @click="remove" variant="outline-danger"> - </b-button>
                <b-button @click="preview(file)" variant="outline-primary">
                    <b-icon icon="eye"></b-icon>
                </b-button>
                <b-button @click="download(file)" variant="outline-success">
                    <b-icon icon="arrow-down-circle"></b-icon>
                </b-button>
                <b-button v-if="request" @click="deploy(file)" variant="outline-success"> Deploy </b-button>
            </b-button-group>
            <b-button v-else @click="add" variant="outline-primary"> + </b-button>
        </td>
        <td>{{ layer.name }}</td>
        <td>
            <span v-if="file">{{ file.className }}</span>
        </td>
        <td>
            <span v-if="file">{{ file.fileName }}</span>
        </td>
    </tr>
</template>

<script>
import render from '../render.js'
import { deployFile, deployEntity, request } from '../request.js'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'
import * as zip from '../zip.js'

export default {
    name: 'File',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        layer: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            builder,
            sidebar,
            request,
        }
    },
    computed: {
        file() {
            const found = this.manager.findByLayer(this.layer.name)
            if (found) {
                return found
            }
            return null
        },
    },
    methods: {
        add() {
            try {
                const file = this.manager.make(this.layer.name)
                this.manager.add(file)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        remove() {
            this.manager.remove(this.file)
        },
        preview(file) {
            try {
                const title = file.fileName
                const code = render(builder.project, sidebar.item, file)
                this.$emit('show', title, code)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        download(file) {
            try {
                const text = render(builder.project, sidebar.item, file)
                zip.download(file.fileName, text)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        deploy(file) {
            try {
                deployFile(builder.project, sidebar.item, file)
                this.$bvToast.toast(`${file.fileName} deployed`, {
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
    },
}
</script>
