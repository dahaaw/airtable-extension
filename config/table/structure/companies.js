import { FieldType } from "@airtable/blocks/models";
import format from "../format";

const companiesStructure = () => [
    { name: 'Company Name', type: FieldType.SINGLE_LINE_TEXT },
    { name: 'ID', type: FieldType.NUMBER, options: format.number },
];

export default companiesStructure;