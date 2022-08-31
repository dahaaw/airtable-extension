import services from "..";

export default ( people ) => {
    const data = [];

    for (const p of people) {
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
                'Company Name': p[ 'company-name' ],
                'Email': p[ 'email-address' ],
                'Visit Count': Number( p[ 'login-count' ] ),
                'Last Login': p[ 'last-login' ],
                'Created At Date': p[ 'created-at' ],
            }
        })
    }

    return data;
}