// import services from "..";

export default ( companies ) => {
    const data = [];

    for (const cmp of companies) {
        data.push({
            fields: { 
                'Company Name': cmp.name,
                'Projects': null,
                'People': null,
                'Milestones': null,
                'Time': null,
                'All Tasks': null,
            }
        })
    }

    return data;
}