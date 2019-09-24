<template>
    <File :file="bus.file" :type="bus.tab">
        <Cast :manager="bus.entity.FieldManager"></Cast>
        <RelationList :manager="bus.entity.RelationManager"></RelationList>
    </File>
</template>

<script>
    import bus from '../helper/event';
    import File from './File';
    import Cast from './Cast';
    import RelationList from './RelationList';

    export default {
        name: 'Model',
        components: { File, Cast, RelationList },
        data() {
            return {
                bus
            };
        }
    };
</script>
