import React, { useEffect, useState } from "react";
import "./JobSearch.css";
import Navbar from "../LandingPage/Navbar/Navbar";
import { fetchJobs } from "../../api/jobPost";
import { Briefcase, Calendar, IndianRupee } from "lucide-react";
import { Chip } from "@mui/material";

function JobSearch() {
  const [sortNewest, setSortNewest] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    salary: 50000,
    qualification: [],
    disabilityType: [],
  });

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJobs();
      setJobs(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // filter jobs based on these
    let filtered = jobs.filter((job) => {
      const jobSalary = parseInt(job.maxSalary);

      return jobSalary >= filters.salary;
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
        : value,
    }));
  };

  const toggleSort = () => {
    setSortNewest(!sortNewest);
  };

  //  search on job title and if not then on company location jobType location
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.trim() || "");
    let searchString = e.target.value.trim();
    let filtered = jobs.filter((job) => {
      const jobTitle = job.title
        .toLowerCase()
        .includes(searchString.toLowerCase());
      const jobCompany = job.company
        .toLowerCase()
        .includes(searchString.toLowerCase());
      const jobLocation = job.location
        .toLowerCase()
        .includes(searchString.toLowerCase());
      const jobType = job.jobType
        .toLowerCase()
        .includes(searchString.toLowerCase());

      return jobTitle || jobCompany || jobLocation || jobType;
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
            <h3 className="filter-title">Minimum salary</h3>
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

          {/* removing this temporary 
          <div className="filter-group">
            <h3 className="filter-title">Disability Type</h3>
            <div className="filter-options">
              {[
                "Visual Impairment",
                "Hearing Impairment",
                "Physical Disability",
                "Cognitive Disability",
              ].map((type) => (
                <div className="checkbox-group" key={type}>
                  <input
                    type="checkbox"
                    id={type}
                    checked={filters.disabilityType.includes(type)}
                    onChange={() => handleFilterChange("disabilityType", type)}
                  />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}
            </div>
          </div> */}
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
            {filteredJobs.map((job) => (
              <>
                <div className="job-card">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="company-name">{job.company}</p>

                  <div className="job-info">
                    <div className="info-item">
                      <IndianRupee size={16} />
                      <span>
                        ₹{job.minSalary.toLocaleString()} - ₹
                        {job.maxSalary.toLocaleString()}
                      </span>
                    </div>
                    <div className="info-item">
                      <Briefcase size={16} />
                      <span>
                        {job.minExperience} - {job.maxExperience} years
                      </span>
                    </div>
                    <div className="info-item">
                      <Calendar size={16} />
                      <span>Deadline: {job.deadline}</span>
                    </div>
                  </div>

                  <div className="job-meta">
                    <span className="location"><Chip label={job.location} variant="outlined" /> </span>
                    <span className="job-type"><Chip label={job.jobType} variant="outlined" /> </span>
                  </div>

                  <button className="apply-btn">View Details</button>
                </div>
              </>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default JobSearch;



