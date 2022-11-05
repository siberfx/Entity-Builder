import Constant from "@/Model/Constant"
import {
    getCodeFileName,
    getFileFullNameInCode,
    ScriptExtention,
    TemplateExtention,
} from "@/Model/FileManager"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useSchemaPageStore from "@/Store/useSchemaPageStore"
import { useState, useEffect } from "react"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import EditButton from "../Button/EditButton"
import FileButton from "../Button/FileButton"

interface Property {
    schema: LB.Schema
}

export default function FileList(property: Property) {
    const sDirectoryzzStore = useDirectoryzzStore()
    const filezzStore = useFilezzStore()
    const schemaPageStore = useSchemaPageStore()

    const [filezz, setFilezz] = useState<LB.File[]>([])
    const [text, setText] = useState("")

    useEffect(() => {
        if (text.length) {
            setFilezz(
                filezzStore.itemzz
                    .filter((item) => item.name.includes(text))
                    .sort((aa, bb) => {
                        if (aa.directoryId === bb.directoryId) {
                            return aa.name.localeCompare(bb.name)
                        }
                        return aa.directoryId - bb.directoryId
                    }),
            )
            return
        }
        if (schemaPageStore.fileColor === "#fff") {
            setFilezz(filezzStore.itemzz)
            return
        }
        setFilezz(
            filezzStore.itemzz
                .filter((item) => item.color === schemaPageStore.fileColor)
                .sort((aa, bb) => {
                    if (aa.directoryId === bb.directoryId) {
                        return aa.name.localeCompare(bb.name)
                    }
                    return aa.directoryId - bb.directoryId
                }),
        )
    }, [schemaPageStore.fileColor, text])

    function getName(item: LB.File) {
        const name = sDirectoryzzStore.treeHelper.getFileFullName(
            item,
            property.schema,
            "",
        )
        const index = name.lastIndexOf("/")
        if (index === -1) {
            return "/"
        }

        return name.slice(0, index)
    }

    return (
        <table className="table table-sm">
            <caption>
                <h3 className="inline me-3">File</h3>
                <span>generate files</span>
                <ColorButtonGroup
                    color={schemaPageStore.fileColor}
                    setColor={(color) => schemaPageStore.setFileColor(color)}
                ></ColorButtonGroup>
                <input
                    className="form-control"
                    value={text}
                    onChange={function (event) {
                        setText(event.target.value)
                    }}
                    type="text"
                />
            </caption>
            <thead>
                <tr>
                    <td className="w333">edit script / template</td>
                    <td>file</td>
                </tr>
            </thead>

            <tbody>
                {filezz.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <div className="btn-group me-2">
                                <EditButton
                                    file={getFileFullNameInCode(
                                        getCodeFileName(item, ScriptExtention),
                                    )}
                                    content={Constant.ScriptCode}
                                ></EditButton>
                                <EditButton
                                    file={getFileFullNameInCode(
                                        getCodeFileName(item, TemplateExtention),
                                    )}
                                    content=""
                                ></EditButton>
                            </div>
                            {item.name}
                        </td>
                        <td>
                            <div>{getName(item)}</div>
                            <FileButton
                                action=""
                                file={item}
                                schema={property.schema}
                            ></FileButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
