import { base } from "@airtable/blocks";
import { FieldType } from "@airtable/blocks/models";
import format from "../format";

const taskListStructure = () => {
    const Milestones = base.getTableByNameIfExists( 'Milestones' );

    return [
        { name: 'Task List', type: FieldType.SINGLE_LINE_TEXT },
        { name: 'ID', type: FieldType.NUMBER, options: format.number },
        { name: 'Description', type: FieldType.MULTILINE_TEXT },
        { name: 'Milestone', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Milestones.id,
        } },
    ];
}

export default taskListStructure;