// const queryParams = new URLSearchParams(window.location.search);
//  export const mId = queryParams.get('merchantId');
//  export const fId = queryParams.get('formId');

const queryParams = new URLSearchParams(window.location.search);

// Get the values of merchantId and formId from the query parameters
 export const mId = queryParams.get('merchantId');
 export const fId = queryParams.get('formId');

// Check if both merchantId and formId are present
if (mId && fId) {
  console.log("Merchant ID:", mId);
  console.log("Form ID:", fId);
} else {
  console.error("Merchant ID or Form ID is missing in the URL.");
}