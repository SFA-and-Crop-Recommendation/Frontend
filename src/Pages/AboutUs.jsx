import Navbar from './../Components/Navbar';
import Footer from '../Components/Footer';
import Nimai from '../assets/Nimai.png'
import Nejarul from '../assets/Nejarul.jpeg'
import Surojit from '../assets/Surojit.jpeg'
import TeamMemberCard from '../Components/TeamMemberCard';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Nejarul Islam",
      rollNo: "T91/CSE/216010",
      responsibility: "Machine Learning & Model Training",
      image: Nejarul
    },
    {
      name: "Surojit Das",
      rollNo: "T91/CSE/216021",
      responsibility: "Machine Learning & Model Training",
      image: Surojit
    },
    {
      name: "Nimai Barman",
      rollNo: "T91/CSE/216011",
      responsibility: "UI Design, Frontend Development",
      image: Nimai
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-5 py-8 w-full">
        <section className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">About Our Project</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            CropPilot is an intelligent farming assistant that helps farmers maximize their profits through data-driven crop recommendations and price predictions.
          </p>
        </section>

        {/* Team Members Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <TeamMemberCard
                  image={member.image}
                  name={member.name}
                  rollNo={member.rollNo}
                  responsibility={member.responsibility}
                />
                
              </div>
            ))}
          </div>
        </section>

        {/* Project Details Section */}
        <section className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">About CropPilot</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-5">
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-6">
                To empower farmers with AI-driven insights that help them make informed decisions about crop selection and market timing, ultimately increasing their profitability and sustainability.
              </p>

              <h3 className="text-xl font-bold text-green-600 mb-4">Key Features</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Soil-specific crop recommendations based on N, P, K values
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  12-month price predictions for better harvest planning
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Live market prices updated daily
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Profit estimation for different crop options
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4">Technology Stack</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Frontend:</strong> React.js, Tailwind CSS, Chart.js
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Backend:</strong> Python, Node.js
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Machine Learning:</strong> Python, Scikit-learn
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Database:</strong> MongoDB
                </li>
              </ul>

              <h3 className="text-xl font-bold text-green-600 mt-8 mb-4">Contact Us</h3>
              <p className="text-gray-700">
                For inquiries or support, please email us at:
                <a href="mailto:support@croppilot.com" className="text-green-600 hover:underline ml-2">
                  support@croppilot.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;