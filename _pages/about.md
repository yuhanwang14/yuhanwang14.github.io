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

<!-- Tab Content Sections -->
<div id="homepage" class="tab-content active">
  ## About Me

  <p>I am an undergraduate student majoring in Mathematics and Computer Science at New York University, and an incoming Master of Science student in Data Science at Harvard University (September 2025). My research interests focus on artificial intelligence, computer vision, and medical image analysis. Currently, I work as a research assistant at the AI4CE Lab at NYU Tandon and the Radiology Research Department at NYU Langone Health, where I contribute to projects in 3D reconstruction, assembly, and medical imaging analysis.</p>

  ## 🔥 News

  - *2025.02*: 🎉🎉 Accepted to Harvard University's Master of Science program in Data Science!

  ## 📝 Publications 

  <div class='paper-box'>
    <div class='paper-box-image'>
      <div>
        <div class="badge">Arxiv 2025</div>
        <img src='images/GARF.gif' alt="GARF Project" width="100%">
      </div>
    </div>
    <div class='paper-box-text'>
      <p><strong><a href="https://ai4ce.github.io/GARF/">GARF: Learning Generalizable 3D Reassembly for Real-World Fractures</a></strong></p>
      <p>Chen Feng, <strong>Grace Chen</strong>, et al. <a href="https://arxiv.org/abs/2504.05400"><strong>Project</strong></a></p>
    </div>
  </div>

  ## 📖 Education

  - *2025.09 - 2026.12 (incoming)*, Master of Science in Data Science, Harvard University
  - *2022.09 - 2025.05*, Bachelor of Art in Mathematics and Computer Science, New York University
</div>

<div id="research" class="tab-content">
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

<div id="professional" class="tab-content">
  ## 💼 Professional Experience
  
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

<div id="skills" class="tab-content">
  ## 🛠 Skills
  
  ### Technical Proficiency
  R, Java, Python, C, SPSS Statistics, SQL, CSS, HTML, GIS
  
  ### Languages
  Mandarin Chinese (Native), English (Fluent)
</div>

<style>
/* Tab content styling */
.tab-content {
  display: none;
  animation: fadeIn 0.3s ease-in;
}

.tab-content.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Paper box styling */
.paper-box {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px #efefef solid;
  padding: 2em 0 2em 0;
  margin: 2em 0;
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
function showTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Update active navigation state
  const navLinks = document.querySelectorAll('.masthead__menu-item a');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  event.target.classList.add('active');
}

// Initialize - show homepage on load
document.addEventListener('DOMContentLoaded', function() {
  showTab('homepage');
});
</script>