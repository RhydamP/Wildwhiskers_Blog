import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-sky-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="/image.png"
              alt="WildWhiskers Logo"
              className="w-24 h-24 mx-auto mb-6 drop-shadow-lg"
            />
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              About <span className="text-cyan-300">WildWhiskers</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Welcome to WildWhiskers, where passion meets paws and every tale tells a story of unconditional love, adventure, and the incredible bond between humans and their furry companions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  At WildWhiskers, we believe every pet has a story worth sharing. Our mission is to create a vibrant community where pet lovers can connect, learn, and celebrate the joy that our four-legged friends bring to our lives.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Whether you're a seasoned pet parent or considering your first furry addition, we're here to guide, inspire, and support your journey with expert advice, heartwarming stories, and practical tips.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl p-8 border border-cyan-300/30">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🐾</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Join Our Pack</h3>
                    <p className="text-white/70">
                      Over 10,000+ pet lovers sharing stories, tips, and unconditional love
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "❤️",
                title: "Compassion",
                description: "Every animal deserves love, care, and respect. We promote responsible pet ownership and animal welfare."
              },
              {
                icon: "🌟",
                title: "Community",
                description: "Building connections between pet lovers worldwide, sharing experiences and supporting each other."
              },
              {
                icon: "📚",
                title: "Education",
                description: "Providing reliable, expert-backed information to help you give your pets the best life possible."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-white/70 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Meet Our Pack Leaders</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rhydam PAnda",
                role: "Founder & Chief Pet Enthusiast",
                bio: "Explorer with 2+ years of experience and proud parent of 3 pet dogs.",
                avatar: "👩‍⚕️"
              },
              {
                name: "Ronny",
                role: "Community Manager",
                bio: "Cat whisperer and social media guru who loves connecting pet parents worldwide.",
                avatar: "👨‍💻"
              },
              {
                name: "Risen",
                role: "Content Creator",
                bio: "Professional pet photographer and storyteller capturing the magic of human-animal bonds.",
                avatar: "📸"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-cyan-300 font-medium mb-3">{member.role}</p>
                <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-12 border border-cyan-300/30">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Share your pet's story, connect with fellow animal lovers, and discover tips to make every day with your furry friend even more special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Explore Stories
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;