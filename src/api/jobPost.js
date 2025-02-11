  // Mock data - replace with your actual job cards data
  const jobs = [
    {
      id: 1,
      title: "Software Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      type: "Full-Time",
      minExperience: 2,
      maxExperience: 4,
      minSalary: 45000,
      maxSalary: 65000,
      qualification: "Bachelors",
      deadline: "2024-04-10",
      postedDate: "2024-03-10"
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Data Insights Ltd.",
      location: "Mumbai",
      type: "Part-Time",
      minExperience: 1,
      maxExperience: 3,
      minSalary: 35000,
      maxSalary: 55000,
      qualification: "Bachelors",
      deadline: "2024-04-05",
      postedDate: "2024-03-08"
    },
    {
      id: 3,
      title: "Project Manager",
      company: "BuildRight Corp.",
      location: "Delhi",
      type: "Full-Time",
      minExperience: 5,
      maxExperience: 10,
      minSalary: 60000,
      maxSalary: 80000,
      qualification: "Masters",
      deadline: "2024-04-15",
      postedDate: "2024-03-05"
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Creative Minds",
      location: "Bangalore",
      type: "Contract",
      minExperience: 3,
      maxExperience: 5,
      minSalary: 50000,
      maxSalary: 70000,
      qualification: "Diploma",
      deadline: "2024-04-08",
      postedDate: "2024-03-12"
    },
    {
      id: 5,
      title: "Marketing Specialist",
      company: "MarketGurus",
      location: "Chennai",
      type: "Full-Time",
      minExperience: 2,
      maxExperience: 4,
      minSalary: 40000,
      maxSalary: 60000,
      qualification: "Bachelors",
      deadline: "2024-04-12",
      postedDate: "2024-03-09"
    }
    // Add more job entries as needed
  ];
  

  export const fetchJobs = async () => {
    return jobs;
}




