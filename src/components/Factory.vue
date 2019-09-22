<template>
    <File :file="bus.file" :type="bus.tab">
        <Faker :manager="bus.entity.FieldManager"></Faker>
    </File>
</template>

<script>
    import bus from '../helper/event';
    import Faker from './Faker';
    import File from './File';

    export default {
        name: 'Factory',
        components: { Faker, File },
        data() {
            return {
                bus
            };
        }
    };
</script>
