# Complete Guide to Redux Toolkit Query (RTK Query)

## Table of Contents
1. [Introduction](#introduction)
2. [Basic Setup](#basic-setup)
3. [API Configuration](#api-configuration)
4. [Authentication Implementation](#authentication-implementation)
5. [State Management](#state-management)
6. [Hooks and Their Returns](#hooks-and-their-returns)
7. [Best Practices](#best-practices)

## Introduction

This guide provides a comprehensive walkthrough of implementing Redux Toolkit Query (RTK Query) for state management and API interactions. We'll use an authentication system as our example.

## Basic Setup

First, install the required dependencies:
```bash
npm install @reduxjs/toolkit react-redux
```

## API Configuration

### Base URL and Routes
```javascript
Base URL: http://localhost:5000/api/v1

Routes:
- POST /register - User registration
- POST /login - User login
- GET /profile - Get user profile (requires auth)
- GET /logout - User logout (requires auth)
- DELETE /delete - Delete account (requires auth)
```

### Request Bodies
1. Registration:
```javascript
{
  fullname: {
    firstname: string,
    lastname: string
  },
  email: string,
  password: string
}
```

2. Login:
```javascript
{
  email: string,
  password: string
}
```

## Authentication Implementation

### 1. API Setup (src/features/auth/authApi.js)
```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
        // Registration endpoint doesn't need auth token
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: () => '/profile',
    }),
    logout: builder.query({
      query: () => '/logout',
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/delete',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useLogoutQuery,
  useDeleteAccountMutation,
} = authApi;
```

### 2. Auth Slice (src/features/auth/authSlice.js)
```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
```

### 3. Store Configuration (src/app/store.js)
```javascript
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
```

## State Management

### Redux Store Structure
```javascript
{
  auth: {
    user: {
      fullName: {
        firstName: string,
        lastName: string
      },
      email: string
    },
    token: string | null,
    isAuthenticated: boolean
  },
  authApi: {
    queries: {
      // RTK Query cache state
    },
    mutations: {
      // RTK Query mutation state
    }
  }
}
```

### Accessing State
```javascript
// Using getState in API configuration
prepareHeaders: (headers, { getState }) => {
  const token = getState().auth.token;
}

// Using useSelector in components
const user = useSelector((state) => state.auth.user);
const token = useSelector((state) => state.auth.token);
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
```

## Hooks and Their Returns

### 1. RTK Query Hooks

#### Mutation Hooks (useLoginMutation, useRegisterMutation)
Returns an array: `[triggerFunction, resultObject]`
```javascript
const [login, { isLoading, isError, error }] = useLoginMutation();

// resultObject contains:
{
  data: object | undefined,        // Response data
  error: object | undefined,       // Error object
  isLoading: boolean,             // Request in progress
  isSuccess: boolean,             // Request succeeded
  isError: boolean,               // Request failed
  isUninitialized: boolean,       // Not yet called
  reset: () => void,              // Reset state
  status: string                  // Current status
}
```

#### Query Hooks (useGetProfileQuery)
Returns a single object:
```javascript
const { 
  data,                          // Response data
  error,                         // Error object
  isLoading,                     // Initial load
  isFetching,                    // Any load
  isSuccess,                     // Data available
  isError,                       // Request failed
  refetch,                       // Force refetch
  currentData                    // Current data
} = useGetProfileQuery();
```

### 2. Redux Hooks

#### useSelector
```javascript
// Returns exactly what you select from state
const user = useSelector((state) => state.auth.user);
```

#### useDispatch
```javascript
// Returns dispatch function
const dispatch = useDispatch();
```

## Best Practices

### 1. Error Handling with unwrap()
```javascript
try {
  const data = await login(credentials).unwrap();
  dispatch(setCredentials(data));
} catch (error) {
  // Handle error
}
```

### 2. Creating Reusable Selectors
```javascript
// auth/selectors.js
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// In component
const user = useSelector(selectUser);
```

### 3. Complete Component Example
```javascript
function AuthComponent() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [login] = useLoginMutation();

    const handleLogin = async () => {
        try {
            const response = await login({
                email: 'test@example.com',
                password: '123456'
            }).unwrap();

            dispatch(setCredentials({
                user: response.user,
                token: response.token
            }));
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <p>Welcome, {user?.fullName?.firstName}</p>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
}
```

## Key Points to Remember

1. **RTK Query Mutations vs Queries**
   - Mutations: POST/PUT/DELETE operations
   - Queries: GET operations

2. **State Access**
   - Use `useSelector` for reading state
   - Use `useDispatch` for modifying state
   - Both access the same Redux store

3. **Error Handling**
   - Always use `.unwrap()` with mutations for better error handling
   - Handle loading and error states appropriately

4. **Token Management**
   - Token is stored in Redux state
   - Automatically included in headers for authenticated requests
   - Not included for registration endpoint
