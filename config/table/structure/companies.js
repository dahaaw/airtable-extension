import { FieldType } from "@airtable/blocks/models";

const companiesStructure = [
    { name: 'Company Name', type: FieldType.SINGLE_LINE_TEXT },
    { name: 'Projects', type: FieldType.MULTILINE_TEXT },
    { name: 'People', type: FieldType.MULTILINE_TEXT },
    { name: 'Milestones', type: FieldType.MULTILINE_TEXT },
    { name: 'Time', type: FieldType.MULTILINE_TEXT },
    { name: 'All Tasks', type: FieldType.MULTILINE_TEXT },
];

export default companiesStructure;