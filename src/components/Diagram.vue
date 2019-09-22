<template>
    <div>
        <div class="title">
            <h1>Diagram</h1>
            <span @click="draw" class="btn btn-success">Draw</span>
        </div>

        <canvas id="diagram-canvas"></canvas>
    </div>
</template>

<script>
    import nomnoml from 'nomnoml';
    import bus from '../helper/event';
    import { make } from '../helper/diagram';

    export default {
        name: 'Diagram',
        data() {
            return {
                bus
            };
        },
        methods: {
            draw() {
                const canvas = document.getElementById('diagram-canvas');
                const data = make(bus.project);
                nomnoml.draw(canvas, data);
            }
        }
    };
</script>
