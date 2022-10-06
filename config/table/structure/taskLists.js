import { base } from "@airtable/blocks";
import { FieldType } from "@airtable/blocks/models";
import format from "../format";

const taskListStructure = () => {
    const Projects = base.getTableByNameIfExists( 'Projects' );
    const Milestones = base.getTableByNameIfExists( 'Milestones' );

    return [
        { name: 'Task List', type: FieldType.SINGLE_LINE_TEXT },
        { name: 'ID', type: FieldType.NUMBER, options: format.number },
        { name: 'Description', type: FieldType.MULTILINE_TEXT },
        { name: 'Position', type: FieldType.NUMBER, options: format.number },
        { name: 'Project', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Projects.id
        } },
        { name: 'Complete', type: FieldType.CHECKBOX, options: format.checkbox },
        { name: 'Uncompleted', type: FieldType.NUMBER, options: format.number },
        { name: 'Status', type: FieldType.SINGLE_LINE_TEXT },
        { name: 'Milestone', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Milestones.id,
        } },
    ];
}

export default taskListStructure;