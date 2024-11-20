export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };


export  const apiCall = async (endpoint, options = {}) => {
    try {
      const response = await fetch(endpoint, options);
      const data = await response.json();

      const apiCalls = data.apiCalls;
  
      localStorage.setItem("apiCalls", apiCalls);
  
      if (apiCalls >= 20) {
        alert("You have hit the 20 API call limit!");
      }
  
      return data; 
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  