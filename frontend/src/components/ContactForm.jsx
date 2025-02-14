import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://formspree.io/f/xkgoqnod", { // ✅ Your Formspree endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitStatus("Message sent successfully! ✅");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setSubmitStatus("Failed to send message. ❌ Please try again.");
    }
  };

  return (
    <div className="container contact-box">
      <h2>Contact Us</h2>
      {submitStatus && <p className="success-message">{submitStatus}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
        />
        <button type="submit" className="btn">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
