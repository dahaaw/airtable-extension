import { FieldType } from "@airtable/blocks/models";
import format from "../format";

const taskListStructure = () => {
    return [
        { name: 'Tag', type: FieldType.SINGLE_LINE_TEXT },
        { name: 'ID', type: FieldType.NUMBER, options: format.number },
        { name: 'Color', type: FieldType.SINGLE_LINE_TEXT },
    ];
}

export default taskListStructure;