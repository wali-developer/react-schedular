const validationErrorParser = (err) => {
    let merge;
    if (err?.response?.status === 422) {
        let keys = Object.keys(err.response.data.errors);
        let values = Object.values(err.response.data.errors);
        merge = values.reduce((result, field, index) => {
            result[keys[index]] = field[0];
            return result;
        }, {});

    }

    return merge;
}

export default validationErrorParser
