export const newsAPIQuery = async () => {
      const key = "c1138061ebde4c1ea7373c4eefb37d30"
      const pageSize = 20
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=Apple&from=2024-03-19&sortBy=popularity&pageSize=${pageSize}&apiKey=${key}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    }

    export const newYorkTimesAPIQuery = async () => {
      const key = "03ImNBPIrKGTBzXt7FheR7thloB0nvyh"
      const response = await fetch(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${key}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    }
   
    export const theGuardianAPIQuery = async () => {
      const key = "500f7b16-609b-47a0-ba59-a86a05a29495"
      const response = await fetch(
        `https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=2014-01-01&api-key=${key}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    }
