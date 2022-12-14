import { base } from "@airtable/blocks";
import { FieldType } from "@airtable/blocks/models";
import format from "../format";

const milestonesStructure = () => {
    const Companies = base.getTableByNameIfExists( 'Companies' );
    const Projects = base.getTableByNameIfExists( 'Projects' );
    const People = base.getTableByNameIfExists( 'People' );

    return [
        { name: 'Milestone', type: FieldType.SINGLE_LINE_TEXT },
        { name: 'Company Name', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Companies.id,
        } },
        { name: 'Project', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Projects.id,
        } },
        { name: 'Description', type: FieldType.MULTILINE_TEXT },
        { name: 'Status', type: FieldType.SINGLE_SELECT, options: { choices: [
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
            {
                name :'upcoming',
                color: 'pinkLight2'
            },
            {
                name :'late',
                color: 'pinkLight1'
            },
        ] } },
        { name: 'Assigned To', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: People.id,
        } },
        { name: 'Private', type: FieldType.NUMBER, options: format.number },
        { name: 'Due Date', type: FieldType.DATE, options: format.date },
        { name: 'Overdue By (days)', type: FieldType.NUMBER, options: format.number },
        { name: 'Date Completed', type: FieldType.DATE_TIME, options: format.dateTime },
        { name: 'Tags', type: FieldType.MULTILINE_TEXT },
        { name: 'Active Tasks', type: FieldType.NUMBER, options: format.number },
        { name: 'Completed Tasks', type: FieldType.NUMBER, options: format.number },
        { name: 'Percent Complete', type: FieldType.PERCENT, options: format.percent },
        { name: 'ID', type: FieldType.NUMBER, options: format.number },
    ];
}
export default milestonesStructure;