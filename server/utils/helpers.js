function formatResponse(data, status = 'success') {
  return {
    status,
    timestamp: new Date().toISOString(),
    data,
  };
}

function handleError(res, error, statusCode = 500) {
  console.error('Error:', error.message);
  return res.status(statusCode).json({
    status: 'error',
    message: error.message || 'Internal server error',
    timestamp: new Date().toISOString(),
  });
}

function truncateText(text, maxLength = 5000) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...[truncated]';
}

module.exports = { formatResponse, handleError, truncateText };
