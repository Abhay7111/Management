import React, { useState } from 'react';
import { Manager } from '../Data/PostManager';

function Tasks() {
  const { createPost, loading, error } = Manager();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    description: '', // Fixed typo from 'discription'
    task: [],
    links: {
      facebook: '',
      instagram: '',
      youtube: '',
      github: '',
      company: '' // Fixed typo from 'companey'
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
      return;
    }

    // Handle task array updates
    if (name.startsWith('task')) {
      const [_, index, field] = name.split('.');
      const updatedTasks = formData.task.map((task, i) => 
        i === parseInt(index) ? { ...task, [field]: value } : task
      );
      setFormData(prev => ({ ...prev, task: updatedTasks }));
      return;
    }

    // Handle regular fields
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        loggedInDate: new Date(),
        task: formData.task.map(task => ({
          ...task,
          created: new Date(),
          startDate: new Date(),
          lastDate: new Date()
        }))
      };
      await createPost(postData);
      // Reset form after successful submission
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
        description: '',
        task: [],
        links: {
          facebook: '',
          instagram: '',
          youtube: '',
          github: '',
          company: ''
        }
      });
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      task: [
        ...prev.task,
        {
          title: '',
          description: '', // Fixed typo
          category: '',
          created: new Date(),
          startDate: new Date(),
          lastDate: new Date()
        }
      ]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-2 border rounded"
            required
          />
        </div>
        
        {/* Contact Info */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        
        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows="3"
          required
        />
        
        {/* Task Section */}
        <div className="space-y-4">
          {formData.task.map((task, index) => (
            <div key={index} className="space-y-2 border p-4 rounded">
              <input
                type="text"
                name={`task.${index}.title`}
                value={task.title}
                onChange={handleChange}
                placeholder="Task Title"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name={`task.${index}.description`}
                value={task.description}
                onChange={handleChange}
                placeholder="Task Description"
                className="w-full p-2 border rounded"
                rows="2"
                required
              />
              <input
                type="text"
                name={`task.${index}.category`}
                value={task.category}
                onChange={handleChange}
                placeholder="Task Category"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTask}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Add Task
          </button>
        </div>
        
        {/* Social Links */}
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData.links).map(platform => (
            <input
              key={platform}
              type="text"
              name={`links.${platform}`}
              value={formData.links[platform]}
              onChange={handleChange}
              placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Link`}
              className="p-2 border rounded"
            />
          ))}
        </div>
      
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Submitting...' : 'Create Post'}
        </button>
      
        {error && <div className="text-red-500">Error: {error.message}</div>}
      </form>
    </div>
  );
}

export default Tasks;