import Vue from 'vue';

const bus = new Vue({
    data: {
        tab: 'project',
        project: null,
        entity: null,
        file: null,
        type: ''
    },
    methods: {
        show(entity) {
            this.$set(this, 'entity', entity);
            this.$emit('EntityChanged');
            if (this.tab === 'project') {
                this.$set(this, 'tab', 'Migration');
            }

            const found = this.entity.FileManager.findByType(this.tab);
            this.setFile(found);
        },
        showTab(tab) {
            if (this.entity == null) {
                this.setFile(null);
                return;
            }

            const found = this.entity.FileManager.findByType(tab);
            this.setFile(found);
            this.$set(this, 'tab', tab);
            this.$emit('TabChanged');
        },
        showFile(type) {
            this.$set(this, 'type', type.name);
        },
        setFile(file) {
            if (file) {
                this.$set(this, 'file', file);
            } else {
                this.$set(this, 'file', null);
            }
        }
    }
});

export default bus;
