import { base } from "@airtable/blocks";
import { FieldType } from "@airtable/blocks/models";
import format from "../format";

const timeStructure = () => {
    const Project = base.getTableByNameIfExists( 'Projects' );
    const Companies = base.getTableByNameIfExists( 'Companies' );
    const People = base.getTableByNameIfExists( 'People' );
    const Task = base.getTableByNameIfExists( 'All Tasks' );
    const TaskLists = base.getTableByNameIfExists( 'Task Lists' );

    return [
        { name: 'ID', type: FieldType.NUMBER, options: format.number },
        { name: 'Date', type: FieldType.DATE_TIME, options: format.dateTime },
        { name: 'Date/Time', type: FieldType.DATE_TIME, options: format.dateTime },
        { name: 'End Date/Time', type: FieldType.DATE_TIME, options: format.dateTime },
        { name: 'Project', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Project.id,
        } },
        { name: 'Who', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: People.id,
        } },
        { name: 'Description', type: FieldType.MULTILINE_TEXT },
        { name: 'Project Category', type: FieldType.SINGLE_SELECT, options: { choices: [ 
            {
                name :''
            },
            {
                name :'Internal',
                color: 'blueLight2'
            },
            {
                name :'Fixed Fee',
                color: 'blueLight1'
            },
            {
                name :'Time & Materials',
                color: 'cyanLight1'
            },
            {
                name :'Support Subscription',
                color: 'greenBright'
            },
            {
                name :'Non-Billable Warranty Support',
                color: 'purpleBright'
            },
        ] } },
        { name: 'Company', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Companies.id,
        } },
        { name: 'Task List', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: TaskLists.id,
        } },
        { name: 'Task', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Task.id,
        } },
        { name: 'Parent Task', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Task.id,
        } },
        { name: 'Is Sub-task', type: FieldType.CHECKBOX, options: format.checkbox },
        { name: 'Is it Billable', type: FieldType.CHECKBOX, options: format.checkbox },
        { name: 'Hours', type: FieldType.NUMBER, options: format.number },
        { name: 'Minutes', type: FieldType.NUMBER, options: format.number },
        { name: 'Decimal Hours', type: FieldType.NUMBER, options: format.percent },
        { name: 'Estimated', type: FieldType.NUMBER, options: format.number },
        { name: 'Estimated Hours', type: FieldType.NUMBER, options: format.number },
        { name: 'Estimated Minutes', type: FieldType.NUMBER, options: format.number },
        { name: 'Task Tags', type: FieldType.MULTILINE_TEXT },
        { name: 'First Name', type: FieldType.SINGLE_LINE_TEXT },
        { name: 'Last Name', type: FieldType.SINGLE_LINE_TEXT },
        { name: 'User ID', type: FieldType.NUMBER, options: format.number },
        { name: 'Task ID', type: FieldType.NUMBER, options: format.number },
    ];
}

export default timeStructure;