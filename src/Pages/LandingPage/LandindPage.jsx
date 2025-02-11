import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick"; // Import carousel
import Navbar from "../LandingPage/Navbar/Navbar";
import JobCard from "../LandingPage/JobCard/JobCard";
import Footer from "../LandingPage/Footer/Footer";
import "./LandingPage.css";
import { useContext } from "react";
import { fetchJobs } from "../../api/jobPost";
import { UserContext } from "../../App";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const isEmployer = location.state?.isEmployer || false;
  const isJobSeeker = location.state?.isJobSeeker || false;
  console.log("isEmployer:", isEmployer);
  console.log("isJobSeeker", isJobSeeker);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
    };
    loadJobs();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 cards at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <Navbar />

      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-Welcome">
            Welcome to <span className="elevate-text">elevate</span>
          </h1>
          <p>Empowering careers, embracing abilities</p>
          <div className="cta-buttons">
            {user?.roleName === "JOBSEEKER" ? (
              <button
                onClick={() => navigate("/search")}
                className="btn btn-primary"
              >
                Find Jobs
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Get started
              </button>
            )}
          </div>
        </section>

        <section className="featured-jobs">
          <h2>Featured Jobs</h2>
          {jobs.length > 0 ? (
            <Slider {...settings}>
              {jobs.map((job) => (
                <JobCard
                  key={job.job_post_id}
                  title={job.designation}
                  company={job.comp_desc}
                  jobType={job.job_type.replace(/_/g, " ")}
                  category={job.job_category || "General"}
                  salaryRange={`${(job.min_sal / 1000).toFixed(1)}K - ${(job.max_sal / 1000).toFixed(1)}K`}
                  experience={`${job.min_exp} - ${job.max_exp} years`}
                  deadline={new Date(job.deadline).toLocaleDateString()}
                />
              ))}
            </Slider>
          ) : (
            <p>Loading jobs...</p>
          )}
        </section>

        <section className="info-section">
          <h2>
            Why Choose{" "}
            <span style={{ letterSpacing: "-3px", fontFamily: "League Spartan" }}>
              elevate
            </span>
            ?
          </h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Inclusive Opportunities</h3>
              <p>We partner with companies committed to creating an inclusive workplace.</p>
            </div>
            <div className="info-card">
              <h3>Accessible Platform</h3>
              <p>Our platform is designed with accessibility in mind, ensuring a seamless experience for all users.</p>
            </div>
            <div className="info-card">
              <h3>Support Network</h3>
              <p>Connect with a community that understands and supports your career journey.</p>
            </div>
          </div>
        </section>

        <section className="thank-you">
          <h2>
            thank you for choosing{" "}
            <span style={{ fontFamily: "League Spartan", fontWeight: "bold" }}>
              us :)
            </span>
          </h2>
          <p>We're committed to breaking down barriers and building up talents.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
