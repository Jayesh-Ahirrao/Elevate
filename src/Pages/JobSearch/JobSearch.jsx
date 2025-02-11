import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobSearch.css";
import Navbar from "../LandingPage/Navbar/Navbar";
import { fetchJobs } from "../../api/jobPost";
import JobCard from "../LandingPage/JobCard/JobCard";
import config from "../../Config";

function JobSearch() {
  const navigate = useNavigate();
  const [sortNewest, setSortNewest] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    salary: 50000,
    disabilityType: [],
    jobType: [], // Stores job types like "WORK_FROM_HOME"
    jobCategory: []
  });

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [disabilityCategories, setDisabilityCategories] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJobs();
        console.log("Fetched Jobs:", data);
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDisabilityCategory = async () => {
      try {
        const response = await fetch(config.url.allDisCat);
        if (!response.ok)
          throw new Error("Failed to fetch disability categories");
        const data = await response.json();
        console.log("Fetched disability categories:", data);
        setDisabilityCategories(data);
      } catch (error) {
        console.error("Error fetching disability categories:", error);
      }
    };
    fetchDisabilityCategory();
  }, []);

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await fetch(config.url.allJobTypes);
        if (!response.ok) throw new Error("Failed to fetch job types");
        const data = await response.json();
        console.log("Fetched job types:", data);
        setJobTypes(data); // Setting the job types array: ["WORK_FROM_OFFICE", "WORK_FROM_HOME", "HYBRID"]
      } catch (error) {
        console.error("Error fetching job types:", error);
      }
    };
    fetchJobTypes();
  }, []);

  useEffect(() => {
    let filtered = jobs.filter((job) => {
      const jobSalary = parseInt(job.max_sal);
      const matchesSalary = jobSalary >= filters.salary;
      const matchesDisabilityType =
        filters.disabilityType.length === 0 ||
        filters.disabilityType.includes(job.disability_type);
      const matchesJobType =
        filters.jobType.length === 0 || filters.jobType.includes(job.job_type);
      const matchesJobCategory =
        filters.jobCategory.length === 0 ||
        filters.jobCategory.includes(job.job_category);
      return (
        matchesSalary &&
        matchesDisabilityType &&
        matchesJobType &&
        matchesJobCategory
      );
    });
    setFilteredJobs(sortNewest ? [...filtered] : [...filtered].reverse());
  }, [jobs, filters, sortNewest]);

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: Array.isArray(prev[category])
        ? prev[category].includes(value)
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value]
        : value
    }));
  };

  const toggleSort = () => {
    setSortNewest(!sortNewest);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.trim() || "");
    let searchString = e.target.value.trim().toLowerCase();

    let filtered = jobs.filter((job) => {
      return (
        job.designation.toLowerCase().includes(searchString) ||
        job.comp_desc.toLowerCase().includes(searchString) ||
        (job.job_location || "").toLowerCase().includes(searchString) ||
        job.job_type.toLowerCase().includes(searchString)
      );
    });

    setFilteredJobs(sortNewest ? [...filtered] : [...filtered].reverse());
  };

  return (
    <>
      <Navbar />
      <div className="job-search-container">
        {/* Filters Section */}
        <aside className="filters-section">
          <div className="filter-group">
            <h3 className="filter-title">Minimum Salary</h3>
            <input
              type="range"
              className="salary-range"
              min="0"
              max="100000"
              step="5000"
              value={filters.salary}
              onChange={(e) => handleFilterChange("salary", e.target.value)}
            />
            <p>from ₹{filters.salary.toLocaleString()}</p>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Job Type</h3>
            <div className="filter-options">
              {jobTypes.map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={filters.jobType.includes(type)}
                    onChange={() => handleFilterChange("jobType", type)}
                  />
                  {type.replace(/_/g, " ")}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Job Category</h3>
            <div className="filter-options">
              {disabilityCategories.map((category) => (
                <label key={category.disabilityCatId}>
                  <input
                    type="checkbox"
                    value={category.disabilityCatName}
                    checked={filters.jobCategory.includes(
                      category.disabilityCatName
                    )}
                    onChange={() =>
                      handleFilterChange(
                        "jobCategory",
                        category.disabilityCatName
                      )
                    }
                  />
                  {category.disabilityCatName}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="search-header">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search for jobs..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button className="sort-button" onClick={toggleSort}>
              Sort by {sortNewest ? "Oldest" : "Newest"}
            </button>
          </div>

          <div className="jobs-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.job_post_id}
                  title={job.designation}
                  company={job.comp_desc}
                  jobType={job.job_type.replace(/_/g, " ")}
                  category={job.job_category}
                  salaryRange={`₹${job.min_sal.toLocaleString()} - ₹${job.max_sal.toLocaleString()}`}
                  experience={`${job.min_exp} - ${job.max_exp} years`}
                  deadline={new Date(job.deadline).toLocaleDateString()}
                />
              ))
            ) : (
              <p className="no-jobs">No jobs found matching the criteria.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default JobSearch;
