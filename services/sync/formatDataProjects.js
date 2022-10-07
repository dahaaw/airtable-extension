import { base } from "@airtable/blocks";
import { FieldType } from "@airtable/blocks/models";
import services from "..";

export default ( projects ) => {
    const data = [];

    for (const project of projects) {
        let companyId = services.airtable.record.getIDs( 'Companies', 'Company Name', project.company.name );
        let ownerId = services.airtable.record.getIDs( 'People', 'ID', project.owner?.id ? Number( project.owner.id ) : null );
        let tagIDs = project.tags?.map( v => v.id ) | [];
        data.push({
            fields: { 
                project: project.name,
                'company name': companyId,
                'project category': project.category.name ? { name: project.category.name } : null,
                'project owner': ownerId,
                'project update': null,
                'project health': null,
                description: project.description,
                date: services.formatter.date.YYYYMMDDto( project.startDate ),
                'due date': services.formatter.date.YYYYMMDDto( project.endDate ),
                'date created': project[ 'created-on' ],
                'date updated': project[ 'last-changed-on' ],
                'Tags.': services.airtable.record.getIDs( 'Tags', 'ID', tagIDs ),
                ID: Number( project.id ),
                'total project budget': null,
                '% project budget used': null,
                'status': { name: project.subStatus },
                'completed date': project.completedOn,
                'completed on time': null,
                'Budget Status': null
            }
        })
    }

    return data;
}

const checkCategoriesOptions = ( categoryName ) => {
    if( categoryName ){
        const Projects = base.getTableByNameIfExists( 'Projects' );
        const projectCategories = Projects.getFieldByNameIfExists( 'project category' );
        let projectCategoriesExist = false;
        for (const choice of projectCategories.options.choices ) {
            if( choice === categoryName ) projectCategoriesExist = true;
            break;
        }

        if( !projectCategoriesExist ){
            projectCategories.updateOptionsAsync( { 
                choices: [ 
                    ...projectCategories.options.choices, 
                    { name: categoryName } 
                ] 
            } )
        };
    }
}