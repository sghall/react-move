/* eslint flowtype/require-valid-file-annotation: "off" */

const unitContext = require.context('../src/', true, /\.spec\.(js|jsx)$/);
unitContext.keys().forEach(unitContext);
