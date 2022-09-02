import { base } from "@airtable/blocks";
import { FieldType } from "@airtable/blocks/models";
import format from "../format";

const allTasksStructure = () => {
    const Companies = base.getTableByNameIfExists( 'Companies' );
    const Projects = base.getTableByNameIfExists( 'Projects' );
    const People = base.getTableByNameIfExists( 'People' );
    const TaskLists = base.getTableByNameIfExists( 'Task Lists' );

    return [
        { name: 'ID', type: FieldType.NUMBER, options: format.number },
        { name: 'company name', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Companies.id,
        } },
        { name: 'project', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Projects.id,
        } },
        { name: 'description', type: FieldType.MULTILINE_TEXT },
        { name: 'task list', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: TaskLists.id,
        } },
        { name: 'task list description', type: FieldType.MULTILINE_TEXT },
        { name: 'status', type: FieldType.SINGLE_SELECT, options: { choices: [
            {
                name :'completed',
                color: 'greenLight2'
            },
            {
                name :'new',
                color: 'blueLight2'
            },
            {
                name :'reopened',
                color: 'pinkLight2'
            },
        ] } },
        { name: 'task name', type: FieldType.MULTILINE_TEXT },
        { name: 'task description', type: FieldType.MULTILINE_TEXT },
        { name: 'start date', type: FieldType.DATE, options: format.date },
        { name: 'due date', type: FieldType.DATE, options: format.date },
        { name: 'assigned to', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: People.id,
        } },
        { name: 'created by', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: People.id,
        } },
        { name: 'date created', type: FieldType.DATE_TIME, options: format.dateTime },
        { name: 'progress', type: FieldType.PERCENT, options: format.percent },
        { name: 'priority', type: FieldType.NUMBER, options: format.number },
        { name: 'private', type: FieldType.NUMBER, options: format.number },
        { name: 'time estimate', type: FieldType.NUMBER, options: format.number },
        { name: 'billable minutes', type: FieldType.NUMBER, options: format.number },
        { name: 'non billable minutes', type: FieldType.NUMBER, options: format.number },
        { name: 'tags', type: FieldType.MULTILINE_TEXT },
        { name: 'board column', type: FieldType.MULTILINE_TEXT },
        { name: 'parent task id', type: FieldType.NUMBER, options: format.number },
        { name: 'priority text', type: FieldType.SINGLE_SELECT, options: { choices: [
            {
                name :'Empty',
                color: 'greenLight2'
            },
            {
                name :'High',
                color: 'pinkLight2'
            },
            {
                name :'Low',
                color: 'blueLight2'
            },
            {
                name :'Medium',
                color: 'greenLight2'
            },
        ] } },
        { name: 'completed date', type: FieldType.DATE_TIME, options: format.dateTime },
        { name: 'completed by', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: People.id,
        } }
    ];
}

export default allTasksStructure;