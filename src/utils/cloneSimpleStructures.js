const cloneSimpleStructure = (structure) => {
    return JSON.parse(JSON.stringify(structure));
}

export { cloneSimpleStructure };