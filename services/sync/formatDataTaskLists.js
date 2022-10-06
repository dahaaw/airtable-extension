import services from "..";

export default ( taskLists ) => {
    const data = [];

    for (const tl of taskLists) {
        const milestoneId = services.airtable.record.getIDs( 'Milestones', 'ID', tl[ 'milestone-id' ] );
        const projectId = services.airtable.record.getIDs( 'Projects', 'ID', tl.projectId );

        data.push({
            fields: { 
                'Task List': tl.name,
                'ID': Number( tl.id ),
                'Description': tl.description,
                'Position': tl.position,
                'Project': projectId,
                'Complete': tl.complete,
                'Uncompleted': tl[ 'uncompleted-count' ],
                'Status': tl.status,
                'Milestone': milestoneId
            }
        })
    }

    return data;
}