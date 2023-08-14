export const transformTypesResponse = (apiResponse) => {
    return apiResponse.map((item) => ({
        name: item.type.name,
        url: item.type.url,
    }));
};
