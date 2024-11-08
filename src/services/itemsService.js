import prisma from '../config/database.js';

// Service to create a new lost/found post
export const createLostFoundPostService = async (userId, postId, postDate, images, title, description, lostAt, foundAt, keywords, contactInfo, reward) => {
  const postData = {
    userId,
    postId,
    postDate,
    images,
    title,
    description,
    keywords,
    contactInfo,
    reward,
  };

  // Adjust post data based on whether it's a lost or found post
  if (lostAt) {
    postData.lostAt = lostAt;
    postData.lostItemRetrievedStatus = false;
  }
  if (foundAt) {
    postData.foundAt = foundAt;
    postData.foundItemRetrievedStatus = false;
  }

  try {
    const post = await prisma.lostFoundItem.create({
      data: postData,
    });
    return post;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating lost/found post');
  }
};

// Service to get all recent lost and found items
export const getLostFoundItemsService = async () => {
  try {
    const lostItems = await prisma.lostFoundItem.findMany({
      where: {
        OR: [
          { lostAt: { not: null } },
          { foundAt: { not: null } }
        ]
      },
      orderBy: { postDate: 'desc' }
    });
    return lostItems;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching lost/found items');
  }
};

// Service to get a single post by its postId
export const getLostFoundPostByIdService = async (postId) => {
  try {
    const post = await prisma.lostFoundItem.findUnique({
      where: { postId },
    });
    return post;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching lost/found post by ID');
  }
};

// Service to update the details of a lost/found post
export const updateLostFoundPostService = async (postId, userId, postDate, images, title, description, lostAt, foundAt, keywords, contactInfo, reward, status) => {
  const updateData = {};

  if (postDate) updateData.postDate = postDate;
  if (images) updateData.images = images;
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (keywords) updateData.keywords = keywords;
  if (contactInfo) updateData.contactInfo = contactInfo;
  if (reward) updateData.reward = reward;
  if (lostAt) {
    updateData.lostAt = lostAt;
    updateData.lostItemRetrievedStatus = false; // Reset lost status to false when updated
  }
  if (foundAt) {
    updateData.foundAt = foundAt;
    updateData.foundItemRetrievedStatus = false; // Reset found status to false when updated
  }

  try {
    // Update only the post if it exists and the user is authorized (check userId if necessary)
    const updatedPost = await prisma.lostFoundItem.update({
      where: { postId },
      data: updateData,
    });

    // If the status is updated to true, delete the post (automatic deletion based on retrieved status)
    if (updatedPost.lostItemRetrievedStatus || updatedPost.foundItemRetrievedStatus) {
      await prisma.lostFoundItem.delete({ where: { postId } });
      return null; // Post is deleted
    }

    return updatedPost;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating lost/found post');
  }
};

// Service to delete a lost/found post
export const deleteLostFoundPostService = async (postId) => {
  try {
    // Deleting post by postId
    const deletedPost = await prisma.lostFoundItem.delete({
      where: { postId },
    });
    return deletedPost;
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting lost/found post');
  }
};
