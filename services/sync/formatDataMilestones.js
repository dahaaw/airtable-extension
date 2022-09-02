import services from "..";

export default ( milestones ) => {
    const data = [];

    console.log({milestones})
    for (const ml of milestones) {
        const companyId = services.airtable.record.getIDs( 'Companies', 'ID', ml[ 'company-id' ] );
        const projectId = services.airtable.record.getIDs( 'Projects', 'ID', ml[ 'project-id' ] );
        const assignedId = services.airtable.record.getIDs( 'People', 'ID', ml[ 'responsiblePartyIds' ]?.split( ',' ) );

        data.push({
            fields: { 
                'Milestone': ml.title,
                'Company Name': companyId,
                'Project': projectId,
                'Description': ml.description,
                'Status': { name: ml.status },
                'Assigned To': assignedId,
                'Private': ml.private ? 1 : 0,
                'Due Date': services.formatter.date.YYYYMMDDto( ml.deadline ),
                'Overdue By (days)': null,
                'Date Completed': ml[ 'created-on' ],
                'Tags': services.formatter.tags.fromTeamWork( ml.tags ),
                'Active Tasks': ml.tasklists.length,
                'Completed Tasks': null,
                'Percent Complete': Number( ml.percentageComplete ),
                'ID': Number( ml.id )
            }
        })
    }

    return data;
}