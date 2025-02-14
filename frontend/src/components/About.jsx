
import pragya from "../assets/pragya.jpg";
import Harsheen from "../assets/Harsheen.jpg";
import Rishita from "../assets/Rishita.jpg";

const About = () => {
  const developers = [
    {
      name: "Pragya",
      image: pragya, // Use the imported image variable
      bio: "Frontend Developer | Passionate about UI/UX and React.",
      linkedin: "https://www.linkedin.com/in/pragya-chaturvedi-95a179251/",
    },
    {
      name: "Harsheen Kaur Kohli",
      image: Harsheen,
      bio: "Backend Enthusiast | Django & Database Expert.",
      linkedin: "https://www.linkedin.com/in/harsheen-kaur-kohli/",
    },
    {
      name: "Rishita Makde",
      image: Rishita,
      bio: "AI Specialist | Passionate about building intelligent systems",
      linkedin: "https://www.linkedin.com/in/rishita-makde-1216a834a/",
    },
  ];
  

  return (
    <div className="container about-box">
      {/* About Website Section */}
      <section className="about-section">
        <h2>About ColdDigger</h2>
        <p>
          Welcome to ColdDigger! We are dedicated to empowering students with a
          seamless and efficient cold-emailing solution. Our platform saves time by
          allowing students to send personalized emails to multiple institutions
          based on their academic interests and career goals.
        </p>
        <p>
          Our mission is to bridge the gap between students and educational
          institutions, streamlining communication and opportunities. Whether
          you're looking for internships, scholarships, or research positions,
          ColdDigger helps you make meaningful connections.
        </p>
      </section>

      {/* About Developers Section */}
      <section className="about-section">
        <h2>About the Developers</h2>
        <div className="developers-container">
          {developers.map((dev, index) => (
            <div className="developer-card" key={index}>
              <img src={dev.image} alt={dev.name} className="developer-img" />
              <h3>{dev.name}</h3>
              <p>{dev.bio}</p>
              <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
