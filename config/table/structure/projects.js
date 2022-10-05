import { base } from "@airtable/blocks";
import { FieldType } from "@airtable/blocks/models";
import format from "../format";
import service from '../../../services';

const projectStructure = async () => {
    const dataCategories = await service.fetch.project.categories();
    let categories = []
    for( const ctg of dataCategories.categories ){
        categories.push( { name: ctg.name } )
    }

    const Companies = base.getTableByNameIfExists( 'Companies' );
    const People = base.getTableByNameIfExists( 'People' );
    const Tags = base.getTableByNameIfExists( 'Tags' );

    return [
        { name: 'project', type: FieldType.MULTILINE_TEXT },
        { name: 'company name', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Companies.id,
        } },
        { name: 'project category', type: FieldType.SINGLE_SELECT, options: { choices: categories } },
        { name: 'project owner', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: People.id,
        } },
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
        { name: 'Tags.', type: FieldType.MULTIPLE_RECORD_LINKS, options: {
            linkedTableId: Tags.id,
        } },
        { name: 'ID', type: FieldType.NUMBER, options: format.number },
        { name: 'total project budget', type: FieldType.MULTILINE_TEXT },
        { name: '% project budget used', type: FieldType.PERCENT, options: format.percent },
        { name: 'status', type: FieldType.SINGLE_SELECT, options: { choices: [
            {
                name :'active',
                color: 'blueLight2'
            },
            {
                name :'current',
                color: 'blueLight2'
            },
            {
                name :'late',
                color: 'pinkLight2'
            },
            {
                name :'upcoming',
                color: 'pinkLight1'
            },
            {
                name :'completed',
                color: 'greenLight2'
            },
            {
                name :'deleted',
                color: 'greenLight2'
            },
        ] } },
        { name: 'completed date', type: FieldType.DATE_TIME, options: format.dateTime },
        { name: 'completed on time', type: FieldType.CHECKBOX, options: format.checkbox },
        { name: 'Budget Status', type: FieldType.MULTILINE_TEXT },
    ];
}

export default projectStructure;