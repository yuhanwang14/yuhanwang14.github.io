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
  
  <p>I am a Master of Science student in Data Science at Harvard University (September 2025 - December 2026) and a recent graduate with a Bachelor of Arts in Mathematics and Computer Science from New York University (September 2022 - May 2025). My research interests focus on <span class="highlight-research">3D reconstruction</span>, <span class="highlight-research">rendering-induced intelligence</span>, and <span class="highlight-research">generative 3D models</span>, particularly in applications to computer vision and robotic systems. Previously, I worked as a Deep Learning Researcher at NYU Tandon AI4CE Lab and as a Data Science Researcher at NYU Langone Health Radiology Research Department, where I contributed to projects in 3D reconstruction, assembly, and medical imaging analysis. Currently, I work as a Deep Learning Researcher at Harvard & MIT AI and Robotics Lab.</p>

  <div class="highlight-job">
    <strong>🎯 Internship Opportunity</strong><br>
    <em>Available: May 26th, 2026 - August 30th, 2026</em><br>
    <strong>Target Roles:</strong> ML Engineer, Computer Vision Engineer, Data Scientist, Software Development Engineer, Quant Researcher<br>
    <strong>My Edge:</strong> My interdisciplinary background in Mathematics, Computer Science, and Data Science provides a strong foundation for technical problem-solving across domains. I bring extensive experience in deep learning frameworks (PyTorch, TensorFlow), cloud infrastructure (GCP, AWS), and production ML systems, along with proven research capabilities demonstrated through publications at leading conferences (ICCV, ICLR). Whether optimizing model performance, building scalable data pipelines, or developing financial models, I thrive in translating complex technical concepts into impactful solutions.
  </div>

  <h2>🔥 News</h2>
  
  <ul>
    <li><em>2025.06</em>: 🎉🏝️ <strong>GARF accepted to ICCV 2025</strong>! See you in Hawaii! 🌺</li>
    <li><em>2025.02</em>: 🎉🎉 Accepted to Harvard University's Master of Science program in Data Science!</li>
  </ul>

  <h2>📝 Publications</h2>
  
  <div class='paper-box'>
    <div class='paper-box-image'>
      <div>
        <div class="badge">Arxiv 2025</div>
        <img src='images/PAGE-4D.gif' alt="PAGE-4D Project" width="100%">
      </div>
    </div>
    <div class='paper-box-text'>
      <p><strong><a href="https://page-4d.github.io/anonymous-submission/">PAGE-4D: Disentangled Pose and Geometry Estimation for 4D Perception</a></strong></p>
      <p>Kaichen Zhou, Yuhan Wang, <strong>Grace Chen</strong> (2nd author), Xinhai Chang, Gaspard Beaudouin, Fangneng Zhan, Paul Pu Liang, Mengyu Wang. <a href="https://page-4d.github.io/anonymous-submission/"><strong>Project</strong></a> / <a href="https://arxiv.org/pdf/2510.17568">Paper</a></p>
    </div>
  </div>

  <div class='paper-box'>
    <div class='paper-box-image'>
      <div>
        <div class="badge">ICCV 2025</div>
        <img src='images/GARF.gif' alt="GARF Project" width="100%">
      </div>
    </div>
    <div class='paper-box-text'>
      <p><strong><a href="https://ai4ce.github.io/GARF/">GARF: Learning Generalizable 3D Reassembly for Real-World Fractures</a></strong></p>
      <p>Sihang Li, Zeyu Jiang, <strong>Grace Chen</strong> (2nd author), Chenyang Xu, Siqi Tan, Xue Wang, Irving Fang, Kristof Zyskowski, Shannon P. McPherron, Radu Iovita, Chen Feng, Jing Zhang. <a href="https://arxiv.org/abs/2504.05400"><strong>Project</strong></a> / <a href="https://arxiv.org/abs/2504.05400">Paper</a></p>
    </div>
  </div>
</div>

<div id="research" class="tab-content">
  <h2>💻 Research Experience</h2>
  
  <h3>Harvard & MIT, AI and Robotics Lab</h3>
  <p><em>June 2025 - Present</em>, Deep Learning Researcher</p>
  <ul>
    <li>Co-developed selective layer fine-tuning approach for <strong>VGGT transformer</strong> optimizing hyperparameters</li>
    <li>Implemented evaluation metrics including <strong>DTU accuracy, ATE/RPE for pose, and Occlusion Accuracy tracking</strong></li>
    <li>Enhanced <strong>SFTTrainer</strong> developing custom classification loss functions improving prediction accuracy by <strong>75%</strong></li>
    <li>Evaluated performance using confusion matrix analysis improving class-wise precision with <strong>F1-score</strong> metrics</li>
  </ul>

  <h3>NYU Tandon, AI4CE Lab</h3>
  <p><em>August 2024 - Present</em>, Deep Learning Researcher</p>
  <ul>
    <li>Processed <strong>7 archaeopteryx thoracic and spinal bone fragments</strong> achieving assembly using <strong>PuzzleFusion</strong> and models</li>
    <li>Fine-tuned model parameters on archaeological datasets using <strong>PyTorch</strong> achieving <strong>25%</strong> improvement in accuracy</li>
    <li>Developed <strong>BaggingGrid</strong> simulation pipeline using <strong>PyTorch</strong> and trimesh for training data generation processes</li>
    <li>Created <strong>50% more varied training datasets</strong> for model robustness handling mesh processing and fragmentation</li>
  </ul>

  <h3>NYU Langone Health, Radiology Research Department</h3>
  <p><em>February 2024 - May 2025</em>, Data Science Researcher</p>
  <ul>
    <li>Built analysis framework for <strong>1.2K+ patient datasets</strong> supporting clinical research workflows with pipelines</li>
    <li>Developed data cleaning pipelines using <strong>Python, Pandas, and NumPy</strong> for radiology report processing</li>
    <li>Deployed <strong>Large Language Models</strong> for radiology report processing and cyst characteristic extraction from records</li>
    <li>Conducted statistical analysis on <strong>200 radiology reports</strong> using <strong>Cohen's Kappa</strong> hypothesis test with <strong>R</strong></li>
  </ul>
</div>

<div id="professional" class="tab-content">
  <h2>💼 Professional Experience</h2>
  
  <h3>Guotai Jun'an Securities</h3>
  <p><em>May 2023 - July 2023</em>, Investment Banking Intern, Shanghai, China</p>
  <ul>
    <li>Built data engineering pipelines for <strong>10+ client financial analysis projects</strong> with <strong>ETL</strong> processes automation</li>
    <li>Set up <strong>MySQL</strong> databases automatically pulling data from multi-source financial systems for deal evaluation</li>
    <li>Conducted data analysis and preprocessing using <strong>Python, Pandas, and NumPy</strong> for market research</li>
    <li>Implemented data cleaning procedures and missing value imputation processing financial statements for pitch books</li>
  </ul>

  <h2>🎓 Course Project</h2>
  
  <h3>StyleMe: AI-Powered Fashion Styling Assistant</h3>
  <p><em>Technologies:</em> Python, <strong>Docker</strong>, <strong>MLflow</strong>, <strong>FashionCLIP</strong>, <strong>GCP</strong>, <strong>MLOps</strong></p>
  <ul>
    <li>Built <strong>MLOps infrastructure</strong> using <strong>Docker</strong> containers streamlining deployment model reproducibility for production</li>
    <li>Developed <strong>GPU-accelerated training pipelines</strong> for <strong>FashionCLIP</strong> models on <strong>NVIDIA V100 GPU</strong> in <strong>GCP</strong></li>
    <li>Integrated <strong>MLflow</strong> tracking improving model convergence speed by <strong>60%</strong> through hyperparameter tuning</li>
    <li>Implemented automated model versioning monitoring achieving <strong>98% uptime</strong> for fashion recommendation service</li>
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

/* Highlight styles */
.highlight-research {
  font-weight: 700;
}

.highlight-skills {
  font-weight: 700;
}

.highlight-achievement {
  font-weight: 700;
}

.highlight-job {
  font-weight: 700;
  display: inline-block;
  margin: 1.5em 0;
  padding: 1em 1.5em;
  background-color: #e0f7fa;
  border: 2px solid #81d4fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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