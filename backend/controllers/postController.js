const Post = require('../models/Post');

// Get all posts for a user
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all public posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', ['name', 'email']);
    
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a post
exports.createPost = async (req, res) => {
  try {
    const { title, content, platform, image, scheduledDate } = req.body;

    const newPost = new Post({
      user: req.user.id,
      title,
      content,
      platform,
      image,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      status: scheduledDate ? 'scheduled' : 'published'
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', ['name', 'email']);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, platform, image, scheduledDate, status } = req.body;

    let post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post belongs to the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.platform = platform || post.platform;
    post.image = image !== undefined ? image : post.image;
    post.scheduledDate = scheduledDate ? new Date(scheduledDate) : post.scheduledDate;
    post.status = status || post.status;

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post belongs to the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
}; 