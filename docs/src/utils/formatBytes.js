// @flow weak

export default function formatBytes(bytes, decimals) {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const isNegative = bytes < 0;

  const k = 1024;
  const dm = decimals + 1 || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));

  if (!sizes[i]) {
    return '';
  }

  const value = `${parseFloat((Math.abs(bytes) / (k ** i)).toFixed(dm))}  ${sizes[i]}`;

  if (isNegative) {
    return `-${value}`;
  }

  return value;
}
