export const formatDate = (date) => {
    const dateObject = new Date(date);
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        /*hour12: false*/
    };

    return new Intl.DateTimeFormat('en-US', options).format(dateObject);
};