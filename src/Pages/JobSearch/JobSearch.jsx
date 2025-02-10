import React, { useEffect, useState } from "react";
import "./JobSearch.css";
import Navbar from "../LandingPage/Navbar/Navbar";
import { fetchJobs } from "../../api/jobPost";
import { Briefcase, Calendar, GraduationCap, GraduationCapIcon, IndianRupee } from "lucide-react";
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

  // as jobs cganges write use effect to filter the jobs and set it in fitered jobs
  // useEffect(() => {
  //   let filtered = jobs.filter((job) => {
  //     const jobSalary = parseInt(job.salary);
  //     const jobExperience = filters.experience.length
  //       ? job.experience.some((exp) => filters.experience.includes(exp))
  //       : true;
  //     const jobQualification = filters.qualification.length
  //       ? job.qualification.some((qual) => filters.qualification.includes(qual))
  //       : true;
  //     const jobDisabilityType = filters.disabilityType.length
  //       ? job.disabilityType.some((dis) => filters.disabilityType.includes(dis))
  //       : true;

  //     return (
  //       jobSalary <= filters.salary &&
  //       jobExperience &&
  //       jobQualification &&
  //       jobDisabilityType
  //     );
  //   });

  //   setFilteredJobs(sortNewest ? [...filtered] : [...filtered].reverse());
  // }, [jobs, filters, sortNewest]);

  // obj for ref
  // {
  //   id: 1,
  //   title: "Software Developer",
  //   company: "Tech Solutions Inc.",
  //   location: "Remote",
  //   type: "Full-Time",
  //   minExperience: 2,
  //   maxExperience: 4,
  //   minSalary: 45000,
  //   maxSalary: 65000,
  //   qualification: "Bachelors",
  //   deadline: "2024-04-10",
  //   postedDate: "2024-03-10"
  // },

  useEffect(() => {
    // filter jobs based on these
    let filtered = jobs.filter((job) => {
      const jobSalary = parseInt(job.minSalary);

      const jobQualification = filters.qualification.length
        ? filters.qualification.some((qual) => qual == job.qualification)
        : true;

      return jobSalary <= filters.salary && jobQualification;
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

  //  search on job title and if not then on company location quaification location
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
      const jobQualification = job.qualification
        .toLowerCase()
        .includes(searchString.toLowerCase());

      return jobTitle || jobCompany || jobLocation || jobQualification;
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
            <p>Up to ₹{filters.salary.toLocaleString()}</p>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Qualification</h3>
            <div className="filter-options">
              {["Bachelors", "Masters", "PhD", "Diploma"].map((qual) => (
                <div className="checkbox-group" key={qual}>
                  <input
                    type="checkbox"
                    id={qual}
                    checked={filters.qualification.includes(qual)}
                    onChange={() => handleFilterChange("qualification", qual)}
                  />
                  <label htmlFor={qual}>{qual}</label>
                </div>
              ))}
            </div>
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
                    <span className="job-type"><Chip label={job.type} variant="outlined" /> </span>
                    <span className="qualification">
                      <Chip label={job.qualification}  onClick={() => {}} icon={<GraduationCapIcon size={18} />}  Filled/>
                    </span>
                  </div>

                  <button className="apply-btn">Apply Now</button>
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
