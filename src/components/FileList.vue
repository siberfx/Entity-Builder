<template>
    <div>
        <div v-for="file in bus.project.FileTypeManager.list" :key="file.name">
            <template v-if="file.hasTab==false">
                <File :file="find(file.name)" :type="file.name"></File>
                <br /><br />
            </template>
        </div>
    </div>
</template>

<script>
    import bus from '../helper/event';
    import File from './File';

    export default {
        name: 'FileList',
        components: { File },
        data() {
            return {
                bus
            };
        },
        methods: {
            find(type) {
                return bus.entity.FileManager.findByType(type);
            }
        }
    };
</script>
