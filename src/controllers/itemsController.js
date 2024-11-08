import { 
    createLostFoundPostService,
    getLostFoundItemsService,
    getLostFoundPostByIdService,
    updateLostFoundPostService,
    deleteLostFoundPostService
  } from '../services/itemsService.js';
  
  export const createLostFoundPost = async (req, res) => {
    const {
      userId,
      postId,
      postDate,
      images,
      title,
      description,
      lostAt,
      foundAt,
      keywords,
      contactInfo,
      reward,
    } = req.body;
  
    try {
      const post = await createLostFoundPostService(
        userId,
        postId,
        postDate,
        images,
        title,
        description,
        lostAt,
        foundAt,
        keywords,
        contactInfo,
        reward,
      );
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating lost/found post', error: error.message });
    }
  };
  
  export const getLostFoundItems = async (req, res) => {
    try {
      const items = await getLostFoundItemsService();
      res.status(200).json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching lost/found items', error: error.message });
    }
  };
  
  export const getLostFoundPostById = async (req, res) => {
    const { postId } = req.params;
    
    try {
      const post = await getLostFoundPostByIdService(postId);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching lost/found post', error: error.message });
    }
  };
  
  export const updateLostFoundPost = async (req, res) => {
    const { postId } = req.params;
    const { userId, postDate, images, title, description, lostAt, foundAt, keywords, contactInfo, reward, status } = req.body;
    
    try {
      const updatedPost = await updateLostFoundPostService(postId, userId, postDate, images, title, description, lostAt, foundAt, keywords, contactInfo, reward, status);
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ message: 'Post not found or unauthorized update' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating lost/found post', error: error.message });
    }
  };
  
  export const deleteLostFoundPost = async (req, res) => {
    const { postId } = req.params;
    
    try {
      const deletedPost = await deleteLostFoundPostService(postId);
      if (deletedPost) {
        res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting lost/found post', error: error.message });
    }
  };
  