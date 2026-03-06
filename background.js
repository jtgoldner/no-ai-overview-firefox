// No AI Overview - Firefox Extension
// Intercepts Google search requests and appends -AI to the query
// if not already present, suppressing the AI Overview panel.

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);

    // Only act on actual search requests (must have a q parameter)
    const query = url.searchParams.get('q');
    if (!query) {
      return {};
    }

    // Check if -AI is already present (case-insensitive, as a standalone token).
    // This prevents double-appending if the user already typed it themselves.
    if (/(^|\s)-AI(\s|$)/i.test(query)) {
      return {};
    }

    // Append -AI to the query and redirect
    url.searchParams.set('q', query + ' -AI');
    return { redirectUrl: url.toString() };
  },
  {
    urls: [
      '*://*.google.com/search*',
      '*://*.google.co.uk/search*',
      '*://*.google.ca/search*',
      '*://*.google.com.au/search*',
      '*://*.google.de/search*',
      '*://*.google.fr/search*',
      '*://*.google.co.jp/search*',
      '*://*.google.es/search*',
      '*://*.google.it/search*',
      '*://*.google.co.in/search*',
      '*://*.google.com.br/search*'
    ],
    types: ['main_frame']
  },
  ['blocking']
);
