export default ( tags ) => {
    let result = '';

    for (const tag of tags) {
        result+= tag.name + ' '
    }

    return result;
}