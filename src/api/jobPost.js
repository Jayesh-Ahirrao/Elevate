import config from "../Config";

export const fetchJobs = async () => {
  try {
    const response = await fetch(config.url.employerAllJobs);
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    console.log("response", response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
