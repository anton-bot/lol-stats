export function createError(message: string, statusCode: number = 500) {
    console.error(message);
    
    return {
        statusCode,
        body: JSON.stringify({
            message,
        }),
    };
}