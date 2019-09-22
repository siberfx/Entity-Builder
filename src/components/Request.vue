<template>
    <File :file="bus.file" :type="bus.tab">
        <Validation :manager="bus.entity.FieldManager" :entity="bus.entity"></Validation>
    </File>
</template>

<script>
    import bus from '../helper/event';
    import File from './File';
    import Validation from './Validation';

    export default {
        name: 'Request',
        components: { File, Validation },
        data() {
            return {
                bus
            };
        }
    };
</script>
