import React from 'react';
import { Link } from 'react-scroll';
import { Calendar, Code2, Brain, Shield, ChevronDown, Github, Linkedin, Twitter, BookOpen, Terminal } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-orbitron">
      {/* Navbar */}
      <nav className="fixed w-full bg-dark-bg/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold neon-glow">CS CONNECT</div>
          <div className="hidden md:flex space-x-8">
            {['About', 'Tracks', 'Schedule', 'Blog', 'Challenge', 'Sponsors', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                className="nav-link cursor-pointer"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center text-center px-4 pt-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-glow">
            CS CONNECT PAKISTAN
          </h1>
          <h2 className="text-2xl md:text-4xl mb-8 purple-glow">
            Innovate. Connect. Code.
          </h2>
          <p className="text-xl mb-8">March 15-17, 2024</p>
          <button className="bg-transparent border-2 border-neon-blue px-8 py-3 rounded-full text-neon-blue hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 pulse-animation">
            Register Now
          </button>
          <div className="mt-16">
            <Link to="about" smooth={true} duration={500} className="cursor-pointer">
              <ChevronDown className="w-8 h-8 mx-auto animate-bounce" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center neon-glow">About Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 purple-glow">The Vision</h3>
              <p>Connect Pakistan's brightest minds in computer science to innovate, learn, and build the future together.</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 purple-glow">The Mission</h3>
              <p>48 hours of coding, collaboration, and creativity to solve real-world problems through technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="py-20 px-4 bg-dark-bg/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center neon-glow">Tracks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl text-center">
              <Brain className="w-12 h-12 mx-auto mb-6 text-neon-purple" />
              <h3 className="text-xl font-bold mb-4">Artificial Intelligence</h3>
              <p>Build the next generation of AI solutions</p>
            </div>
            <div className="glass-card p-8 rounded-xl text-center">
              <Code2 className="w-12 h-12 mx-auto mb-6 text-neon-blue" />
              <h3 className="text-xl font-bold mb-4">Web Development</h3>
              <p>Create innovative web applications</p>
            </div>
            <div className="glass-card p-8 rounded-xl text-center">
              <Shield className="w-12 h-12 mx-auto mb-6 text-neon-purple" />
              <h3 className="text-xl font-bold mb-4">Cybersecurity</h3>
              <p>Secure the digital frontier</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center neon-glow">Schedule</h2>
          <div className="space-y-6">
            {[
              { day: 'Day 1', time: '9:00 AM', event: 'Opening Ceremony' },
              { day: 'Day 1', time: '10:00 AM', event: 'Team Formation' },
              { day: 'Day 2', time: '2:00 PM', event: 'Mentorship Sessions' },
              { day: 'Day 3', time: '3:00 PM', event: 'Project Submissions' },
              { day: 'Day 3', time: '5:00 PM', event: 'Closing Ceremony' },
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 rounded-xl flex items-center">
                <Calendar className="w-6 h-6 mr-4 text-neon-blue" />
                <div className="flex-1">
                  <h3 className="font-bold">{item.day}</h3>
                  <p>{item.event}</p>
                </div>
                <div className="text-neon-purple">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-dark-bg/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center neon-glow">Blog</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Preparing for CS CONNECT 2024",
                date: "Feb 15, 2024",
                excerpt: "Essential tips and tricks to make the most of your hackathon experience."
              },
              {
                title: "Top AI Trends in 2024",
                date: "Feb 10, 2024",
                excerpt: "Explore the latest developments in artificial intelligence and machine learning."
              },
              {
                title: "Web Development Best Practices",
                date: "Feb 5, 2024",
                excerpt: "Learn about modern web development techniques and tools."
              },
              {
                title: "Cybersecurity Essentials",
                date: "Feb 1, 2024",
                excerpt: "Understanding the basics of securing your applications."
              }
            ].map((post, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <BookOpen className="w-6 h-6 mb-4 text-neon-blue" />
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-neon-purple mb-4">{post.date}</p>
                <p className="mb-4">{post.excerpt}</p>
                <button className="text-neon-blue hover:text-neon-purple transition-colors">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Programming Challenge Section */}
      <section id="challenge" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center neon-glow">Daily Challenge</h2>
          <div className="glass-card p-8 rounded-xl">
            <div className="flex items-center mb-6">
              <Terminal className="w-8 h-8 mr-4 text-neon-purple" />
              <h3 className="text-2xl font-bold">Today's Challenge</h3>
            </div>
            <div className="bg-dark-bg/70 p-6 rounded-lg mb-6">
              <p className="font-mono text-neon-blue">
                Write a function that finds the longest palindromic substring in a given string.
              </p>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-transparent border-2 border-neon-blue px-6 py-2 rounded-lg text-neon-blue hover:bg-neon-blue hover:text-dark-bg transition-all duration-300">
                Submit Solution
              </button>
              <button className="w-full bg-transparent border-2 border-neon-purple px-6 py-2 rounded-lg text-neon-purple hover:bg-neon-purple hover:text-dark-bg transition-all duration-300">
                View Leaderboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 px-4 bg-dark-bg/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center neon-glow">Sponsors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="glass-card aspect-video rounded-xl flex items-center justify-center">
                <span className="text-2xl text-neon-blue">Sponsor {index}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center neon-glow">Contact Us</h2>
          <div className="glass-card p-8 rounded-xl">
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-dark-bg/50 border border-neon-blue rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-dark-bg/50 border border-neon-blue rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full bg-dark-bg/50 border border-neon-blue rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                ></textarea>
              </div>
              <button className="w-full bg-transparent border-2 border-neon-purple px-8 py-3 rounded-lg text-neon-purple hover:bg-neon-purple hover:text-dark-bg transition-all duration-300">
                Send Message
              </button>
            </form>
          </div>
          <div className="mt-12 flex justify-center space-x-8">
            <a href="#" className="text-neon-blue hover:text-neon-purple transition-colors">
              <Github className="w-8 h-8" />
            </a>
            <a href="#" className="text-neon-blue hover:text-neon-purple transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="#" className="text-neon-blue hover:text-neon-purple transition-colors">
              <Twitter className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;