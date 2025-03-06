import { createStore, Commit } from 'vuex'
import axios from 'axios'
import { arrToObj, objToArr } from './helper'

export interface ResponseType<p = object> {
  code: number;
  data: p;
  msg: string;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
interface ListProps<P> {
  [id: string]: P;
}
export interface GlobalDataProps {
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: { data: ListProps<PostProps>; loadedColumns: string[] };
  user: UserProps;
  error: GlobalErrorProps;
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: { data: {}, loadedColumns: [] },
    user: { isLogin: false },
    error: { status: false }
  },
  mutations: {
    // login (state) {
    //   state.user = { ...state.user, isLogin: true, name: '张三', id: 1 }
    // },
    createPost (state, newPost) {
      state.posts.data[newPost._id] = newPost
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, { data: rawData, extraData: columnId }) {
      console.log(rawData)
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData.list) }
      state.posts.loadedColumns.push(columnId)
    },
    fetchPost (state, rawData) {
      console.log(rawData.data)
      rawData.data.image = rawData.data.image ? rawData.data.image : rawData.data.author.avatar
      state.posts.data[rawData.data._id] = rawData.data
      console.log(state.posts.data)
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    login (state, rawData) {
      state.token = rawData.data.token
      localStorage.setItem('token', rawData.data.token)
      axios.defaults.headers.common.Authorization = `Bearer ${rawData.data.token}`
    },
    logout (state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      return getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ state, commit }, cid) {
      if (!state.posts.loadedColumns.includes(cid)) {
        return getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
      }
    },
    fetchPost ({ state, commit }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        return getAndCommit(`/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve(currentPost)
      }
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    createPost ({ commit }, payload) {
      return postAndCommit('/posts', 'createPost', commit, payload)
    },
    loginAndFetch ({ dispatch }, payload) {
      return dispatch('login', payload).then(() => dispatch('fetchCurrentUser'))
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    }
  }
})

export default store
