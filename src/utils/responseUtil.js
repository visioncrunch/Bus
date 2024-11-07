
export const sendResponse = (res, data, statusCode=200) => {
    res.status(statusCode).json({ success: true, data });
  };
  
  export const sendError = (res, message, statusCode= 400) => {
    res.status(statusCode).json({ success: false, message });
  };