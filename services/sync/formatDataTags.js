export default ( tags ) => {
    const data = [];

    for (const tag of tags) {
        data.push({
            fields: { 
                'Tag': tag.name,
                'ID': Number( tag.id ),
                'Color': tag.color
            }
        })
    }

    return data;
}