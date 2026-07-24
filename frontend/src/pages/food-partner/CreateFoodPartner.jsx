import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CreateFoodPartner.css";
import API_URL from "../../api/api";

const CreateFoodPartner = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [video, setVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!video) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(video);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [video]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];

    setError("");
    setSuccess("");

    if (!selectedVideo) {
      setVideo(null);
      return;
    }

    if (!selectedVideo.type.startsWith("video/")) {
      setError("Please select a valid video.");
      setVideo(null);
      return;
    }

    setVideo(selectedVideo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!video) {
      setError("Please select a video.");
      return;
    }

    const formData = new FormData();

    formData.append("video", video);
    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${API_URL}/api/food`,
        formData,
        {
          withCredentials: true,
        }
      );

      setSuccess("Meal published successfully.");
      setTimeout(() => {
        setSuccess("");
      }, 3000);

      setForm({
        name: "",
        description: "",
      });

      setVideo(null);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.message);

      if (err.response?.status === 401) {
        setError("Please login again.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="create-food-page">
      <header className="create-food-header">
        <Link className="create-food-back" to="/user/login">
          ← Back to User Login
        </Link>

        <span className="create-food-brand">
          BiteLoop
        </span>
      </header>

      <section className="create-food-shell">
        <div className="create-food-heading">
          <span className="create-food-eyebrow">
            Share something worth finding
          </span>

          <h1>Publish a new meal</h1>

          <p>
            Turn your best dish into a reel your customers
            can taste with their eyes.
          </p>
        </div>

        <form
          className="create-food-form"
          onSubmit={handleSubmit}
        >
          <div className="create-food-upload">
            {previewUrl ? (
              <video
                className="create-food-preview"
                src={previewUrl}
                controls
              />
            ) : (
              <div className="create-food-upload-prompt">
                <span className="create-food-upload-icon">
                  +
                </span>

                <strong>Add your food video</strong>

                <span>MP4, MOV, WEBM</span>
              </div>
            )}

            <input
              id="food-video"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />

            <label
              htmlFor="food-video"
              className="create-food-upload-label"
            >
              {video ? "Change video" : "Choose video"}
            </label>
          </div>

          <div className="create-food-field">
            <label>Meal name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Smoky Noodles"
            />
          </div>

          <div className="create-food-field">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell everyone why this meal is special..."
            />

            <span>
              {form.description.length}/240
            </span>
          </div>

          {error && (
            <p className="create-food-error">
              {error}
            </p>
          )}

          {success && (
            <p className="create-food-success">
              {success}
            </p>
          )}

          <button
            className="create-food-submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Publishing..."
              : "Publish Meal"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateFoodPartner;