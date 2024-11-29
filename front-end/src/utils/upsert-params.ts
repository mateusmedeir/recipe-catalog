async function upsertParams(
  params: URLSearchParams,
  paramTitle: string,
  paramValue?: string,
  paramSet: boolean = true
) {
  if (!!paramSet && !!paramValue) params.set(paramTitle, paramValue);
  else params.delete(paramTitle);

  if (params.has("page")) params.set("page", "1");
}

export { upsertParams };
