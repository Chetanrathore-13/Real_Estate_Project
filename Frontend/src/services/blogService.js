// Mock data for blogs
let blogs = [
    {
      id: "1",
      title: "Getting Started with React",
      description:
        "Learn how to build modern web applications with React, the JavaScript library for building user interfaces.",
      category: "Technology",
      tags: ["React", "JavaScript", "Web Development"],
      featureImage: "https://via.placeholder.com/800x400?text=React+JS",
      author: "Jane Doe",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "The Power of CSS Grid",
      description: "Discover how CSS Grid can help you build complex layouts without using floats or positioning.",
      category: "Technology",
      tags: ["CSS", "Web Design", "Layout"],
      featureImage: "https://via.placeholder.com/800x400?text=CSS+Grid",
      author: "John Smith",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      title: "State Management in React",
      description:
        "Explore different state management solutions in React and how to choose the right one for your application.",
      category: "Technology",
      tags: ["React", "State Management", "Redux"],
      featureImage: "https://via.placeholder.com/800x400?text=State+Management",
      author: "Alex Johnson",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  
  // Simulate API delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  
  export const blogService = {
    // Get all blogs
    getBlogs: async () => {
      await delay(500)
      return [...blogs]
    },
  
    // Get blog by ID
    getBlogById: async (id) => {
      await delay(300)
      return blogs.find((blog) => blog.id === id)
    },
  
    // Create a new blog
    createBlog: async (blogData) => {
      await delay(800)
  
      const newBlog = {
        id: Date.now().toString(),
        ...blogData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  
      blogs.push(newBlog)
      return newBlog
    },
  
    // Update an existing blog
    updateBlog: async (id, blogData) => {
      await delay(800)
  
      const index = blogs.findIndex((blog) => blog.id === id)
      if (index === -1) return null
  
      const updatedBlog = {
        ...blogs[index],
        ...blogData,
        updatedAt: new Date(),
      }
  
      blogs[index] = updatedBlog
      return updatedBlog
    },
  
    // Delete a blog
    deleteBlog: async (id) => {
      await delay(500)
  
      const initialLength = blogs.length
      blogs = blogs.filter((blog) => blog.id !== id)
  
      return blogs.length < initialLength
    },
  }
  
  