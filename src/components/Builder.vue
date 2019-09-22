<template>
    <div>
        <template v-if="'project' == bus.tab">
            <h1 style="display: inline">Project</h1>

            <span class="btn-group">
                <span v-on:click="make" class="btn btn-primary">New</span>
                <label class="btn btn-info">
                    Load
                    <input v-on:change="load($event)" type="file" accept=".json" style="display:none;" />
                </label>
                <span @click="download" :disabled="bus.project==null" class="btn btn-success">Download</span>
            </span>
            <span v-if="bus.project">{{ bus.project.fileName }}</span>
        </template>

        <Project v-if="bus.project"></Project>
    </div>
</template>

<script>
    import { loadProject, makeProject } from '../helper/entity';
    import bus from '../helper/event';
    import { read } from '../helper/net';
    import { save } from '../helper/zip';
    import { see, enter } from '../helper/dialogue';
    import Project from './Project';

    export default {
        name: 'Builder',
        components: { Project },
        data() {
            return {
                bus
            };
        },
        methods: {
            warning() {
                if (bus.project == null) {
                    return true;
                }

                return confirm('Warning!\nUnsaved changes will be lost!\nContinue?');
            },
            load() {
                if (this.warning()) {
                    // go on
                } else {
                    return;
                }

                const file = event.target.files[0];
                if (file) {
                    read(file, text => {
                        try {
                            const json = JSON.parse(text);
                            bus.project = loadProject(json);
                            if (bus.project.EntityManager.list.length > 0) {
                                bus.show(bus.project.EntityManager.list[0]);
                            }
                        } catch (error) {
                            see(error, 400);
                        }
                    });
                }
            },
            make() {
                if (this.warning()) {
                    // go on
                } else {
                    return;
                }

                enter('Please enter the Project name', 'entity').then(result => {
                    if (result.value) {
                        try {
                            bus.project = makeProject(result.value);
                            bus.show(bus.project.EntityManager.list[0]);
                        } catch (error) {
                            see(error, 400);
                        }
                    }
                });
            },
            download() {
                if (bus.project == null) {
                    return;
                }

                try {
                    save(bus.project);
                } catch (error) {
                    see(error, 400);
                }
            }
        }
    };
</script>
