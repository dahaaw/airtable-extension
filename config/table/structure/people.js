import { FieldType } from "@airtable/blocks/models";
import format from "../format";

const peopleStructure = [
    { name: 'Name', type: FieldType.SINGLE_LINE_TEXT },
    { name: 'Type', type: FieldType.SINGLE_SELECT, options: { choices: [
        {
            name :'account',
            color: 'greenLight2'
        },
        {
            name :'contact',
            color: 'blueLight2'
        },
        {
            name :'client',
            color: 'pinkLight2'
        },
        {
            name :'collaborator',
            color: 'greenLight2'
        },
    ] } },
    { name: 'Admin', type: FieldType.CHECKBOX, options: format.checkbox },
    { name: 'ID', type: FieldType.NUMBER, options: format.number },
    { name: 'First Name', type: FieldType.SINGLE_LINE_TEXT },
    { name: 'Last Name', type: FieldType.SINGLE_LINE_TEXT },
    { name: 'Login Name', type: FieldType.SINGLE_LINE_TEXT },
    { name: 'Title', type: FieldType.SINGLE_LINE_TEXT },
    { name: 'Company Id', type: FieldType.NUMBER, options: format.number },
    { name: 'Company Name', type: FieldType.MULTILINE_TEXT },
    { name: 'Email', type: FieldType.EMAIL },
    { name: 'Visit Count', type: FieldType.NUMBER, options: format.number },
    { name: 'Last Login', type: FieldType.DATE, options: format.date },
    { name: 'Created At Date', type: FieldType.DATE, options: format.date },
];

export default peopleStructure;