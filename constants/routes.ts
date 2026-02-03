export const APP_ROUTES = {
	login: "/auth/login",
	signup: "/auth/signup",
	dashboard: "/dashboard",
	singlePost: (postId: string | number) => `/dashboard/${postId}`,
	singlePostEdit: (postId: string | number) => `/dashboard/${postId}/edit`,
	createPost: "/dashboard/create",
} as const;
