import services from "..";

export default ( taskLists ) => {
    const data = [];

    for (const tl of taskLists) {
        const milestoneId = services.airtable.record.getIDs( 'Milestones', 'ID', tl[ 'milestone-id' ] );

        data.push({
            fields: { 
                'Task List': tl.name,
                'ID': Number( tl.id ),
                'Description': tl.description,
                'Milestone': milestoneId
            }
        })
    }

    return data;
}