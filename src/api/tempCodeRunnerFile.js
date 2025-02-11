export const fetchJobs = async () => {
  try {
    const response = await fetch("http://localhost:8052/api/jpm/all-jobs");
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
