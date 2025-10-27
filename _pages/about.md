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
  
  <p>I am a Master of Science student in Data Science at Harvard University (September 2025 - December 2026) and a recent graduate with a Bachelor of Arts in Mathematics and Computer Science from New York University (September 2022 - May 2025). My research interests focus on artificial intelligence, computer vision, and medical image analysis. Currently, I work as a Deep Learning Researcher at Harvard & MIT AI and Robotics Lab, NYU Tandon AI4CE Lab, and NYU Langone Health Radiology Research Department, where I contribute to projects in 3D reconstruction, assembly, and medical imaging analysis.</p>

  <h2>🔥 News</h2>
  
  <ul>
    <li><em>2025.06</em>: 🎉🏝️ <strong>GARF accepted to ICCV 2025</strong>! See you in Hawaii! 🌺</li>
    <li><em>2025.06</em>: 📝 <strong>PAGE-4D submitted to ICLR 2026</strong> (Under Review)</li>
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
        <div class="badge">ICLR 2026</div>
        <img src='images/PAGE-4D.gif' alt="PAGE-4D Project" width="100%">
      </div>
    </div>
    <div class='paper-box-text'>
      <p><strong><a href="https://page-4d.github.io/anonymous-submission/">PAGE-4D: Disentangled Pose and Geometry Estimation for 4D Perception</a></strong></p>
      <p>Kaichen Zhou, <strong>Grace Chen</strong>, et al. <a href="https://page-4d.github.io/anonymous-submission/"><strong>Project</strong></a> / <a href="https://arxiv.org/pdf/2510.17568">Paper</a></p>
    </div>
  </div>
</div>

<div id="research" class="tab-content">
  <h2>💻 Research Experience</h2>
  
  <h3>Harvard & MIT, AI and Robotics Lab</h3>
  <p><em>June 2025 - Present</em>, Deep Learning Researcher</p>
  <ul>
    <li>Co-developed selective layer fine-tuning approach for VGGT transformer optimizing hyperparameters</li>
    <li>Implemented evaluation metrics including DTU accuracy, ATE/RPE for pose, and Occlusion Accuracy tracking</li>
    <li>Enhanced SFTTrainer developing custom classification loss functions improving prediction accuracy by 75%</li>
    <li>Evaluated performance using confusion matrix analysis improving class-wise precision with F1-score metrics</li>
  </ul>

  <h3>NYU Tandon, AI4CE Lab</h3>
  <p><em>August 2024 - Present</em>, Deep Learning Researcher</p>
  <ul>
    <li>Processed 7 archaeopteryx thoracic and spinal bone fragments achieving assembly using PuzzleFusion and models</li>
    <li>Fine-tuned model parameters on archaeological datasets using PyTorch achieving 25% improvement in accuracy</li>
    <li>Developed BreakingGood simulation pipeline using PyTorch and trimesh for training data generation processes</li>
    <li>Created 50% more varied training datasets for model robustness handling mesh processing and fragmentation</li>
  </ul>

  <h3>NYU Langone Health, Radiology Research Department</h3>
  <p><em>February 2024 - May 2025</em>, Data Science Researcher</p>
  <ul>
    <li>Built analysis framework for 1.2K+ patient datasets supporting clinical research workflows with pipelines</li>
    <li>Developed data cleaning pipelines using Python, Pandas, and NumPy for radiology report processing</li>
    <li>Deployed Large Language Models for radiology report processing and cyst characteristic extraction from records</li>
    <li>Conducted statistical analysis on 200 radiology reports using Cohen's Kappa hypothesis test with R</li>
  </ul>
</div>

<div id="professional" class="tab-content">
  <h2>💼 Professional Experience</h2>
  
  <h3>Guotai Jun'an Securities</h3>
  <p><em>May 2023 - July 2023</em>, Investment Banking Intern, Shanghai, China</p>
  <ul>
    <li>Built data engineering pipelines for 10+ client financial analysis projects with ETL processes automation</li>
    <li>Set up MySQL databases automatically pulling data from multi-source financial systems for deal evaluation</li>
    <li>Conducted data analysis and preprocessing using Python, Pandas, and NumPy for market research</li>
    <li>Implemented data cleaning procedures and missing value imputation processing financial statements for pitch books</li>
  </ul>

  <h2>🎓 Course Project</h2>
  
  <h3>StyleMe: AI-Powered Fashion Styling Assistant</h3>
  <p><em>Technologies:</em> Python, Docker, MLflow, FashionCLIP, GCP, MLOps</p>
  <ul>
    <li>Built MLOps infrastructure using Docker containers streamlining deployment model reproducibility for production</li>
    <li>Developed GPU-accelerated training pipelines for FashionCLIP models on NVIDIA V100 GPU in GCP</li>
    <li>Integrated MLflow tracking improving model convergence speed by 60% through hyperparameter tuning</li>
    <li>Implemented automated model versioning monitoring achieving 98% uptime for fashion recommendation service</li>
  </ul>
</div>

<div id="skills" class="tab-content">
  <h2>🛠 Skills</h2>
  
  <h3>Programming Languages</h3>
  <p>Python, SQL, Java, R, Spark, C, Bash, Shell, HTML, CSS, JavaScript</p>
  
  <h3>Machine Learning</h3>
  <p>PyTorch, TensorFlow, Scikit-learn, Hugging Face, Transformers, OpenCV, XGBoost, MLOps</p>
  
  <h3>Data Analysis</h3>
  <p>Pandas, NumPy, Scipy, Matplotlib, Seaborn, A/B Testing, Statistical Analysis, Hypothesis Testing</p>
  
  <h3>Tools & Technologies</h3>
  <p>Docker, Git, Jupyter, Tableau, Looker, Airflow, DBT, ETL Pipelines, GCP, AWS</p>
  
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