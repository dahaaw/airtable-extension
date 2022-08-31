import { FieldType } from "@airtable/blocks/models";
import format from "../format";

const allTasksStructure = [
    { name: 'ID', type: FieldType.NUMBER, options: format.number },
    { name: 'company name', type: FieldType.MULTILINE_TEXT },
    { name: 'project', type: FieldType.MULTILINE_TEXT },
    { name: 'description', type: FieldType.MULTILINE_TEXT },
    { name: 'task list', type: FieldType.SINGLE_SELECT, options: { choices: [] } },
    { name: 'task list description', type: FieldType.MULTILINE_TEXT },
    { name: 'milestone', type: FieldType.MULTILINE_TEXT },
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
    { name: 'assigned to', type: FieldType.SINGLE_LINE_TEXT },
    { name: 'created by', type: FieldType.SINGLE_LINE_TEXT },
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
    { name: 'completed by', type: FieldType.SINGLE_LINE_TEXT },
    { name: 'time', type: FieldType.MULTILINE_TEXT },
];

export default allTasksStructure;