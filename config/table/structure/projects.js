import { FieldType } from "@airtable/blocks/models";
import format from "../format";

const projectStructure = [
    { name: 'project', type: FieldType.MULTILINE_TEXT },
    { name: 'company name', type: FieldType.MULTILINE_TEXT },
    { name: 'project category', type: FieldType.SINGLE_SELECT, options: { choices: [ 
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
    { name: 'project owner', type: FieldType.SINGLE_LINE_TEXT },
    { name: 'project update', type: FieldType.MULTILINE_TEXT },
    { name: 'project health', type: FieldType.SINGLE_SELECT, options: { choices: [
        {
            name :''
        },
        {
            name :'Good',
            color: 'blueLight1'
        },
        {
            name :'At Risk',
            color: 'pinkLight2'
        },
        {
            name :'Need Attention',
            color: 'pinkLight1'
        },
    ] } },
    { name: 'description', type: FieldType.MULTILINE_TEXT },
    { name: 'date', type: FieldType.DATE, options: format.date },
    { name: 'due date', type: FieldType.DATE, options: format.date },
    { name: 'date created', type: FieldType.DATE_TIME, options: format.dateTime },
    { name: 'date updated', type: FieldType.DATE_TIME, options: format.dateTime },
    { name: 'tags', type: FieldType.MULTILINE_TEXT },
    { name: 'ID', type: FieldType.NUMBER, options: format.number },
    { name: 'total project budget', type: FieldType.MULTILINE_TEXT },
    { name: '% project budget used', type: FieldType.PERCENT, options: format.percent },
    { name: 'status', type: FieldType.SINGLE_SELECT, options: { choices: [
        {
            name :'current',
            color: 'blueLight2'
        },
        {
            name :'late',
            color: 'pinkLight2'
        },
        {
            name :'completed',
            color: 'greenLight2'
        },
    ] } },
    { name: 'completed date', type: FieldType.DATE_TIME, options: format.dateTime },
    { name: 'completed on time', type: FieldType.CHECKBOX, options: format.checkbox },
    { name: 'Budget Status', type: FieldType.MULTILINE_TEXT },
    { name: 'Milestones', type: FieldType.MULTILINE_TEXT },
    { name: 'Time', type: FieldType.NUMBER, options: format.number },
    { name: 'All Tasks', type: FieldType.MULTILINE_TEXT },
];

export default projectStructure;