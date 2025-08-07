import {
    fetchActionsWithRecordResponse,
    fetchActionsWithArrayOfIdentifiedRecordsResponse,
    fetchActionsWithArrayOfRecordsResponse,
    fetchActionsWithTotalResponse,
} from './dataFetchActions';

function validateResponseFormat(response, type, logger = console.error) {
    if (!response) {
        logger(`The dataProvider returned an empty response for '${type}'.`);
        throw new Error('ra.notification.data_provider_error');
    }
    if (!response.hasOwnProperty('data')) {
        logger(
            `The response to '${type}' must be like { data: ... }, but the received response does not have a 'data' key. The dataProvider is probably wrong for '${type}'.`
        );
        throw new Error('ra.notification.data_provider_error');
    }
    if (
        fetchActionsWithArrayOfRecordsResponse.includes(type) &&
        !Array.isArray(response.data)
    ) {
        logger(
            `The response to '${type}' must be like { data : [...] }, but the received data is not an array. The dataProvider is probably wrong for '${type}'`
        );
        throw new Error('ra.notification.data_provider_error');
    }
    if (
        fetchActionsWithTotalResponse.includes(type) &&
        !response.hasOwnProperty('total') &&
        !response.hasOwnProperty('pageInfo')
    ) {
        logger(
            `The response to '${type}' must be like { data: [...], total: 123 } or { data: [...], pageInfo: {...} }, but the received response has neither a 'total' nor a 'pageInfo' key. The dataProvider is probably wrong for '${type}'`
        );
        throw new Error('ra.notification.data_provider_error');
    }
}

export default validateResponseFormat;
