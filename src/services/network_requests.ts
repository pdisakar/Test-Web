import { cache } from 'react';
import client from './network';
import { AxiosResponse } from 'axios';

export type ApiResponse<T = any> = Promise<AxiosResponse<T>>;

// Used
export async function getGlobalData(): ApiResponse {
  try {
    return await client.get('/global');
  } catch (err) {
    return Promise.reject(err);
  }
}

// Used
export async function getOptionsData(): ApiResponse {
  try {
    return await client.get('/options');
  } catch (err) {
    return Promise.reject(err);
  }
}

// Used
export async function getHomeData(): ApiResponse {
  try {
    return await client.get('/homepage');
  } catch (err) {
    return Promise.reject(err);
  }
}

// Used
export async function getArticle(query: string | number): ApiResponse {
  try {
    return await client.get(`/content/${query}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

// Blog page API
export async function getBlogPage(): ApiResponse {
  try {
    const res = await client.get(`/pagecontent/blogpage?_limit=6`);
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
}

// Blog by slug API
export async function getBlogBySlug(query: string | number): ApiResponse {
  try {
    const res = await client.get(`/blogcontent/${query}`);
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
}

// to get all members and the body of it
export async function getAllMembers() {
  return await client
    .get(`/pagecontent/teampage`)
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

// to get indivisual team member data
export async function getTeamMember(query: string | number): ApiResponse {
  return await client
    .get(`/membercontent/${query}`)
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

// to get all testimonials
export async function getAllTestimonials(limit: number = 6): Promise<any> {
  try {
    const res = await client.get(`/alltestimonials?_limit=${limit}`);
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
}


export async function getStaticRoutes() {
  return await client
    .get(`/content`)
    .then(async res => {
      return res;
    })
    .catch(err => {
      return undefined;
    });
}

export const getGlobalDataCached = cache(getGlobalData);
export const getOptionsDataCached = cache(getOptionsData);
export const getHomeDataCached = cache(getHomeData);
export const getArticleCached = cache(getArticle);
export const getBlogPageCached = cache(getBlogPage);
export const getBlogBySlugCached = cache(getBlogBySlug);
export const getAllMembersCached = cache(getAllMembers as any);
export const getTeamMemberCached = cache(getTeamMember);
export const getAllTestimonialsCached = cache(getAllTestimonials as any);
