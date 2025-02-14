import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import '../App.css'; // Ensure this import is present to apply the CSS

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const Dashboard = () => {
  const { user } = useAuth();
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [position, setPosition] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [emailStatus, setEmailStatus] = useState("");
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const response = await axios.get("/api/get-position/");
        if (response.data.position) {
          setPosition(response.data.position);
        }
      } catch (err) {
        console.error("Error fetching position:", err);
      }
    };
    fetchPosition();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contacts/');
        setContacts(response.data.contacts);
      } catch (err) {
        console.error('Error fetching contacts:', err);
      }
    };
    fetchContacts();
  }, []);

  const handleSendEmail = async () => {
    if (!selectedContact) {
      setError("Please select a contact first");
      return;
    }

    setError("");
    setEmailStatus("");
    setIsGeneratingEmail(true);

    try {
      // Check Gmail authorization
      const authCheck = await axios.get('/api/check-gmail-auth/');
      
      if (!authCheck.data.isAuthorized) {
        // Redirect to Gmail authorization
        window.location.href = authCheck.data.authUrl;
        return;
      }

      // Send email
      const response = await axios.post('/api/send-email/', {
        contactId: selectedContact
      });

      setEmailStatus("Email sent successfully!");
      setSelectedContact(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send email');
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploadStatus("");

    // Validate that either position or resume is provided
    const resumeFile = document.getElementById("resume-upload").files[0];
    if (!position && !resumeFile) {
      setError("Please provide either a position or upload a resume");
      return;
    }

    const formData = new FormData();
    const csvFile = document.getElementById("csv-upload").files[0];

    // Optional CSV file
    if (csvFile) formData.append("csv_file", csvFile);
    if (resumeFile) formData.append("resume", resumeFile);
    if (position) formData.append("position", position);

    try {
      const response = await axios.post("/api/upload-files/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus(
        `Successfully updated! ${
          response.data.new_contacts_added
            ? `Added ${response.data.new_contacts_added} new contacts.`
            : ""
        }`
      );
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div className="container">
      <h3>Dashboard</h3>
      <h2>
        Welcome, <span>{user?.name ? toTitleCase(user.name) : ""}</span>!
      </h2>

      {error && <p className="error-message">{error}</p>}
      {uploadStatus && <p className="success-message">{uploadStatus}</p>}

      <form onSubmit={handleFileSubmit}>
        <div className="upload-section">
          <h4>Profile Information</h4>
          <div className="file-upload">
            <label htmlFor="position-input">Position Applying For:</label>
            <input
              type="text"
              id="position-input"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g., Software Engineer Intern"
            />
          </div>
          <div className="file-upload">
            <label htmlFor="resume-upload">Upload Resume:</label>
            <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" />
          </div>
          <div className="file-upload">
            <label htmlFor="csv-upload">Upload Contact List (Optional):</label>
            <input type="file" id="csv-upload" accept=".csv" />
            <small>Format: name, email, title, company</small>
          </div>
        </div>
        <button type="submit" className="btn submit-btn">
          Save Profile
        </button>
      </form>

      <div className="email-section mt-8">
        <h4>Send Cold Email</h4>
        
        {contacts.length > 0 ? (
          <>
            <div className="contact-select">
              <label>Select Contact:</label>
              <select
                value={selectedContact || ''}
                onChange={(e) => setSelectedContact(e.target.value)}
              >
                <option value="">Choose a contact...</option>
                {contacts.map(contact => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name} - {contact.company} ({contact.email})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSendEmail}
              disabled={isGeneratingEmail || !selectedContact}
              className="btn submit-btn"
            >
              {isGeneratingEmail ? 'Generating & Sending Email...' : 'Generate & Send Email'}
            </button>
          </>
        ) : (
          <p>Upload a CSV file with contacts to start sending emails.</p>
        )}

        {emailStatus && <p className="success-message">{emailStatus}</p>}
      </div>
    </div>
  );
};

export default Dashboard;