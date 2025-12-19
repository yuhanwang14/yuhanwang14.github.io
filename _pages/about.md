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

  <p>
  I am a master student in Joint Mathematics and Computer Science at Imperial College and a visiting graduate researcher at MIT Media Lab. My research interests focus on <span class="highlight-research">3D and 4D foundation models</span>, <span class="highlight-research">active vision and robotics</span>, and <span class="highlight-research">VLA (Visual-Language-Action)</span>, particularly in applications to computer vision, robotics, etc. 
  <br>
  Previously, I worked as an undergraduate researcher and full-stack developer at Imperial College, where I contributed to R&D platforms and computational backends for mechanical engineering modules. Currently, I work as a deep learning researcher in the Multisensory Intelligence Group at MIT Media Lab, and I will join Millennium Management's Equity IT Team as an AI Engineer Intern in summer 2026.
  </p>

  <!-- <div class="highlight-job">
    <strong>🎯 Internship Opportunity</strong><br>
    <em>Available: May 26th, 2026 - August 30th, 2026</em><br>
    <strong>Target Roles:</strong> ML Engineer, Computer Vision Engineer, Data Scientist, Software Development Engineer, Quant Researcher<br>
    <strong>My Edge:</strong> My interdisciplinary background in Mathematics, Computer Science, and Data Science provides a strong foundation for technical problem-solving across domains. I bring extensive experience in deep learning frameworks (PyTorch, TensorFlow), cloud infrastructure (GCP, AWS), and production ML systems, along with proven research capabilities demonstrated through publications at leading conferences. Whether optimizing model performance, building scalable data pipelines, or developing financial models, I thrive in translating complex technical concepts into impactful solutions.
  </div> -->

  <h2>🔥 News</h2>
  
  <ul>
    <li><em>2025.11</em>: 💼 Accepted an offer from <strong>Millennium</strong>'s Equity IT Team as an AI Engineer Intern!</li>
    <li><em>2025.06</em>: 🎓 Joined <strong>MIT Media Lab</strong> as a Visiting Graduate Researcher!</li>
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
      <p>Kaichen Zhou, <strong>Yuhan Wang</strong>, Grace Chen, Xinhai Chang, Gaspard Beaudouin, Fangneng Zhan, Paul Pu Liang, Mengyu Wang. <a href="https://page-4d.github.io/anonymous-submission/"><strong>Project</strong></a> / <a href="https://arxiv.org/pdf/2510.17568">Paper</a></p>
    </div>
  </div>

  <!-- <div class='paper-box'>
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
  </div> -->
</div>

<div id="research" class="tab-content">
  <h2>💻 Research Experience</h2>
  
  <h3>MIT Media Lab, Multisensory Intelligence Group</h3>
  <p><em>June 2025 – Present</em>, Graduate Visiting Researcher</p>
  <ul>
    <li>Co-developed <strong>PAGE-4D</strong>, a feedforward 4D perception framework extending <strong>VGGT</strong> with a dynamics-aware aggregator for static–dynamic disentanglement</li>
    <li>Introduced mask-guided attention to suppress motion for pose tokens while exploiting dynamics for geometry tokens</li>
    <li>Applied selective fine-tuning on the middle <strong>10 VGGT layers (~30% parameters)</strong>, matching full fine-tuning performance with no runtime or memory overhead</li>
    <li>Achieved <strong>state-of-the-art results</strong> on Sintel, DyCheck, and TUM benchmarks, improving depth, pose accuracy, and rendering quality (PSNR/SSIM, LPIPS)</li>
  </ul>

  <h3>Imperial College, Department of Mechanical Engineering</h3>
  <p><em>July 2024 - October 2024</em>, Undergraduate Researcher, Full-Stack Developer</p>
  <ul>
    <li>Designed and developed a modern, data-driven web platform called <strong>Smart-Forming</strong> that enables engineers to discover, evaluate, and share manufacturing knowledge modules.</li>
    <li>Focused on intuitive UX, modular architecture, and seamless integration of metadata analytics (e.g. heatmap, word cloud supported by python and matlab) to support <strong>industrial R&D</strong>.</li>
  </ul>

  <h3>UESTC, School of Computer Science and Engineering</h3>
  <p><em>January 2022 - December 2022</em>, High School Researcher</p>
  <ul>
    <li>Research on <strong>Open World Object Detection</strong> for classifying known and unknown objects.</li>
    <li>Improved a <strong>Detectron2-based model ORE</strong> for incremental object detection using contrastive clustering and auto-labeling RPN.</li>
  </ul>
</div>

<div id="industry" class="tab-content">
  <h2>💼 Industry Experience</h2>
  
  <h3>Millennium Management Global Investment</h3>
  <p><em>June 2026 - August 2026</em>, AI Enginneer Intern, London, United Kingdom</p>
  <ul>
    <li>Incoming <strong>AI Enginner Intern</strong> at Millennium Equity IT Team</li>
    <li>Building AI solutions for MLP's equity investment teams around the globe, focusing on applying AI / LLM's to research process augmentation</li>
  </ul>

  <h2>🎓 Personal Projects</h2>

  <h3>Spatial Historical Intelligence, Interactive AI-driven Map</h3>
  <p><em>Technologies:</em> <strong>React.js</strong>, <strong>Perplexity API</strong></p>
  <ul>
    <li>Built an interactive <strong>AI-driven map</strong> that reveals on-click historical, cultural, and contextual narratives for any location (<strong>Perplexity API</strong>)</li>
    <li>Engineered a structured-query <strong>backend to Perplexity</strong> and parsed responses into geospatial entities for real-time visualization.</li>
    <li>Developed correlation mapping and cross-region connections, including life-journey pathing for notable figures across the globe</li>
    <li>Implemented dynamic country comparisons on AI-derived metrics (<strong>economy, culture, innovation</strong>) with responsive data visualizations</li>
  </ul>

  <h3>Zencraft, AI-Powered Personal Growth Platform</h3>
  <p><em>Technologies:</em> <strong>Flutter</strong>, <strong>Go</strong>, <strong>gPRC</strong>, <strong>PostgreSQL</strong></p>
  <ul>
    <li>Built an AI-powered <strong>personal growth app</strong> delivering context-aware insights and reflection guidance</li>
    <li>Ran iterative user testing to refine prompts and UX for clearer, measurable progress</li>
    <li>Implemented interview-style flows, skills tracking, and personalized storytelling via a <strong>Go/gRPC backend</strong></li>
  </ul>

  <h3>NPC Trading System (npcTrading)</h3>
  <p><em>Technologies:</em> <strong>C++</strong>, <strong>WebSocket/REST</strong>, <strong>Boost.Beast</strong>, <strong>OpenSSL</strong>, <strong>Binance Spot API</strong>, <strong>GoogleTest</strong></p>
  <ul>
    <li>Built a message-driven <strong>crypto spot trading engine</strong> with a central <strong>MessageBus</strong> (async send/publish, sync request/response, topic subscriptions, bounded queues, run-loop dispatch)</li>
    <li>Implemented core runtime state: component lifecycle FSM and an in-memory <strong>cache</strong> for orders/positions/instruments plus latest quote/bar/book with ring-buffer history</li>
    <li>Exposed <strong>Actor/Strategy APIs</strong> for subscriptions, market-data callbacks, and order helpers; emits order lifecycle events (submitted/accepted/rejected/filled)</li>
    <li>Integrated Binance Spot market data (WS + REST) and maintained per-instrument <strong>local order books</strong> via depth snapshots + incremental updates</li>
    <!-- <li>Added safety + tests: testnet-first CLI with an explicit live-trading risk flag; 6 GoogleTest suites for MessageBus routing and subscription semantics</li> -->
  </ul>
  
  <h3>Pre-Market Opening Price Anomaly Detector</h3>
  <p><em>Technologies:</em> <strong>Python</strong>, <strong>Quant Finance</strong>, <strong>Backtesting</strong>, <strong>Gradient Boosting</strong></p>
  <ul>
    <li>Built a leakage-safe <strong>pre-open forecasting pipeline</strong> for opening prices using prior-day and benchmark signals.</li>
    <li>Calibrated detection with a <strong>3σ residual threshold</strong>, flagging 1.6% of test days with significant open deviations.</li>
    <li>Ensured reproducibility with strict pre-open feature shifts, a chronological split (372 train / 125 test), and diagnostic plots (residual histograms and time-series with alert markers).</li>
  </ul>

  <h3>WACC Compiler</h3>
  <p><em>Technologies:</em> <strong>Scala</strong>, <strong>Compiler Design</strong></p>
  <ul>
    <li>Built a compiler for the <strong>WACC language</strong> targeting AArch64 (ARMv8-A), supporting full compilation from source to executable.</li>
    <li>Implemented lexical, syntactic, and semantic analysis, ensuring language correctness before code generation.</li>
    <li>Developed a code generator that produces <strong>AArch64 assembly</strong>, enabling execution via GCC and QEMU.</li>
    <li>Supported language features such as variables, expressions, control flow, functions, and heap memory management.</li>
    <li>Integrated robust error detection and type checking to prevent runtime failures.</li>
  </ul>
</div>

<div id="skills" class="tab-content">
  <h2>🛠 Skills</h2>
  

  <h3>Programming Languages</h3>
  <p>Python, Java, C++, C, TypeScript, Go, SQL, Haskell, Scala, Kotlin, Ruby</p>
  
  <h3>Frameworks</h3>
  <p>React.js, gRPC, PostgreSQL, Flutter, Docker, Git, Linux</p>
  
  <h3>Deep Learning & Machine Learning</h3>
  <p>PyTorch, TensorFlow, Scikit-learn, Hugging Face, Transformers, OpenCV, XGBoost, MLOps, Detectron2</p>
    
  <h3>Tools & Technologies</h3>
  <p>Docker, Git, Jupyter Notebook, PostgreSQL, AWS, Azure</p>
  
  <h3>Languages</h3>
  <p>Mandarin Chinese (Native), English (Bilingual)</p>
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