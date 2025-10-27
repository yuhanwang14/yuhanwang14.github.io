---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<!-- Custom Tab Navigation -->
<div class="custom-tab-navigation">
  <button class="custom-tab-button active" onclick="showCustomTab('about-me')">About Me</button>
  <button class="custom-tab-button" onclick="showCustomTab('research-experience')">Research Experience</button>
  <button class="custom-tab-button" onclick="showCustomTab('work-experience')">Work Experience</button>
  <button class="custom-tab-button" onclick="showCustomTab('skills')">Skills</button>
</div>

<!-- Tab Content -->
<div id="about-me" class="custom-tab-content active">
  <span class='anchor' id='about-me'></span>
  
  <p>I am an undergraduate student majoring in Mathematics and Computer Science at New York University, and an incoming Master of Science student in Data Science at Harvard University (September 2025). My research interests focus on artificial intelligence, computer vision, and medical image analysis. Currently, I work as a research assistant at the AI4CE Lab at NYU Tandon and the Radiology Research Department at NYU Langone Health, where I contribute to projects in 3D reconstruction, assembly, and medical imaging analysis.</p>

  ## 🔥 News
  - *2025.02*: &nbsp;🎉🎉 Accepted to Harvard University's Master of Science program in Data Science! 

  ## 📝 Publications 
  <div class='paper-box'><div class='paper-box-image'><div><div class="badge">Arxiv 2025</div><img src='images/GARF.gif' alt="sym" width="100%"></div></div>
  <div class='paper-box-text' markdown="1">
    
  [GARF: Learning Generalizable 3D Reassembly for Real-World Fractures](https://ai4ce.github.io/GARF/)

  Chen Feng, **Grace Chen**, et al. [**Project**](https://arxiv.org/abs/2504.05400) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
  </div>
  </div>

  ## 📖 Education
  - *2025.09 - 2026.12 (incoming)*, Master of Science in Data Science, Harvard University
  - *2022.09 - 2025.05*, Bachelor of Art in Mathematics and Computer Science, New York University
</div>

<div id="research-experience" class="custom-tab-content">
  <span class='anchor' id='research-experience'></span>
  
  ## 💻 Research Experience
  
  ### AI4CE Lab, NYU Tandon
  *2024.08 - Present* (supervised by Prof. Chen Feng)
  - 3D Assembly Project: Contributed to GARF model for generalizable 3D reassembly 
  - 3D Reconstruction Project: Implemented Dust3R geometric 3D vision model for archaeological fragment reconstruction

  ### NYU Langone Health, Radiology Research Department
  *2024.02 - Present* (supervised by Dr. Yiqiu Shen)
  - Pancreatic Cancer Project: Processed data for 1200+ patients, used LLMs to analyze radiology reports
  - Breast Cancer Project: Conducted statistical analysis on radiology reports using Cohen's Kappa hypothesis test, improved GPT training prompt template for BI-RADS score ratings by 10%

  ### Chongqing University of Technology
  *2023.11 - Present* (supervised by Prof. Dongyang Qiu)
  - Implemented machine learning algorithms for financial risk early warning models
  - Developed data preprocessing tools, reducing processing time by 15%

  ### NYU Savin's Lab
  *2023.11 - 2024.05* (supervised by Prof. Cristina Savin)
  - Conducted research on dimensionality reduction and Gaussian Models for data analysis
</div>

<div id="work-experience" class="custom-tab-content">
  <span class='anchor' id='work-experience'></span>
  
  ## 💼 Work Experience
  
  ### Guotai Jun'an Securities
  *2023.05 - 2023.07*, Investment Banking Intern, Shanghai, China
  - Developed project proposals focused on market research and financial assessments
  - Contributed to 10+ high-profile roadshows for client company offerings (project resulted in successful IPO)
  - Produced financial offering-related documents including due diligence and client interviews

  ## 💬 Teaching Experience
  
  ### Courant Institute of Mathematical Sciences
  *2024.02 - Present*, Teaching Assistant for Linear Algebra and Calculus III
  - Provided one-on-one tutoring and detailed feedback, and graded assignments for classes of 50+ students
</div>

<div id="skills" class="custom-tab-content">
  <span class='anchor' id='skills'></span>
  
  ## 🛠 Skills
  
  ### Technical Proficiency
  R, Java, Python, C, SPSS Statistics, SQL, CSS, HTML, GIS
  
  ### Languages
  Mandarin Chinese (Native), English (Fluent)
</div>

<style>
/* Hide the default Jekyll navigation */
.site-nav {
  display: none !important;
}

/* Custom Tab Navigation Styles */
.custom-tab-navigation {
  display: flex;
  border-bottom: 2px solid #e1e4e8;
  margin-bottom: 2rem;
  background: #f6f8fa;
  border-radius: 6px 6px 0 0;
}

.custom-tab-button {
  background: none;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  color: #586069;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  flex: 1;
  text-align: center;
}

.custom-tab-button:hover {
  color: #0366d6;
  background-color: #f1f8ff;
}

.custom-tab-button.active {
  color: #0366d6;
  border-bottom-color: #0366d6;
  font-weight: 600;
  background-color: white;
}

/* CRITICAL: Hide all tab content by default */
.custom-tab-content {
  display: none !important;
  animation: fadeIn 0.3s ease-in;
  padding: 30px 0;
}

/* CRITICAL: Only show active tab content */
.custom-tab-content.active {
  display: block !important;
}

/* Add proper spacing within tab content */
.custom-tab-content {
  max-width: 100%;
}

.custom-tab-content p {
  margin-bottom: 1.5em;
  line-height: 1.8;
  text-align: justify;
}

.custom-tab-content h2 {
  margin-top: 2em;
  margin-bottom: 1em;
  font-size: 1.4em;
}

.custom-tab-content h3 {
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  font-size: 1.2em;
}

.custom-tab-content ul {
  margin-top: 1em;
  margin-bottom: 1.5em;
  padding-left: 2em;
}

.custom-tab-content li {
  margin-bottom: 0.75em;
  line-height: 1.7;
}

.custom-tab-content > *:first-child {
  margin-top: 0;
}

/* Ensure proper spacing for the main content area */
.page__content {
  padding-right: 1rem;
  padding-left: 1rem;
}

/* Force hide non-active tabs */
.custom-tab-content:not(.active) {
  display: none !important;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.paper-box {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px #efefef solid;
  padding: 2em 0 2em 0;
}

.paper-box-image {
  justify-content: center;
  display: flex;
  width: 100%;
  order: 2;
}

.paper-box-image img {
  max-width: 400px;
  box-shadow: 3px 3px 6px #888;
  object-fit: cover;
}

.paper-box-text {
  max-width: 100%;
  order: 1;
}

@media (min-width: 768px) {
  .paper-box-image {
    justify-content: left;
    min-width: 200px;
    max-width: 40%;
    order: 1;
  }
  
  .paper-box-text {
    justify-content: left;
    padding-left: 2em;
    max-width: 60%;
    order: 2;
  }
}

.badge {
  padding-left: 1rem;
  padding-right: 1rem;
  position: absolute;
  margin-top: .5em;
  margin-left: -.5em;
  color: white;
  background-color: #00369f;
  font-size: .8em;
}
</style>

<script>
function showCustomTab(tabId) {
  console.log('Switching to tab:', tabId);
  
  // Hide all tab contents
  const contents = document.querySelectorAll('.custom-tab-content');
  contents.forEach(content => {
    content.classList.remove('active');
    content.style.display = 'none';
    content.style.visibility = 'hidden';
  });
  
  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.custom-tab-button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  
  // Show selected tab content
  const targetContent = document.getElementById(tabId);
  if (targetContent) {
    targetContent.classList.add('active');
    targetContent.style.display = 'block';
    targetContent.style.visibility = 'visible';
  }
  
  // Add active class to clicked button
  const clickedButton = event.target;
  clickedButton.classList.add('active');
  
  // Update URL hash without reloading page
  history.pushState(null, null, '#' + tabId);
}

// Initialize tabs on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing tabs');
  
  // Force hide all tab contents first
  const contents = document.querySelectorAll('.custom-tab-content');
  contents.forEach((content, index) => {
    content.classList.remove('active');
    content.style.display = 'none';
    content.style.visibility = 'hidden';
  });
  
  // Show only the first tab
  const firstTab = document.querySelector('.custom-tab-content');
  if (firstTab) {
    firstTab.classList.add('active');
    firstTab.style.display = 'block';
    firstTab.style.visibility = 'visible';
  }
  
  // Handle URL hash navigation
  const hash = window.location.hash.substring(1);
  if (hash && document.getElementById(hash)) {
    showCustomTab(hash);
  }
});

// Handle browser back/forward buttons
window.addEventListener('hashchange', function() {
  const hash = window.location.hash.substring(1);
  if (hash && document.getElementById(hash)) {
    showCustomTab(hash);
  }
});
</script>