import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
// import { Mail, Linkedin, Phone, Github, ExternalLink, Code, Briefcase, Trophy, School, ChevronUp, Menu, X } from 'lucide-react';
// Using styled emojis as fallback for build stability
const Mail = () => <span className="icon-fallback">📧</span>;
const Linkedin = () => <span className="icon-fallback">🔗</span>;
const Phone = () => <span className="icon-fallback">📞</span>;
const ExternalLink = () => <span className="icon-fallback">↗️</span>;
const ChevronUp = () => <span className="icon-fallback">↑</span>;
const Menu = () => <span className="icon-fallback">☰</span>;
const X = () => <span className="icon-fallback">✕</span>;
const Github = () => <span className="icon-fallback">🐙</span>;
import BackgroundCanvas from './components/BackgroundCanvas';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [formStatus, setFormStatus] = React.useState({ submitting: false, success: false, error: false });

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMode = () => setIsDarkMode(!isDarkMode);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false });
    
    const form = e.target;
    const data = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus({ submitting: false, success: true, error: false });
        form.reset();
        setTimeout(() => setFormStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        setFormStatus({ submitting: false, success: false, error: true });
      }
    } catch (error) {
      setFormStatus({ submitting: false, success: false, error: true });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className={`portfolio ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <BackgroundCanvas isDarkMode={isDarkMode} />
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <a href="#home" className="logo">SONU<span>.KUMAR</span></a>
          <ul className="nav-links desktop-only">
            {navLinks.map((link) => (
              <li key={link.name}><a href={link.href}>{link.name}</a></li>
            ))}
          </ul>
          <div className="nav-actions">
            <div className="mode-toggle" onClick={toggleMode}>
              {isDarkMode ? '🌙' : '☀️'}
            </div>
            <div className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <div className="close-menu" onClick={() => setIsMenuOpen(false)}><X size={32} /></div>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}>{link.name}</a>
        ))}
      </div>
      <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="container hero-container">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-text"
            >
              <div className="badge">
                <span className="dot"></span>
                Open to Opportunities
              </div>
              <h1 className="hero-title">
                Hi, I'm <br />
                <span className="highlight">Sonu Kumar</span>
              </h1>
              <div className="hero-typing">
                <Typewriter
                  options={{
                    strings: ['Full-Stack Developer', 'Programmer', 'BCA Student', 'UI/UX Enthusiast'],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
              </div>
              <p className="hero-subtitle">
                Crafting high-performance digital experiences with modern aesthetics.
                Based in Varanasi, building the future of the web.
              </p>
              <div className="hero-ctas">
                <a href="#contact" className="btn btn-primary">Get In Touch</a>
                <a href="/resume.pdf" download="Sonu_Kumar_Resume.pdf" className="btn btn-ghost">Download Resume</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-image-container"
            >
              <div className="orbit-container">
                <div className="orbit orbit-1"></div>
                <div className="orbit orbit-2"></div>
                <div className="orbit orbit-3"></div>
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="image-wrapper"
                >
                  <img src="sonu-kumar10.jpg" alt="Sonu Kumar" />
                  <div className="premium-aura"></div>
                  <div className="image-border"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-header"
            >
              <h2 className="section-title">About <span>Me</span></h2>
              <p className="section-desc">Learn more about my background and expertise</p>
            </motion.div>

            <div className="about-grid">
              {/* Left Column - Abstract Cards */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="about-visuals"
              >
                <div className="abstract-cards">
                  <div className="card-layer layer-1"></div>
                  <div className="card-layer layer-2"></div>
                  <div className="card-layer layer-3">
                     <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="smile-icon"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="about-content"
              >
                <h3 className="about-heading">Who am I?</h3>
                <p className="about-text">
                  I'm a BCA student with a passion for web development and programming. With
                  strong fundamentals in computer science and hands-on experience with modern
                  web technologies, I create responsive and interactive web applications.
                </p>
                <p className="about-text">
                  My journey in tech started with curiosity about how things work, and now I'm
                  driven by the desire to create meaningful digital experiences that solve real-world problems.
                </p>

                <h4 className="strengths-heading">Key Strengths</h4>
                <div className="strengths-grid">
                  <div className="strength-item">Web Development</div>
                  <div className="strength-item">UI/UX Design</div>
                  <div className="strength-item">Problem Solving</div>
                  <div className="strength-item">Full Stack</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-header"
            >
              <h2 className="section-title">Professional <span>Skills</span></h2>
              <p className="section-desc">Technical expertise and interpersonal strengths categorized for clarity.</p>
            </motion.div>

            {[
              {
                category: "Frontend",
                skills: [
                  { name: 'React', icon: '⚛️', level: 'Expert', color: '#61DAFB', size: 'large' },
                  { name: 'JavaScript', icon: '⚡', level: 'Expert', color: '#F7DF1E', size: 'medium' },
                  { name: 'HTML5/CSS3', icon: '🌐', level: 'Master', color: '#E34F26', size: 'medium' },
                  { name: 'Responsive Design', icon: '📱', level: 'Expert', color: '#3178C6', size: 'small' }
                ]
              },
              {
                category: "Backend",
                skills: [
                  { name: 'Java (Core + Advance)', icon: '☕', level: '', color: '#ED8B00', size: 'large' },
                  { name: 'Python', icon: '🐍', level: 'Basic', color: '#3776AB', size: 'small' },
                  { name: 'MySQL', icon: '🗄️', level: 'Intermediate', color: '#4479A1', size: 'small' }
                ]
              },
              {
                category: "Tools & Others",
                skills: [
                  { name: 'Git/GitHub', icon: '🐙', level: 'Proficient', color: '#F05032', size: 'small' },
                  { name: 'VS Code', icon: '🔍', level: 'Expert', color: '#007ACC', size: 'small' },
                  { name: 'Problem Solving', icon: '🧩', level: 'Advanced', color: '#5B5FEF', size: 'medium' }
                ]
              },
              {
                category: "Soft Skills",
                skills: [
                  { name: 'Communication', icon: '💬', level: 'Excellent', color: '#FF7F50', size: 'small' },
                  { name: 'Team Work', icon: '🤝', level: 'Strong', color: '#4CAF50', size: 'small' },
                  { name: 'Adaptability', icon: '🔄', level: 'High', color: '#2196F3', size: 'small' },
                  { name: 'Time Management', icon: '⏰', level: 'Reliable', color: '#9C27B0', size: 'small' }
                ]
              }
            ].map((cat, catIndex) => (
              <div key={cat.category} className="skill-category-group">
                <h3 className="category-title">{cat.category}</h3>
                <div className="skills-bento">
                  {cat.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={`skill-bento-card ${skill.size}`}
                      style={{ '--skill-color': skill.color }}
                    >
                      <div className="skill-content">
                        <span className="skill-icon">{skill.icon}</span>
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level">{skill.level}</span>
                        </div>
                      </div>
                      <div className="skill-glow"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-header"
            >
              <h2 className="section-title">Featured <span>Projects</span></h2>
            </motion.div>

            <div className="projects-grid">
              {[
                {
                  id: '01',
                  title: 'School Management System',
                  desc: 'Comprehensive system for student records, attendance, and fee management using Java & MySQL.',
                  tags: ['Java', 'MySQL', 'Swing']
                },
                {
                  id: '02',
                  title: 'College ERP Frontend',
                  desc: 'Modern student dashboard and course portal. Mobile-first design focusing on UI/UX.',
                  tags: ['React', 'CSS3', 'Responsive']
                },
                  {
                    id: '03',
                    title: 'Netflix Clone',
                    desc: 'Pixel-perfect recreation of Netflix homepage with dynamic banners and content rows.',
                    tags: ['HTML5', 'CSS3', 'JS']
                  },
                  {
                    id: '04',
                    title: 'Modern Portfolio',
                    desc: 'Modern, responsive portfolio website with smooth animations and dark mode support.',
                    tags: ['Next.js', 'Framer Motion', 'Tailwind']
                  }
              ].map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="project-card"
                >
                  <span className="proj-id">{project.id}</span>
                  <h3 className="proj-title">{project.title}</h3>
                  <p className="proj-desc">{project.desc}</p>
                  <div className="proj-tags">
                    {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="proj-link"><ExternalLink size={20} /></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="experience" className="experience">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-header"
            >
              <h2 className="section-title">Educational <span>Journey</span></h2>
              <p className="section-desc">My academic background and key milestones.</p>
            </motion.div>

            <div className="timeline">
              {[
                {
                  year: '2023 - Present',
                  title: 'Bachelor of Computer Applications (BCA)',
                  inst: 'Kashi Institute of Technology, Varanasi',
                  desc: 'Studying core computer science concepts, data structures, and web development technologies.',
                  result: 'CGPA: 7.3+'
                },
                {
                  year: '2022 - 2023',
                  title: 'Higher Secondary Education (12th - Science)',
                  inst: 'Arjun Prasad Inter College, Gauri',
                  desc: 'Focused on Physics, Chemistry, and Mathematics with a strong foundation in STEM subjects.',
                  result: '73%'
                },
                {
                  year: '2020 - 2021',
                  title: 'Secondary Education (10th)',
                  inst: 'Arjun Prasad Inter College, Gauri',
                  desc: 'Completed secondary education with an emphasis on science and mathematics.',
                  result: '75%'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="timeline-item"
                >
                  <div className="time-marker"></div>
                  <div className="time-content">
                    <span className="time-year">{item.year}</span>
                    <h3 className="time-title">{item.title}</h3>
                    <p className="time-inst-text">{item.inst}</p>
                    <p className="time-desc">{item.desc}</p>
                    <div className="time-result-badge">{item.result}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-header"
            >
              <h2 className="section-title">Get In <span>Touch</span></h2>
              <p className="section-desc">Have a project in mind or just want to say hello? Get in touch with me!</p>
            </motion.div>

            <div className="contact-grid">
              {/* Contact Info (Left) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="contact-info-column"
              >
                <h3 className="column-title">Contact Information</h3>

                <div className="info-cards">
                  <div className="info-card">
                    <div className="info-icon"><Mail size={20} /></div>
                    <div className="info-details">
                      <span>Email</span>
                      <p>sonuraj50945094@gmail.com</p>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon"><Phone size={20} /></div>
                    <div className="info-details">
                      <span>Phone</span>
                      <p>+91 6388195944</p>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">📍</div>
                    <div className="info-details">
                      <span>Location</span>
                      <p>Varanasi, India</p>
                    </div>
                  </div>
                </div>

                <div className="social-connect">
                  <h4>Connect With Me</h4>
                  <div className="social-links-row">
                    <a href="http://www.linkedin.com/in/sonu-kumar-77591b330" target="_blank" rel="noopener noreferrer" className="social-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="https://github.com/Sonukumarsahani" target="_blank" rel="noopener noreferrer" className="social-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="mailto:sonuraj50945094@gmail.com" className="social-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                    </a>
                  </div>
                </div>

                <div className="resume-download-box">
                  <h4>My Resume</h4>
                  <a href="/resume.pdf" download="Sonu_Kumar_Resume.pdf" className="btn btn-ghost">Download CV</a>
                </div>
              </motion.div>

              {/* Contact Form (Right) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="contact-form-column"
              >
                <form
                  className="premium-form"
                  action="https://formspree.io/f/xnjoaawp" // Using a generic endpoint or user can provide theirs
                  method="POST"
                  onSubmit={handleFormSubmit}
                >
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Your name" required disabled={formStatus.submitting} />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Your email" required disabled={formStatus.submitting} />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea name="message" rows="5" placeholder="Your message..." required disabled={formStatus.submitting}></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn" disabled={formStatus.submitting}>
                    {formStatus.submitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {formStatus.success && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="form-status form-success">
                      Message sent successfully! ✨
                    </motion.div>
                  )}
                  {formStatus.error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="form-status form-error">
                      Oops! Something went wrong. Please try again.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-info">
            <h3>SONU<span>.KUMAR</span></h3>
            <p>Full-Stack Developer | BCA Student</p>
          </div>
          <div className="footer-copy">
            <p>© 2025 Sonu Kumar. Varanasi, India.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp size={24} />
        </motion.div>
      )}
    </div>
  );
};

export default App;
