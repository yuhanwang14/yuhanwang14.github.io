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
  <h2>About Me</h2>
  
  <p>I am a Master of Science student in Data Science at Harvard University and a recent graduate with a Bachelor of Arts in Mathematics and Computer Science from New York University. My research interests focus on artificial intelligence, computer vision, and medical image analysis. Currently, I work as a research assistant at the AI4CE Lab at NYU Tandon and the Radiology Research Department at NYU Langone Health, where I contribute to projects in 3D reconstruction, assembly, and medical imaging analysis.</p>

  <h2>🔥 News</h2>
  
  <ul>
    <li><em>2025.06</em>: 🎉🏝️ <strong>GARF accepted to ICCV 2025</strong>! See you in Hawaii! 🌺</li>
    <li><em>2025.02</em>: 🎉🎉 Accepted to Harvard University's Master of Science program in Data Science!</li>
  </ul>

  <h2>📝 Publications</h2>
  
  <div class='paper-box'>
    <div class='paper-box-image'>
      <div>
        <div class="badge">ICCV 2025</div>
        <img src='images/GARF.gif' alt="GARF Project" width="100%">
      </div>
    </div>
    <div class='paper-box-text'>
      <p><strong><a href="https://ai4ce.github.io/GARF/">GARF: Learning Generalizable 3D Reassembly for Real-World Fractures</a></strong></p>
      <p>Chen Feng, <strong>Grace Chen</strong>, et al. <a href="https://arxiv.org/abs/2504.05400"><strong>Project</strong></a> / <a href="https://arxiv.org/abs/2504.05400">Paper</a></p>
    </div>
  </div>

  <div class='paper-box'>
    <div class='paper-box-image'>
      <div>
        <div class="badge">Arxiv 2025</div>
        <img src='images/PAGE-4D.gif' alt="PAGE-4D Project" width="100%">
      </div>
    </div>
    <div class='paper-box-text'>
      <p><strong><a href="https://page-4d.github.io/anonymous-submission/">PAGE-4D: Disentangled Pose and Geometry Estimation for 4D Perception</a></strong></p>
      <p>Anonymous Authors, <strong>Grace Chen</strong>, et al. <a href="https://page-4d.github.io/anonymous-submission/"><strong>Project</strong></a> / <a href="https://arxiv.org/pdf/2510.17568">Paper</a></p>
    </div>
  </div>
</div>

<div id="research" class="tab-content">
  <h2>💻 Research Experience</h2>
  
  <h3>AI4CE Lab, NYU Tandon</h3>
  <p><em>2024.08 - Present</em> (supervised by Prof. Chen Feng)</p>
  <ul>
    <li>3D Assembly Project: Contributed to GARF model for generalizable 3D reassembly</li>
    <li>3D Reconstruction Project: Implemented Dust3R geometric 3D vision model for archaeological fragment reconstruction</li>
  </ul>

  <h3>NYU Langone Health, Radiology Research Department</h3>
  <p><em>2024.02 - Present</em> (supervised by Dr. Yiqiu Shen)</p>
  <ul>
    <li>Pancreatic Cancer Project: Processed data for 1200+ patients, used LLMs to analyze radiology reports</li>
    <li>Breast Cancer Project: Conducted statistical analysis on radiology reports using Cohen's Kappa hypothesis test, improved GPT training prompt template for BI-RADS score ratings by 10%</li>
  </ul>

  <h3>Chongqing University of Technology</h3>
  <p><em>2023.11 - Present</em> (supervised by Prof. Dongyang Qiu)</p>
  <ul>
    <li>Implemented machine learning algorithms for financial risk early warning models</li>
    <li>Developed data preprocessing tools, reducing processing time by 15%</li>
  </ul>

  <h3>NYU Savin's Lab</h3>
  <p><em>2023.11 - 2024.05</em> (supervised by Prof. Cristina Savin)</p>
  <ul>
    <li>Conducted research on dimensionality reduction and Gaussian Models for data analysis</li>
  </ul>
</div>

<div id="professional" class="tab-content">
  <h2>💼 Professional Experience</h2>
  
  <h3>Guotai Jun'an Securities</h3>
  <p><em>2023.05 - 2023.07</em>, Investment Banking Intern, Shanghai, China</p>
  <ul>
    <li>Developed project proposals focused on market research and financial assessments</li>
    <li>Contributed to 10+ high-profile roadshows for client company offerings (project resulted in successful IPO)</li>
    <li>Produced financial offering-related documents including due diligence and client interviews</li>
  </ul>

  <h2>💬 Teaching Experience</h2>
  
  <h3>Courant Institute of Mathematical Sciences</h3>
  <p><em>2024.02 - Present</em>, Teaching Assistant for Linear Algebra and Calculus III</p>
  <ul>
    <li>Provided one-on-one tutoring and detailed feedback, and graded assignments for classes of 50+ students</li>
  </ul>
</div>

<div id="skills" class="tab-content">
  <h2>🛠 Skills</h2>
  
  <h3>Technical Proficiency</h3>
  <p>R, Java, Python, C, SPSS Statistics, SQL, CSS, HTML, GIS</p>
  
  <h3>Languages</h3>
  <p>Mandarin Chinese (Native), English (Fluent)</p>
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

/* Content spacing */
.tab-content h2 {
  margin-top: 2em;
  margin-bottom: 1em;
  font-size: 1.5em;
  border-bottom: 2px solid #e1e4e8;
  padding-bottom: 0.5em;
}

.tab-content h3 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-size: 1.2em;
  color: #0366d6;
}

.tab-content p {
  margin-bottom: 1em;
  line-height: 1.6;
}

.tab-content ul {
  margin-bottom: 1.5em;
  padding-left: 2em;
}

.tab-content li {
  margin-bottom: 0.5em;
  line-height: 1.5;
}

.tab-content em {
  font-style: italic;
  color: #586069;
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