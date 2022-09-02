// import services from "..";

export default ( companies ) => {
    const data = [];

    for (const cmp of companies) {
        data.push({
            fields: { 
                'Company Name': cmp.name,
                'ID': Number( cmp.id ),
            }
        })
    }

    return data;
}