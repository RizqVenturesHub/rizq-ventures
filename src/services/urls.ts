// Centralized API base URL and commonly used endpoints
// This file normalizes the base URL if user copied the Swagger UI link.

const rawBase = process.env.REACT_APP_API_BASE_URL || process.env.REACT_APP_BASE_URL || 'http://localhost:8080';
let baseUrl = String(rawBase).trim();
try {
  const u = new URL(baseUrl);
  if (u.pathname && u.pathname.includes('/swagger-ui')) {
    baseUrl = `${u.protocol}//${u.host}`;
  }
} catch (e) {
  baseUrl = baseUrl || 'http://localhost:8080';
}

export { baseUrl };

// Auth
export const registerUrl = `${baseUrl}/api/auth/register`;
export const loginUrl = `${baseUrl}/api/auth/login`;
export const validateUrl = `${baseUrl}/api/auth/validate`;

// Users / profile
export const myProfileUrl = `${baseUrl}/api/users/myprofile`;
export const userByIdUrl = (userId: string) => `${baseUrl}/api/users/${userId}`;

// Skills
export const skillsUrl = `${baseUrl}/api/users/myprofile/skills`;
export const skillByIdUrl = (skillId: string) => `${skillsUrl}/${skillId}`;
export const skillsPrimaryUrl = `${skillsUrl}/primary`;
export const skillsSecondaryUrl = `${skillsUrl}/secondary`;

// Experiences
export const experiencesUrl = `${baseUrl}/api/users/myprofile/experiences`;
export const experienceByIdUrl = (id: string) => `${experiencesUrl}/${id}`;

// Education
export const educationUrl = `${baseUrl}/api/users/myprofile/education`;
export const educationByIdUrl = (id: string) => `${educationUrl}/${id}`;

// Posts
export const postsUrl = `${baseUrl}/api/posts`;
export const postByIdUrl = (id: string) => `${postsUrl}/${id}`;
export const postLikeUrl = (id: string) => `${postsUrl}/${id}/like`;
export const postLikesCountUrl = (id: string) => `${postsUrl}/${id}/likes/count`;
export const postIsLikedUrl = (id: string) => `${postsUrl}/${id}/is-liked`;
export const postsByUserUrl = (userId: string) => `${postsUrl}/user/${userId}`;
export const postsFeedUrl = `${postsUrl}/feed`;

// Comments
export const postCommentsUrl = (postId: string) => `${postsUrl}/${postId}/comments`;
export const postCommentByIdUrl = (postId: string, commentId: string) => `${postsUrl}/${postId}/comments/${commentId}`;
export const postCommentRepliesUrl = (postId: string, commentId: string) => `${postsUrl}/${postId}/comments/${commentId}/replies`;
export const postCommentsCountUrl = (postId: string) => `${postsUrl}/${postId}/comments/count`;

// Jobs
export const jobsUrl = `${baseUrl}/api/jobs`;
export const jobByIdUrl = (id: string) => `${jobsUrl}/${id}`;
export const jobRecommendedUrl = `${jobsUrl}/recommended`;
export const myJobsUrl = `${jobsUrl}/my-jobs`;

// Job applications
export const applyJobUrl = (jobId: string) => `${jobsUrl}/${jobId}/apply`;
export const jobApplicationsUrl = (jobId: string) => `${jobsUrl}/${jobId}/applications`;
export const jobApplicationCountUrl = (jobId: string) => `${jobsUrl}/${jobId}/applications/count`;
export const myApplicationsUrl = `${jobsUrl}/my-applications`;

// Notifications
export const notificationsUrl = `${baseUrl}/api/notifications`;
export const notificationByIdUrl = (id: string) => `${notificationsUrl}/${id}`;
export const notificationsUnreadCountUrl = `${notificationsUrl}/unread-count`;
export const notificationsReadAllUrl = `${notificationsUrl}/read-all`;

// Search
export const searchUsersUrl = `${baseUrl}/api/search/users`;
export const searchJobsUrl = `${baseUrl}/api/search/jobs`;

export default {
  baseUrl,
};
