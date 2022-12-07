 /**
   * Check if the string can be parse to JSON format
   * @str string message
   * @returns is we can parse to JSON
   */
export const IsJsonString = (str: string): boolean => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}