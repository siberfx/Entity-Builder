<template>
    <ul v-if="bus.project" class="side-bar">
        <li>
            <h2>{{ bus.project.name }}</h2>
        </li>
        <li>
            <span @click="add" class="btn btn-primary plus"> + </span>
            <br /><br />
        </li>
        <template v-if="'file' == bus.tab">
            <li v-for="file in bus.project.FileTypeManager.list" :key="file.name">
                <div :class="{'active':bus.type==file.name}" @click="bus.showFile(file)">{{ file.name }}</div>
            </li>
        </template>

        <template v-else>
            <li v-for="entity in bus.project.EntityManager.list" :key="entity.name">
                <div :class="{'active':bus.entity==entity}" @click="bus.show(entity)">{{ entity.name }}</div>
            </li>
        </template>
    </ul>
</template>

<script>
    import bus from '../helper/event';
    import { see, enter } from '../helper/dialogue';

    export default {
        name: 'SideBar',
        data() {
            return {
                bus
            };
        },
        methods: {
            add() {
                enter('Please enter the name').then(result => {
                    if (result.value) {
                        try {
                            if (bus.tab === 'file') {
                                const file = bus.project.FileTypeManager.make(result.value);
                                bus.project.FileTypeManager.add(file);
                            } else {
                                const entity = bus.project.EntityManager.make(result.value);
                                bus.project.EntityManager.add(entity);
                            }
                        } catch (error) {
                            see(error, 400);
                        }
                    }
                });
            }
        }
    };
</script>

<style>
    .side-bar {
        position: fixed;
        top: 50px;
        left: 0px;
        bottom: 0px;
        width: 160px;
        padding: 0;
        margin: 0;
        overflow-y: auto;
        border-right: lightgray solid 1px;
    }

    .side-bar h2 {
        text-align: center;
    }

    .side-bar li {
        list-style: none;
        cursor: pointer;
        font-size: 18px;
        border-top: lightgray solid 1px;
    }

    .side-bar li div {
        padding: 11px;
    }

    .side-bar li div.active,
    .side-bar li div.active:hover {
        background-color: DeepSkyBlue;
    }

    .side-bar li div:hover {
        background-color: aliceblue;
    }
</style>
