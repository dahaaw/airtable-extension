import services from "..";

export default ( projects ) => {
    const data = [];

    for (const project of projects) {
        data.push({
            fields: { 
                project: project.name,
                'company name': project.company.name,
                'project category': project.category.name ? { name: project.category.name } : null,
                'project owner': project.category[ 'is-owner' ],
                'project update': null,
                'project health': null,
                description: project.description,
                date: services.formatter.date.YYYYMMDDto( project.startDate ),
                'due date': services.formatter.date.YYYYMMDDto( project.endDate ),
                'date created': project[ 'created-on' ],
                'date updated': project[ 'last-changed-on' ],
                tags: services.formatter.tags.fromTeamWork( project.tags ),
                ID: Number( project.id ),
                'total project budget': null,
                '% project budget used': null,
                'status': { name: project.subStatus },
                'completed date': null,
                'completed on time': null,
                'Budget Status': null,
                'Milestones': null,
                'Time': null,
                'All Tasks': null,
            }
        })
    }

    return data;
}