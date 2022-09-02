import services from "..";

export default ( people ) => {
    const data = [];

    for (const p of people) {
        let companyId = services.airtable.record.getIDs( 'Companies', 'Company Name', p[ 'company-name' ] );
        
        data.push({
            fields: { 
                'Name': p[ 'full-name' ],
                'Type': { name: p[ 'user-type' ] },
                'Admin': p[ 'administrator' ],
                'ID': Number( p.id ),
                'First Name': p[ 'first-name' ],
                'Last Name': p[ 'last-name' ],
                'Login Name': p[ 'user-name' ],
                'Title': p.title,
                'Company Id': Number( p.companyId ),
                'Company Name': companyId,
                'Email': p[ 'email-address' ],
                'Visit Count': Number( p[ 'login-count' ] ),
                'Last Login': p[ 'last-login' ],
                'Created At Date': p[ 'created-at' ],
            }
        })
    }

    return data;
}