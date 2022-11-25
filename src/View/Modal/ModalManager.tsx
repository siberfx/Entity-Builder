import useColumnModalStore from "@/Store/useColumnModalStore"
import useRelationModalStore from "@/Store/useRelationModalStore"
import useSchemaModalStore from "@/Store/useSchemaModalStore"
import ColumnModal from "./ColumnModal"
import ListModal from "./ListModal"
import RelationModal from "./RelationModal"
import SchemaModal from "./SchemaModal"

function ModalManager() {
    const columnModalStore = useColumnModalStore()
    const relationModalStore = useRelationModalStore()
    const schemaModalStore = useSchemaModalStore()

    return (
        <>
            {columnModalStore.isOpen ? <ColumnModal></ColumnModal> : null}
            <ListModal></ListModal>
            {relationModalStore.isOpen ? <RelationModal></RelationModal> : null}
            {schemaModalStore.isOpen ? <SchemaModal></SchemaModal> : null}
        </>
    )
}

export default ModalManager
