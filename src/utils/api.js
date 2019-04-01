export const startFetchJsonData = async (url, options, n = 1) => {
  try {
    const res = await fetch(url, options);
    if (res.status === 200 || res.status === 204) {
      const data = await res.json();
      return data;
    }

    return { error: res.message || 'There was an error, please try again later' };
  } catch (e) {
    if (n === 1) return { error: 'There was an error, please try again later' };
    const retry = await startFetchJsonData(url, options, n - 1);
    return retry;
  }
};