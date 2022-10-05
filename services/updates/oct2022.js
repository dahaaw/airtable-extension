import { base } from "@airtable/blocks"
import { FieldType } from "@airtable/blocks/models";
import services from "..";

export default async () => {
    // cek table tags
    let Tags = base.getTableByNameIfExists( 'Tags' );
    if( !Tags ){
        Tags = await services.airtable.table.selectAndCreateIfNotExist( 'Tags' );
        const allTags = await services.fetch.tags.all();
        await services.sync.addRecords( Tags, allTags.tags );

        // create field tags on table Project
        let Projects = base.getTableByNameIfExists( 'Projects' );
        await Projects.createFieldAsync( 'Tags.', FieldType.MULTIPLE_RECORD_LINKS, {
            linkedTableId: Tags.id,
        })
        // full update table Projects
        const allProjects = await services.fetch.project.all();
        await services.sync.addOrUpdate( Projects, allProjects.projects );
    }

    
}