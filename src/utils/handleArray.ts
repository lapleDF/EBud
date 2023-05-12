/**
 * Split an array to arrays with the provided chunk size
 * @param array Array need to split into chunks
 * @param chunkSize Size of each chunk
 * @returns An array include chunk arrays
 */
export const splitChunkArray = (array: Array<any>, chunkSize: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};
